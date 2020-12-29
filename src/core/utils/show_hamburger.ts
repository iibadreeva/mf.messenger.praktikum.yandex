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
export default function showHamburger(hamburgerBtn: NodeListOf<Element>, popub: boolean=false): void {
  // создаем модальное окно
  const modal = new Modal({});
  if(popub) {
    render('.container', modal);
  }

  // Показываем меню по клику
  if (hamburgerBtn) {
    Array.from(hamburgerBtn).forEach(item => {
      const element: HTMLElement = <HTMLElement> item;

      element.addEventListener('click', (event: MouseEvent) => {
        const type = element.dataset.type || '';

        if (show_hamburger) {
          remove('body', show_hamburger);
        }

        const {nav, navWidth, navHeight}: INav = createNav(type);

        const x = event.pageX;
        const y = event.pageY;

        nav.style.left = `${x - navWidth + 10}px`;
        nav.style.top = `${y - navHeight}px`;
      })
    });
  }

  const body = document.body;
  body.addEventListener('click', (e: MouseEvent) => {
    const nav = document.querySelector('.nav-list');
    const that = <HTMLElement>e.target;

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
    const isBtn = that.classList.contains('js-modal-btn') ||
      that.classList.contains('js-close-modal') ||
      that.classList.contains('js-remove-chat');
    if (popub && isBtn) {
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
          type: NavType.AddUser,
          title: 'Добавить пользователя'
        },
        {
          type: NavType.RemoveUser,
          title: 'Удалить пользователя'
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
    case 'add-user':
      modal.setProps({
        title: 'Добавить новго пользователя',
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
              clName: 'modal__btn_wide js-modal-btn',
              title: 'Добавить'
            }
          ]
        }
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
              clName: 'modal__btn_wide js-modal-btn',
              title: 'Удалить'
            }
          ]
        }
      });
      overviewShow();
      modal.show();
      break;
    case 'remove-chat':
      modal.setProps({
        title: 'Удалить чат с “Андрей',
        type: 'average',
        titleCenter: false,
        formData: false,
        footer: {
          btnGroup: [
            {
              clName: 'modal__btn_secondary js-close-modal',
              title: 'ОТМЕНА'
            },
            {
              clName: 'js-remove-chat',
              title: 'УДАЛИТЬ'
            }
          ]
        }
      });
      overviewShow();
      modal.show();
      break;
  }
}