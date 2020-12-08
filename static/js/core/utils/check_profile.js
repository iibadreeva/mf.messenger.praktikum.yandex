import Modal from "../../components/modal/index.js";
import render from "./render.js";
import { forma } from "./form.js";
import { overviewHide } from "./overview.js";
export default function checkProfile() {
    const modalConfig = {
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
    };
    const modal = new Modal(modalConfig);
    modal.hide();
    render('.container', modal);
    const form = document.getElementsByClassName('profile__form')[0];
    if (form) {
        forma.listeners(form, modal);
    }
    const btnModal = document.querySelector('.js-modal-btn');
    if (btnModal) {
        btnModal.addEventListener('click', () => {
            modal.hide();
            overviewHide();
        });
    }
}
//# sourceMappingURL=check_profile.js.map