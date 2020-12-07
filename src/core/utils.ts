import Modal from "../components/modal/index.js";
import Hamburger from "../components/hamburger/index.js";

declare let window:any;

type ObjectType = {
  [key: string]: any;
}

interface IBtnG {
  clName: string,
  title: string
}

interface IModal {
  title: string,
  titleCenter: boolean,
  footer: {
    footerCenter: boolean,
    btnGroup: IBtnG[]
  }
}

interface INav {
  nav: HTMLElement,
  navWidth: number,
  navHeight: number
}

export function render(query:string, block:any) {
  const root= document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());
  }
  return root;
}

function remove(query:string, block:any) {
  const root = document.querySelector(query);
  if (root) {
    root.removeChild(block.getContent());
  }
  return root;
}

function get<T extends object>(obj:T, path: string, defaultValue:string='something else'): any {
  const keys = path.split('.');

  let result:ObjectType = obj;
  for (let key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}

export class Templator<T extends object> {
  private TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  private readonly _template:string;

  constructor(template:string) {
    this._template = template;
  }

  compile(ctx:T) {
    const template: string = this._template;
    return this._compileTemplate(template, ctx);
  }

  _compileTemplate(template:string, ctx:T) {
    let tmpl = template;
    let key = null;


    while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(ctx, tmplValue);

        if (typeof data === "function") {
          window[tmplValue] = data;
          tmpl = tmpl.replace(
            new RegExp(key[0], "gi"),
            `window.${key[1].trim()}()`
          );
          continue;
        }

        tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
      }
    }

    return tmpl;
  }
}


export function overviewHide() {
  const overview = document.querySelector('.overview');
  if (overview) {
    overview.classList.remove('overview_active')
  }
}

export function overviewShow() {
  const overview = document.querySelector('.overview');
  if (overview) {
    overview.classList.add('overview_active')
  }
}


export const forma = (function () {
  const phoneRe = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
  const emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;
  let matchList:number[] = [];

  return {
    showError: function(label: HTMLElement, input: HTMLElement) {
      const text = input.dataset.text;
      if (label && text) {
        label.textContent = text;
      }
      const parent = input.closest('.log-form__control');
      if (parent) {
        parent.classList.add('log-form__control_error');
      }

      matchList.push(0);
    },
    hideError: function(label: HTMLElement, input: HTMLInputElement) {
      if (label) {
        label.textContent = '';
      }
      const parent = input.closest('.log-form__control');
      if (parent) {
        parent.classList.remove('log-form__control_error');
      }
      matchList.push(1);
    },
    validate: function(input: any, focus:boolean) {
      const label = input.nextElementSibling!;

      let isPassword;
      if ( input.dataset.type === 'password_again') {
        const passwordInput = input.parentNode.previousElementSibling.querySelector('input')
        isPassword = input.value !== passwordInput.value;
      }

      if(focus) {
        this.hideError(label, input)
      } else if (isPassword) {
        this.showError(label, input);
      } else if (input.dataset.type === 'email' && !input.value.match(emailRe)) {
        this.showError(label, input);
      } else if (input.dataset.type === 'phone' && !input.value.match(phoneRe)) {
        this.showError(label, input);
      } else if (input.dataset.size && input.value.length < parseInt(input.dataset.size)) {
        this.showError(label, input);
      } else if (input.value === '') {
        this.showError(label, input);
      } else {
        this.hideError(label, input)
      }
    },
    send: function(inputs: any, modal: any) {
      const data: any[] = [];
      matchList = [];
      Array.from(inputs).forEach((input: any) => {
        this.validate(input, false);

        const dataItem:ObjectType = {};
        dataItem[input.dataset.type] = input.value;
        data.push(dataItem);
      });
      const isValid = matchList.find(item => item === 0);
      if (isValid !== 0) {
        console.log('Данные: ', data);
      } else if (modal) {
        const overview = document.querySelector('.overview');
        if (overview) {
          overview.classList.add('overview_active');
        }

        modal.show();
      }
    },
    listeners: function (form:HTMLDivElement, modal: any) {
      form.addEventListener("blur", (event: Event) => {
        const element = <HTMLInputElement>event.target

        if (element.tagName === 'INPUT') {
          this.validate(element, false)
        }
      }, true);

      form.addEventListener("focus", (event: Event) => {
        const element = <HTMLInputElement>event.target

        if (element.tagName === 'INPUT') {
          this.validate(element, true)
        }
      }, true);

      form.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const inputs = form.querySelectorAll('input');
        this.send(inputs, modal)

      });
    }
  };
})();


export function modalCheck(): void {
  const modalConfig:IModal = {
    title: 'Не все поля правильно заполнены',
    titleCenter: true,
    footer: {
      footerCenter: true,
      btnGroup: [
        {
          clName: 'modal__btn_wide js-modal-btn',
          title: 'Поменять'
        }
      ]
    }
  }

  // Подготавливаем мадальное окно
  const modal = new Modal(modalConfig);
  modal.hide();
  render('.container', modal);

  // Валидация полей
  const form = <HTMLDivElement>document.getElementsByClassName('profile__form')[0];
  if (form) {
    forma.listeners(form, modal);
  }

  // скрываем модалку
  const btnModal = <HTMLElement>document.querySelector('.js-modal-btn');
  if (btnModal) {
    btnModal.addEventListener('click', () => {
      modal.hide();
      overviewHide();
    })
  }
}

let hamburger:any = undefined;
export function showHamburger() {
  // создаем модальное окно
  const modal = new Modal({});
  render('.container', modal);

  const hamburgerBtn = document.querySelectorAll('.js-hamburger') || [];

  // Показываем меню по клику
  Array.from(hamburgerBtn).forEach(item => {
    const element: HTMLElement = <HTMLElement> item;

    element.addEventListener('click', (event: MouseEvent) => {
      const type = element.dataset.type || '';

      if (hamburger) {
        remove('body', hamburger);
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
        remove('body', hamburger);
        hamburger = undefined;
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
      hamburger = new Hamburger([
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
      render('body', hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth;
      break;
    case 'chat':
      hamburger = new Hamburger([
        {
          type: 'remove-chat',
          title: 'Удалить чат'
        }
      ], 'nav-list');
      render('body', hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth;
      break;
    case 'files':
      hamburger = new Hamburger([
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
      render('body', hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navHeight = nav.offsetHeight;
      break;
    case 'avatar':
      hamburger = new Hamburger([
        {
          type: 'avatar',
          title: 'Загрузить фото'
        }
      ], 'nav-list');
      render('body', hamburger);
      nav = <HTMLElement>document.querySelector('.nav-list');
      navWidth = nav.offsetWidth / 2;
      break;
  }

  const res = {nav, hamburger, navWidth, navHeight} as INav

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