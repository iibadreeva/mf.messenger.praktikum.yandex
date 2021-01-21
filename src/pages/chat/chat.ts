import Block from '../../core/block';
import { IContext, context } from './data';
import { template } from './template';
import HeaderPhoto from '../../components/messenger/header-photo/index';
import Input from '../../components/input/index';
import Dialog from '../../components/messenger/dialog/index';
import Textarea from '../../components/messenger/textarea/index';
import showHamburger from '../../utils/show_hamburger';
import { overviewHide, overviewShow } from '../../utils/overview';
import { UserAPI } from '../../core/modules/http/user-api';
import { host } from '../../core/modules/actions';
import { ChatApi } from './chat-api';
import WebSocketServer from './web-socket-server';
import Modal from '../../components/modal/index';
import { escape } from '../../utils/escape/escape';
import { ObjectType } from '../../types';
import router from '../../router';
import render from '../../utils/render';

export class Chat extends Block<IContext> {
  private modal: Modal | undefined;
  private dialogs: any;
  private idUser: number | undefined;
  private ping: ReturnType<typeof setTimeout> | undefined;
  idChat: number | undefined;
  ws: any;
  token: string;
  constructor() {
    const { avatar, search }: IContext = context;
    super('div', 'messenger', {
      description: context.description,
      header: new HeaderPhoto(avatar).render(),
      search: new Input(search).render(),
      dialogs: new Dialog({}).render(),
    });

    this.token = '';
    this.getData();
  }

  componentDidMount() {
    const modal = new Modal({});

    if (!this.modal) {
      render('.container', modal);
      this.modal = modal;
      showHamburger(modal);

      const navList = <HTMLElement>(
        document.getElementsByClassName('nav-list')[0]
      );
      if (navList) {
        navList.addEventListener('click', (e: MouseEvent) => {
          const element: HTMLElement = <HTMLElement>e.target;
          const type = element.dataset.type || '';

          if (element.classList.contains('js-btn-search-user-to-remove')) {
            if (this.idChat) {
              this.getUsers(this.idChat);
            }
          } else {
            this.createModal(type, modal);
          }
        });
      }
    }

    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const lists = this.element.querySelectorAll('.messenger__item');

      Array.from(lists).forEach((list) => {
        list.addEventListener('click', (e: Event) => {
          const element: HTMLElement = <HTMLElement>e.target;

          const dialog: HTMLDivElement | null = element.closest(
            '.messenger__item'
          );
          if (dialog) {
            const idChat = +(<string>dialog.dataset.id);

            if (!element.classList.contains('fa') && idChat !== this.idChat) {
              this.idChat = idChat;
              this.showMessages();
            }
          }
        });
      });
    });
  }

  getData() {
    const { avatar }: IContext = context;

    new UserAPI()
      .request()
      .then((res) => JSON.parse(res.data))
      .then((data) => {
        this.idUser = data.id;

        if (data.avatar) {
          avatar.image = `${host}${data.avatar}`;
        }

        this.setProps({
          header: new HeaderPhoto(avatar).render(),
        });
      });

    new ChatApi()
      .request()
      .then((res) => JSON.parse(res.data))
      .then((data) => {
        this.dialogs = { dialogs: data };
        this.setData();
      });
  }

  setData() {
    this.setProps({
      dialogs: new Dialog(this.dialogs).render(),
    });
  }

  showMessages() {
    if (this.ws && this.ping) {
      clearInterval(this.ping);
      this.ws.setClose();
    }

    this.setProps({
      description: '',
      editor: new Textarea({}).render(),
    });

    if (this.idChat) {
      new ChatApi()
        .getToken(this.idChat)
        .then((res) => JSON.parse(res.data))
        .then((data) => {
          if (data.token && this.idUser && this.idChat) {
            this.token = data.token;

            this.ws = new WebSocketServer(this.idUser, this.idChat, this.token);

            this.ws.onOpen();
            this.ws.onClose(this);
            this.ws.onMessage(this, this.idUser, this.idChat);
            this.ping = setInterval(() => {
              this.ws.onPing();
            }, 1000 * 10);
          }
        });
    }
  }

  createDialog(value: string) {
    new ChatApi()
      .createChat({
        title: value,
      })
      .then((res) => {
        const { status, data } = res;

        if (status === 200) {
          const res = JSON.parse(data);

          const dialog = {
            avatar: null,
            id: res.id,
            title: value,
          };
          const { dialogs } = this.dialogs;

          const result = [...dialogs, dialog];
          this.dialogs.dialogs = result;
          this.setData();

          if (this.modal) {
            this.modal.hide();
            overviewHide();
          }
        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      });
  }

  removeDialog(id: number) {
    new ChatApi()
      .deleteChat({
        chatId: id,
      })
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          const { dialogs } = this.dialogs;
          const index = dialogs.findIndex((item: ObjectType) => item.id === id);

          const result = [
            ...dialogs.slice(0, index),
            ...dialogs.slice(index + 1),
          ];
          this.dialogs.dialogs = result;
          this.setData();

          if (this.modal) {
            this.modal.hide();
            overviewHide();
          }
        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      });
  }

  searchUser(id: number, value: string) {
    new ChatApi().searchUser({ login: value }).then((res) => {
      const { status } = res;
      if (status === 200) {
        const data = JSON.parse(res.data);

        let result = {
          radio: false,
          info: 'Пользователь не найден',
          footer: {
            footerCenter: true,
            btnGroup: [
              {
                clName: 'modal__btn_wide js-btn-search-user-to-add',
                title: 'Поиск',
                id: id,
              },
            ],
          },
        };

        if (data.length > 0) {
          result = {
            radio: data,
            info: '',
            footer: {
              footerCenter: true,
              btnGroup: [
                {
                  clName: 'modal__btn_secondary js-btn-close-modal',
                  title: 'ОТМЕНА',
                  id: id,
                },
                {
                  clName: 'js-btn-add-user',
                  title: 'Добавить',
                  id: id,
                },
              ],
            },
          };
        }

        if (this.modal) {
          this.modal.setProps({
            formData: {
              label: 'Логин',
              value: value,
            },
            footer: result.footer,
            radio: result.radio,
            info: result.info,
          });
        }
        if (data.length > 0) {
          this.handleAddUser();
        } else {
          this.handleSearchUser();
        }
      } else if (status >= 500) {
        router.go('/500');
      } else {
        alert('Произошла ошибка');
      }
    });
  }

  addUserToChat(idChat: number, idUser: number) {
    new ChatApi()
      .addUserToChat({
        users: [idUser],
        chatId: idChat,
      })
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          if (this.modal) {
            this.modal.setProps({
              title: 'Пользователь добавлен',
              formData: undefined,
              footer: {
                footerCenter: true,
                btnGroup: [
                  {
                    clName: 'modal__btn_wide js-btn-close-modal',
                    title: 'Принять',
                  },
                ],
              },
              radio: undefined,
              info: '',
            });
          }
        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      });
  }

  getUsers(id: number) {
    new ChatApi()
      .requestChatUser(id)
      .then((res) => JSON.parse(res.data))
      .then((data) => {
        let result = {
          radio: false,
          info: 'Пользователь не найден',
          footer: {
            footerCenter: true,
            btnGroup: [
              {
                clName: 'modal__btn_wide js-btn-close-modal',
                title: 'ОТМЕНА',
                id: id,
              },
            ],
          },
        };

        const userData: any = [];
        data.forEach((item: { id: number }) => {
          if (item.id !== this.idUser) {
            userData.push(item);
          }
        });

        if (userData.length > 0) {
          result = {
            radio: userData,
            info: '',
            footer: {
              footerCenter: true,
              btnGroup: [
                {
                  clName: 'modal__btn_secondary js-btn-close-modal',
                  title: 'ОТМЕНА',
                  id: id,
                },
                {
                  clName: 'js-btn-remove-user',
                  title: 'Удалить',
                  id: id,
                },
              ],
            },
          };
        }

        if (this.modal) {
          this.modal.show();
          overviewShow();
          this.modal.setProps({
            title: 'Удалить пользователя',
            type: '',
            titleCenter: true,
            formData: false,
            footer: result.footer,
            radio: result.radio,
            info: result.info,
          });
        }
        if (userData.length > 0) {
          this.handleRemoveUser();
        }
      });
  }

  deleteUserToChat(idChat: number, idUser: number) {
    new ChatApi()
      .deleteUserFromChat({
        users: [idUser],
        chatId: idChat,
      })
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          if (this.modal) {
            this.modal.setProps({
              title: 'Пользователь удален',
              formData: undefined,
              footer: {
                footerCenter: true,
                btnGroup: [
                  {
                    clName: 'modal__btn_wide js-btn-close-modal',
                    title: 'Принять',
                  },
                ],
              },
              radio: undefined,
              info: '',
            });
          }
        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      });
  }

  createModal(type: string, modal: any): void {
    switch (type) {
      case 'create-chat':
        modal.setProps({
          title: 'Добавить новый чат',
          type: '',
          titleCenter: true,
          formData: {
            label: 'Логин',
            value: '',
          },
          footer: {
            footerCenter: true,
            btnGroup: [
              {
                clName: 'modal__btn_wide js-btn-create-messege',
                title: 'Добавить',
              },
            ],
          },
          radio: undefined,
          info: '',
        });
        overviewShow();
        modal.show();
        this.handleCreateChat();
        break;
      case 'add-user':
        modal.setProps({
          title: 'Добавить нового пользователя',
          type: '',
          titleCenter: true,
          formData: {
            label: 'Логин',
            value: '',
          },
          footer: {
            footerCenter: true,
            btnGroup: [
              {
                clName: 'modal__btn_wide js-btn-search-user-to-add',
                title: 'Поиск',
                id: this.idChat,
              },
            ],
          },
          radio: undefined,
          info: '',
        });
        overviewShow();
        modal.show();
        this.handleSearchUser();
        break;
      case 'remove-chat':
        modal.setProps({
          title: 'Удалить чат',
          type: 'average',
          titleCenter: false,
          formData: false,
          footer: {
            btnGroup: [
              {
                clName: 'modal__btn_secondary js-btn-close-modal',
                title: 'ОТМЕНА',
              },
              {
                clName: 'js-btn-remove-messege',
                title: 'УДАЛИТЬ',
                id: this.idChat,
              },
            ],
          },
          radio: undefined,
          info: '',
        });
        overviewShow();
        modal.show();
        this.handleRemoveChat();
        break;
      case 'profiler':
        if (this.ws) {
          this.ws.setClose();
        }
        router.go('/profile');
        break;
    }
  }

  handleCreateChat() {
    const btn = document.querySelector('.js-btn-create-messege');
    if (btn) {
      btn.addEventListener('click', () => {
        const value = escape(
          document.querySelector('.modal__value') as HTMLInputElement
        );
        if (value !== '') {
          this.createDialog(value);
        }
      });
    }
  }

  handleRemoveChat() {
    const btn = document.querySelector('.js-btn-remove-messege');
    if (btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const id = +(<string>that.dataset.id);
        if (id) {
          this.removeDialog(id);
        }
      });
    }
  }

  handleSearchUser() {
    const btn = document.querySelector('.js-btn-search-user-to-add');
    if (btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const value = escape(
          document.querySelector('.modal__value') as HTMLInputElement
        );
        const id = +(<string>that.dataset.id);
        if (value !== '' && id) {
          this.searchUser(id, value);
        }
      });
    }
  }

  handleAddUser() {
    const btn = document.querySelector('.js-btn-add-user');
    if (btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const idChat = +(<string>that.dataset.id);
        const check: HTMLInputElement | null = document.querySelector(
          'input[name="user"]:checked'
        );
        let idUser;
        if (check) {
          idUser = +check.value;
        }
        if (idUser) {
          this.addUserToChat(idChat, idUser);
        }
      });
    }
  }

  handleRemoveUser() {
    const btn = document.querySelector('.js-btn-remove-user');
    if (btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const idChat = +(<string>that.dataset.id);
        const check: HTMLInputElement | null = document.querySelector(
          'input[name="user"]:checked'
        );
        let idUser;
        if (check) {
          idUser = +check.value;
        }
        if (idUser) {
          this.deleteUserToChat(idChat, idUser);
        }
      });
    }
  }

  handlerSendMessege() {
    const btn = document.querySelector('.editor__btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const editor = <HTMLElement>document.querySelector('.editor__value');
        const value = editor.innerHTML
          .trim()
          .replace(/&nbsp;/gi, '')
          .replace(/<div><br><\/div>/gi, '')
          .replace(/<p><br><\/p>/gi, '');

        if (value) {
          this.ws.onSend(value);
        }
      });
    }
  }

  scrollDown() {
    const chart = document.querySelector('.messenger__chat');

    if (chart) {
      chart.scrollTop = chart.scrollHeight;
    }
  }

  render() {
    return template(this.props);
  }
}
