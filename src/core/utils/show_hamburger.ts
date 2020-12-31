import Modal from "../../components/modal/index";
import render from "./render";
import remove from "./remove";
import {overviewHide, overviewShow} from "./overview";
import Hamburger, {NavType} from "../../components/hamburger/index";
import router from "../../router";

interface INav {
  nav: HTMLElement,
  navWidth: number,
  navHeight: number
}

let show_hamburger:any = undefined;
// создаем модальное окно
let modal: Modal;
let id: string;
export default function showHamburger(popub: any) {
  if(popub && !modal) {
    modal = new Modal({});
    render('.container', modal);
  }

  const body = document.body;
  body.addEventListener('click', (e: MouseEvent) => {
    const nav = document.querySelector('.nav-list');
    const that = <HTMLElement>e.target;



    if(that.closest('.js-hamburger')) {
      let element = <HTMLElement> that;
      if (!element.dataset.type) {
        element = <HTMLElement>that.parentNode;
      }
      const type = element.dataset.type || '';
      const dialog: HTMLDivElement | null = element.closest('.messenger__item');

      if(dialog) {
        id = <string>dialog.dataset.id;
      }

      if (show_hamburger) {
        remove('body', show_hamburger);
      }

      const {nav, navWidth, navHeight}: INav = createNav(type);

      const x = e.pageX;
      const y = e.pageY;

      nav.style.left = `${x - navWidth + 10}px`;
      nav.style.top = `${y - navHeight}px`;
    }

    // удаляем меню, если кликаем в нет элемента
    if (nav) {
      if (!that.closest('.js-hamburger')) {
        setTimeout(() => {
          if(show_hamburger) {
            remove('body', show_hamburger);
            show_hamburger = undefined;
          }
        }, 100);
      }

    }

    // скрываем модальное окно
    const overview = that.classList.contains('overview');
    if (popub && overview) {
      modal.hide();
      overviewHide();
    }

    // генерируем модальное
    const navList = <HTMLElement>that.closest('.nav-list');
    if (navList) {
      const element: HTMLElement = <HTMLElement> e.target;
      const type = element.dataset.type || '';

      if(type === NavType.Profile) {
        router.go('/profile');
      } else {
        createModal(type, modal);
      }
    }
  });

  if(popub) {
    return modal;
  }
}

function createNav(type: string): INav {
  let
    nav,
    navHeight = 0,
    navWidth = 0;

  switch (type) {
    case 'profile':
      show_hamburger = new Hamburger([
        {
          type: NavType.CreateChat,
          title: 'Создать новый чат '
        },
        {
          title: 'Профиль',
          type: NavType.Profile,
        }
      ], 'nav-list');
      render('body', show_hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth;
      break;
    case 'chat':
      show_hamburger = new Hamburger([
        {
          type: NavType.AddUser,
          title: 'Добавить пользователя'
        },
        {
          type: id,
          clName: 'js-btn-search-user-to-remove',
          title: 'Удалить пользователя'
        },
        {
          type: NavType.RemoveChat,
          title: 'Удалить чат'
        }
      ], 'nav-list');
      render('body', show_hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth;
      break;
    case 'files':
      show_hamburger = new Hamburger([
        {
          type: NavType.Media,
          title: 'Фото или Видео'
        },
        {
          type: NavType.File,
          title: 'Файл'
        },
        {
          type: NavType.Location,
          title: 'Локация'
        }
      ], 'nav-list');
      render('body', show_hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navHeight = nav.offsetHeight;
      break;
    case 'avatar':
      show_hamburger = new Hamburger([
        {
          type: NavType.Avatar,
          title: 'Загрузить фото'
        }
      ], 'nav-list');
      render('body', show_hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth / 2;
      break;
  }

  const res = {nav, hamburger: show_hamburger, navWidth, navHeight} as INav

  return res;
}

function createModal(type: string, modal: any): void {
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
        radio: undefined
      });
      overviewShow();
      modal.show();
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
              id: id
            }
          ]
        },
        radio: undefined
      });
      overviewShow();
      modal.show();
      break;
    case 'remove-user':
      modal.setProps({
        title: 'Удалить пользователя',
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
              clName: 'modal__btn_wide js-btn-search-user-to-remove',
              title: 'Поиск',
              id: id
            }
          ]
        },
        radio: undefined
      });
      overviewShow();
      modal.show();
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
              id: id
            }
          ]
        },
        radio: undefined
      });
      overviewShow();
      modal.show();
      break;
  }
}