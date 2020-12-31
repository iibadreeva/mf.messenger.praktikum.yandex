import Modal from "../../components/modal/index.js";
import render from "./render.js";
import remove from "./remove.js";
import { overviewHide, overviewShow } from "./overview.js";
import Hamburger, { NavType } from "../../components/hamburger/index.js";
import router from "../../router.js";
let show_hamburger = undefined;
let modal;
let id;
export default function showHamburger(popub) {
    if (popub && !modal) {
        modal = new Modal({});
        render('.container', modal);
    }
    const body = document.body;
    body.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav-list');
        const that = e.target;
        if (that.closest('.js-hamburger')) {
            let element = that;
            if (!element.dataset.type) {
                element = that.parentNode;
            }
            const type = element.dataset.type || '';
            const dialog = element.closest('.messenger__item');
            if (dialog) {
                id = dialog.dataset.id;
            }
            if (show_hamburger) {
                remove('body', show_hamburger);
            }
            const { nav, navWidth, navHeight } = createNav(type);
            const x = e.pageX;
            const y = e.pageY;
            nav.style.left = `${x - navWidth + 10}px`;
            nav.style.top = `${y - navHeight}px`;
        }
        if (nav) {
            if (!that.closest('.js-hamburger')) {
                setTimeout(() => {
                    if (show_hamburger) {
                        remove('body', show_hamburger);
                        show_hamburger = undefined;
                    }
                }, 100);
            }
        }
        const overview = that.classList.contains('overview');
        if (popub && overview) {
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
    if (popub) {
        return modal;
    }
}
function createNav(type) {
    let nav, navHeight = 0, navWidth = 0;
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
            nav = document.querySelector('.nav-list');
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
//# sourceMappingURL=show_hamburger.js.map