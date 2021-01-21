import Modal from '../components/modal';
import render from './render';
import { overviewHide } from './overview';
import Hamburger, { NavType } from '../components/hamburger/index';

interface INav {
  nav: HTMLElement;
  navWidth: number;
  navHeight: number;
}

let show_hamburger: Hamburger;
let modal: Modal;
let id: string;
export default function showHamburger(
  popub: Modal | undefined = undefined
): void {
  if (popub) {
    modal = popub;
  }

  show_hamburger = new Hamburger({}, 'nav-list');
  render('.container', show_hamburger);
  show_hamburger.hide();

  const body = document.body;
  body.addEventListener('click', (e: MouseEvent) => {
    const nav = document.querySelector('.nav-list');
    const that = <HTMLElement>e.target;

    if (that.closest('.js-hamburger')) {
      let element = <HTMLElement>that;
      if (!element.dataset.type) {
        element = <HTMLElement>that.parentNode;
      }
      const type = element.dataset.type || '';
      const dialog: HTMLDivElement | null = element.closest('.messenger__item');

      if (dialog) {
        id = <string>dialog.dataset.id;
      }

      if (show_hamburger) {
        show_hamburger.hide();
      }

      const { nav, navWidth, navHeight }: INav = createNav(type);

      const x = e.pageX;
      const y = e.pageY;

      nav.style.left = `${x - navWidth + 10}px`;
      nav.style.top = `${y - navHeight}px`;
    }

    // скрываем меню, если кликаем в не элемента
    if (nav) {
      if (!that.closest('.js-hamburger')) {
        setTimeout(() => {
          if (show_hamburger) {
            show_hamburger.hide();
          }
        }, 100);
      }
    }

    // скрываем модальное окно
    const overview = that.classList.contains('overview');
    const close = that.classList.contains('js-btn-close-modal');
    if ((popub && overview) || close) {
      modal.hide();
      overviewHide();
    }
  });
}

function createNav(type: string): INav {
  let nav,
    navHeight = 0,
    navWidth = 0;

  switch (type) {
    case 'profile':
      show_hamburger.setProps({
        nav: [
          {
            type: NavType.CreateChat,
            title: 'Создать новый чат ',
          },
          {
            title: 'Профиль',
            type: NavType.Profile,
          },
        ],
      });
      show_hamburger.show();
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth;
      break;
    case 'chat':
      show_hamburger.setProps({
        nav: [
          {
            type: NavType.AddUser,
            title: 'Добавить пользователя',
          },
          {
            type: id,
            clName: 'js-btn-search-user-to-remove',
            title: 'Удалить пользователя',
          },
          {
            type: NavType.RemoveChat,
            title: 'Удалить чат',
          },
        ],
      });
      show_hamburger.show();
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth;
      break;
    case 'files':
      show_hamburger.setProps({
        nav: [
          {
            type: NavType.Media,
            title: 'Фото или Видео',
          },
          {
            type: NavType.File,
            title: 'Файл',
          },
          {
            type: NavType.Location,
            title: 'Локация',
          },
        ],
      });

      show_hamburger.show();
      nav = <HTMLElement>document.querySelector('.nav-list');
      navHeight = nav.offsetHeight;
      break;
    case 'avatar':
      show_hamburger.setProps({
        nav: [
          {
            type: NavType.Avatar,
            title: 'Загрузить фото',
          },
        ],
      });
      show_hamburger.show();
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth / 2;
      break;
  }

  const res = { nav, hamburger: show_hamburger, navWidth, navHeight } as INav;

  return res;
}
