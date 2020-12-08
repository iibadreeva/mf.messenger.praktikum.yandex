import Modal from "../../components/modal/index.js";
import render from "./render.js";
import remove from "./remove.js";
import {overviewHide, overviewShow} from "./overview.js";
import Hamburger from "../../components/hamburger/index.js";

interface INav {
  nav: HTMLElement,
  navWidth: number,
  navHeight: number
}

let show_hamburger:any = undefined;
export default function showHamburger() {
  // создаем модальное окно
  const modal = new Modal({});
  render('.container', modal);

  const hamburgerBtn = document.querySelectorAll('.js-hamburger') || [];

  // Показываем меню по клику
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

  const body = document.body;
  body.addEventListener('click', (e: MouseEvent) => {
    const nav = document.querySelector('.nav-list');
    const that = <HTMLElement>e.target;

    // удаляем меню, если кликаем в нет элемента
    if (nav) {
      if (!that.closest('.js-hamburger')) {
        remove('body', show_hamburger);
        show_hamburger = undefined;
      }
    }

    // скрываем модальное окно
    const isBtn = that.classList.contains('js-modal-btn') ||
      that.classList.contains('js-close-modal') ||
      that.classList.contains('js-remove-chat');
    if (isBtn) {
      modal.hide();
      overviewHide();
    }

    // генерируем модальное
    const navList = <HTMLElement>that.closest('.nav-list');
    if (navList) {
      const element: HTMLElement = <HTMLElement> e.target;
      const type = element.dataset.type || '';

      createModal(type, modal);
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
          type: 'add-user',
          title: 'Добавить пользователя'
        },
        {
          type: 'remove-user',
          title: 'Удалить пользователя'
        },
        {
          title: 'Профиль'
        }
      ], 'nav-list');
      render('body', show_hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth;
      break;
    case 'chat':
      show_hamburger = new Hamburger([
        {
          type: 'remove-chat',
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
          type: 'photo-video',
          title: 'Фото или Видео'
        },
        {
          type: 'file',
          title: 'Файл'
        },
        {
          type: 'location',
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
          type: 'avatar',
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