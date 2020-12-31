import Block from '../../core/block';
import HeaderPhoto from '../../components/messenger/header-photo';
import Input from '../../components/input/index';
import Dialog from '../../components/messenger/dialog';
import Templator from '../../core/utils/templator';
import showHamburger from '../../core/utils/show_hamburger';
import {IContext, context} from './data';
import {overviewHide, overviewShow} from "../../core/utils/overview";
import {UserAPI} from "../../modules/http/user-api";
import {host} from "../../modules/actions";
import {ChatApi} from "./chat-api";
import Modal from "../../components/modal";
import {escape} from "../../core/utils/escape";
import {ObjectType} from "../../core/types";
import router from "../../router";

export class Chat extends Block<IContext> {
  private modal: Modal | undefined;
  private dialogs: any;
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
    this.modal = showHamburger(true)
    this.handlers();
  }

  getData() {
    const {avatar}: IContext = context;

    new UserAPI()
      .request()
      .then(res => JSON.parse(res.data))
      .then(data => {
        this.id = data.id;

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

  getUsers(id: string) {
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
          if(item.id !== this.id) {
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
            footer: result.footer,
            radio: result.radio,
            info: result.info
          });
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

  handlers() {
    const body = document.body;
    body.addEventListener('click', (e: MouseEvent) => {
      const that = <HTMLElement>e.target;
      const value = escape(document.querySelector('.modal__value') as HTMLInputElement);
      // создаем чат
      if(that.classList.contains('js-btn-create-chat') && value !== '') {
        this.createDialog(value);
      }
      // удаляем чат
      if(that.classList.contains('js-btn-remove-chat')) {
        const id = +<string>that.dataset.id;
        this.removeDialog(id);
      }
      // поиск пользователя
      if(that.classList.contains('js-btn-search-user-to-add') && value !== '') {
        const id = +<string>that.dataset.id;
        this.searchUser(id, value);
      }

      if(that.classList.contains('js-btn-search-user-to-remove')) {
        const id = <string>that.dataset.type;
        this.getUsers(id);
      }
      // добавляем пользователя в чат
      if(that.classList.contains('js-btn-add-user')) {
        const idChat = +<string>that.dataset.id;
        const check: HTMLInputElement | null = document.querySelector('input[name="user"]:checked');
        let idUser;
        if(check) {
          idUser = +check.value;
        }

        if(idUser) {
          this.addUserToChat(idChat, idUser);
        }
      }
      // удаляем пользователя из чата
      if(that.classList.contains('js-btn-remove-user')) {const idChat = +<string>that.dataset.id;
        const check: HTMLInputElement | null = document.querySelector('input[name="user"]:checked');
        let idUser;
        if(check) {
          idUser = +check.value;
        }

        if(idUser) {
          this.deleteUserToChat(idChat, idUser);
        }
      }
      // скрываем модальное окно
      if(that.classList.contains('js-btn-close-modal') && this.modal) {
        this.modal.hide();
        overviewHide();
      }
    });
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