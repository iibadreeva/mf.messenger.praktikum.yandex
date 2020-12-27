import Modal from "../../components/modal/index.js";
import render from "./render.js";
import remove from "./remove.js";
import { overviewHide, overviewShow } from "./overview.js";
import Hamburger, { NavType } from "../../components/hamburger/index.js";
import router from "../../router.js";
let show_hamburger = undefined;
export default function showHamburger(hamburgerBtn) {
    const modal = new Modal({});
    render('.container', modal);
    if (hamburgerBtn) {
        Array.from(hamburgerBtn).forEach(item => {
            const element = item;
            element.addEventListener('click', (event) => {
                const type = element.dataset.type || '';
                if (show_hamburger) {
                    remove('body', show_hamburger);
                }
                const { nav, navWidth, navHeight } = createNav(type);
                const x = event.pageX;
                const y = event.pageY;
                nav.style.left = `${x - navWidth + 10}px`;
                nav.style.top = `${y - navHeight}px`;
            });
        });
    }
    const body = document.body;
    body.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav-list');
        const that = e.target;
        if (nav) {
            if (!that.closest('.js-hamburger')) {
                remove('body', show_hamburger);
                show_hamburger = undefined;
            }
        }
        const isBtn = that.classList.contains('js-modal-btn') ||
            that.classList.contains('js-close-modal') ||
            that.classList.contains('js-remove-chat');
        if (isBtn) {
            modal.hide();
            overviewHide();
        }
        const navList = that.closest('.nav-list');
        if (navList) {
            const element = e.target;
            const type = element.dataset.type || '';
            if (type === NavType.Profile) {
                router.go('/profile');
            }
            else {
                createModal(type, modal);
            }
        }
    });
}
function createNav(type) {
    let nav, navHeight = 0, navWidth = 0;
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
            nav = document.querySelector('.nav-list');
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
            nav = document.querySelector('.nav-list');
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
            nav = document.querySelector('.nav-list');
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
            nav = document.querySelector('.nav-list');
            navWidth = nav.offsetWidth / 2;
            break;
    }
    const res = { nav, hamburger: show_hamburger, navWidth, navHeight };
    return res;
}
function createModal(type, modal) {
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
//# sourceMappingURL=show_hamburger.js.map