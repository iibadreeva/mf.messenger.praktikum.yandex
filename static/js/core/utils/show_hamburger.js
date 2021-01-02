import render from "./render.js";
import { overviewHide, } from "./overview.js";
import Hamburger, { NavType } from "../../components/hamburger/index.js";
import router from "../../router.js";
let show_hamburger;
let modal;
let id;
export default function showHamburger(popub = undefined) {
    if (popub) {
        modal = popub;
    }
    show_hamburger = new Hamburger({}, 'nav-list');
    render('.container', show_hamburger);
    show_hamburger.hide();
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
                show_hamburger.hide();
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
                        show_hamburger.hide();
                    }
                }, 100);
            }
        }
        const overview = that.classList.contains('overview');
        const close = that.classList.contains('js-btn-close-modal');
        if (popub && overview || close) {
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
        }
    });
}
function createNav(type) {
    let nav, navHeight = 0, navWidth = 0;
    switch (type) {
        case 'profile':
            show_hamburger.setProps({ nav: [
                    {
                        type: NavType.CreateChat,
                        title: 'Создать новый чат '
                    },
                    {
                        title: 'Профиль',
                        type: NavType.Profile,
                    }
                ] });
            show_hamburger.show();
            nav = document.querySelector('.nav-list');
            navWidth = nav.offsetWidth;
            break;
        case 'chat':
            show_hamburger.setProps({ nav: [
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
                ] });
            show_hamburger.show();
            nav = document.querySelector('.nav-list');
            navWidth = nav.offsetWidth;
            break;
        case 'files':
            show_hamburger.setProps({ nav: [
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
                ] });
            show_hamburger.show();
            nav = document.querySelector('.nav-list');
            navHeight = nav.offsetHeight;
            break;
        case 'avatar':
            show_hamburger.setProps({ nav: [
                    {
                        type: NavType.Avatar,
                        title: 'Загрузить фото'
                    }
                ] });
            show_hamburger.show();
            nav = document.querySelector('.nav-list');
            navWidth = nav.offsetWidth / 2;
            break;
    }
    const res = { nav, hamburger: show_hamburger, navWidth, navHeight };
    return res;
}
//# sourceMappingURL=show_hamburger.js.map