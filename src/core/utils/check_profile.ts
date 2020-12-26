import Modal from "../../components/modal/index";
import render from "./render";
import {forma} from "./form";
import {overviewHide} from "./overview";

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

export default function checkProfile(): void {
  const modalConfig:IModal = {
    title: 'Не все поля правильно заполнены',
    titleCenter: true,
    footer: {
      footerCenter: true,
      btnGroup: [
        {
          clName: 'modal__btn_wide js-modal-btn',
          title: 'Поменять',
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