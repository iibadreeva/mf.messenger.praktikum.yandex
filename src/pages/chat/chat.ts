import Block from '../../core/block';
import HeaderPhoto from '../../components/messenger/header-photo';
import Input from '../../components/input/index';
import Dialog from '../../components/messenger/dialog';
import Templator from '../../core/utils/templator/templator';
import showHamburger from '../../core/utils/show_hamburger';
import {IContext, context} from './data';
import {overviewHide, overviewShow} from "../../core/utils/overview";
import {UserAPI} from "../../core/modules/http/user-api";
import {host} from "../../core/modules/actions";
import {ChatApi} from "./chat-api";
import Modal from "../../components/modal/index";
import {escape} from "../../core/utils/escape/escape";
import {ObjectType} from "../../core/types";
import router from "../../router";
import render from "../../core/utils/render";

export class Chat extends Block<IContext> {
  private modal: Modal | undefined;
  private dialogs: any;
  private myId: number | undefined;
  private id: number | undefined;
  constructor() {
    const {avatar, search}: IContext = context;

    super(
      'div',
      'messenger',
      {
        description: context.description,
        header: new HeaderPhoto(avatar).render(),
        search: new Input(search).render(),
        dialogs: new Dialog({}).render(),
      }
    );
    this.getData();
  }

  componentDidMount() {
    const modal = new Modal({});

    if(!this.modal) {
      render('.container', modal);
      this.modal = modal;
      showHamburger(modal);

      const navList = <HTMLElement>document.getElementsByClassName('nav-list')[0];
      if (navList) {
        navList.addEventListener('click', (e: MouseEvent) => {
          const element: HTMLElement = <HTMLElement> e.target;
          const type = element.dataset.type || '';

          if(element.classList.contains('js-btn-search-user-to-remove')) {
            if(this.id) {
              this.getUsers(this.id);
            }
          } else {
            this.createModal(type, modal);
          }
        });
      }
    }

    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const hamburgers = this.element.querySelectorAll('.js-hamburger');
      Array.from(hamburgers).forEach((list) => {
        list.addEventListener('click', (e: Event) => {
          const element: HTMLElement = <HTMLElement> e.target;
          const dialog: HTMLDivElement | null = element.closest('.messenger__item');

          if(dialog) {
            this.id = +<string>dialog.dataset.id;
          }
        })
      });
    });
  }

  getData() {
    const {avatar}: IContext = context;

    new UserAPI()
      .request()
      .then(res => JSON.parse(res.data))
      .then(data => {
        this.myId = data.id;

        if (data.avatar) {
          avatar.image = `${host}${data.avatar}`;
        }

        this.setProps({
          header: new HeaderPhoto(avatar).render(),
        });
      });

    new ChatApi()
      .request()
      .then(res => JSON.parse(res.data))
      .then(data => {
        this.dialogs = {dialogs: data};
        this.setData();
      });
  }

  setData() {
    this.setProps({
      dialogs: new Dialog(this.dialogs).render(),
    })
  }

  createDialog(value: string) {
    new ChatApi()
      .createChat({
        "title": value
      })
      .then(res => {
        const { status, data } = res;

        if(status === 200) {
          let res = JSON.parse(data);

          const dialog = {
            avatar: null,
            id: res.id,
            title: value
          }
          const {dialogs} = this.dialogs;

          const result = [
            ...dialogs,
            dialog
          ];
          this.dialogs.dialogs = result;
          this.setData();

          if(this.modal) {
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
        "chatId": id
      })
      .then(res => {
        const { status } = res;
        if(status === 200) {
          const {dialogs} = this.dialogs;
          const index = dialogs.findIndex((item: ObjectType) => item.id === id);

          const result = [
            ...dialogs.slice(0, index),
            ...dialogs.slice(index+1)
          ];
          this.dialogs.dialogs = result;
          this.setData();

          if(this.modal) {
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
    new ChatApi()
      .searchUser({"login": value})
      .then(res => {
        const { status } = res;
        if(status === 200) {
          const data = JSON.parse(res.data);

          let result = {
            radio: false,
            info: 'Пользователь не найден',
            footer: {
              footerCenter: true,
              btnGroup: [
                {
                  clName: `modal__btn_wide js-btn-search-user-to-add`,
                  title: 'Поиск',
                  id: id
                }
              ]
            }
          }

          if(data.length > 0 ) {
            result = {
              radio: data,
              info: '',
              footer: {
                footerCenter: true,
                btnGroup: [
                  {
                    clName: 'modal__btn_secondary js-btn-close-modal',
                    title: 'ОТМЕНА',
                    id: id
                  },
                  {
                    clName: 'js-btn-add-user',
                    title: 'Добавить',
                    id: id
                  }
                ]
              }
            }
          }

          if(this.modal) {
            this.modal.setProps({
              formData: {
                label: 'Логин',
                value: value
              },
              footer: result.footer,
              radio: result.radio,
              info: result.info
            });
          }
          if(data.length > 0 ) {
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
        "users": [idUser],
        "chatId": idChat
      })
      .then(res => {
        const { status } = res;

        if(status === 200) {
          if (this.modal) {
            this.modal.setProps({
              title: 'Пользователь добавлен',
              formData: undefined,
              footer: {
                footerCenter: true,
                btnGroup: [
                  {
                    clName: 'modal__btn_wide js-btn-close-modal',
                    title: 'Принять'
                  }
                ]
              },
              radio: undefined,
              info: ''
            });
          }
        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      })
  }

  getUsers(id: number) {
    new ChatApi()
      .requestChatUser(id)
      .then(res => JSON.parse(res.data))
      .then(data => {
        let result = {
          radio: false,
          info: 'Пользователь не найден',
          footer: {
            footerCenter: true,
            btnGroup: [
              {
                clName: `modal__btn_wide js-btn-close-modal`,
                title: 'ОТМЕНА',
                id: id
              }
            ]
          }
        }

        let userData: any = [];
        data.forEach((item: { id: number; }) => {
          if(item.id !== this.myId) {
            userData.push(item);
          }
        });

        if(userData.length > 0) {
          result = {
            radio: userData,
            info: '',
            footer: {
              footerCenter: true,
              btnGroup: [
                {
                  clName: 'modal__btn_secondary js-btn-close-modal',
                  title: 'ОТМЕНА',
                  id: id
                },
                {
                  clName: 'js-btn-remove-user',
                  title: 'Удалить',
                  id: id
                }
              ]
            }
          }
        }

        if(this.modal) {
          this.modal.show();
          overviewShow();
          this.modal.setProps({
            title: 'Удалить пользователя',
            type: '',
            titleCenter: true,
            formData: false,
            footer: result.footer,
            radio: result.radio,
            info: result.info
          });
        }
        if(userData.length > 0) {
          this.handleRemoveUser();
        }
      });
  }

  deleteUserToChat(idChat: number, idUser: number) {
    new ChatApi()
      .deleteUserFromChat({
        "users": [idUser],
        "chatId": idChat
      })
      .then(res => {
        const { status } = res;

        if(status === 200) {
          if (this.modal) {
            this.modal.setProps({
              title: 'Пользователь удален',
              formData: undefined,
              footer: {
                footerCenter: true,
                btnGroup: [
                  {
                    clName: 'modal__btn_wide js-btn-close-modal',
                    title: 'Принять'
                  }
                ]
              },
              radio: undefined,
              info: ''
            });
          }
        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      })
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
            value: ''
          },
          footer: {
            footerCenter: true,
            btnGroup: [
              {
                clName: 'modal__btn_wide js-btn-create-chat',
                title: 'Добавить'
              }
            ]
          },
          radio: undefined,
          info: ''
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
            value: ''
          },
          footer: {
            footerCenter: true,
            btnGroup: [
              {
                clName: 'modal__btn_wide js-btn-search-user-to-add',
                title: 'Поиск',
                id: this.id
              }
            ]
          },
          radio: undefined,
          info: ''
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
                title: 'ОТМЕНА'
              },
              {
                clName: 'js-btn-remove-chat',
                title: 'УДАЛИТЬ',
                id: this.id
              }
            ]
          },
          radio: undefined,
          info: ''
        });
        overviewShow();
        modal.show();
        this.handleRemoveChat();
        break;
    }
  }

  handleCreateChat() {
    const btn = document.querySelector('.js-btn-create-chat');
    if(btn) {
      btn.addEventListener('click', () => {
        const value = escape(document.querySelector('.modal__value') as HTMLInputElement);
        if (value !== '') {
          this.createDialog(value);
        }
      });
    }
  }

  handleRemoveChat() {
    const btn = document.querySelector('.js-btn-remove-chat');
    if(btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const id = +<string>that.dataset.id;
        if (id) {
          this.removeDialog(id);
        }
      });
    }
  }

  handleSearchUser() {
    const btn = document.querySelector('.js-btn-search-user-to-add');
    if(btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const value = escape(document.querySelector('.modal__value') as HTMLInputElement);
        const id = +<string>that.dataset.id;
        if (value !== '' && id) {
          this.searchUser(id, value);
        }
      });
    }
  }

  handleAddUser() {
    const btn = document.querySelector('.js-btn-add-user');
    if(btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const idChat = +<string>that.dataset.id;
        const check: HTMLInputElement | null = document.querySelector('input[name="user"]:checked');
        let idUser;
        if(check) {
          idUser = +check.value;
        }
        if(idUser) {
          this.addUserToChat(idChat, idUser);
        }
      });
    }
  }

  handleRemoveUser() {
    const btn = document.querySelector('.js-btn-remove-user');
    if(btn) {
      btn.addEventListener('click', (e: Event) => {
        const that = <HTMLElement>e.target;
        const idChat = +<string>that.dataset.id;
        const check: HTMLInputElement | null = document.querySelector('input[name="user"]:checked');
        let idUser;
        if(check) {
          idUser = +check.value;
        }
        if(idUser) {
          this.deleteUserToChat(idChat, idUser);
        }
      });
    }
  }

  render() {
    const templ = `
      <main class="messenger__left">
        <div class="messenger__header">{{ header }}</div>
        <div class="messenger__search">{{ search }}</div>
        <div class="messenger__items">{{ dialogs }}</div>
      </main>
      <aside class="messenger__right">
        <header class="messenger__header messenger__header_right"></header>
        <div class="messenger__content messenger__content_center">
          <p class="messenger__text">{{ description }}</p>
        </div>
      </aside>`;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}