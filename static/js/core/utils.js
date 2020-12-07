import Modal from "../components/modal/index.js";
import Hamburger from "../components/hamburger/index.js";
export function render(query, block) {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(block.getContent());
    }
    return root;
}
function remove(query, block) {
    const root = document.querySelector(query);
    if (root) {
        root.removeChild(block.getContent());
    }
    return root;
}
function get(obj, path, defaultValue = 'something else') {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        result = result[key];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result !== null && result !== void 0 ? result : defaultValue;
}
export class Templator {
    constructor(template) {
        this.TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
        this._template = template;
    }
    compile(ctx) {
        const template = this._template;
        return this._compileTemplate(template, ctx);
    }
    _compileTemplate(template, ctx) {
        let tmpl = template;
        let key = null;
        while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = get(ctx, tmplValue);
                if (typeof data === "function") {
                    window[tmplValue] = data;
                    tmpl = tmpl.replace(new RegExp(key[0], "gi"), `window.${key[1].trim()}()`);
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
        overview.classList.remove('overview_active');
    }
}
export function overviewShow() {
    const overview = document.querySelector('.overview');
    if (overview) {
        overview.classList.add('overview_active');
    }
}
export const forma = (function () {
    const phoneRe = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    const emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;
    let matchList = [];
    return {
        showError: function (label, input) {
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
        hideError: function (label, input) {
            if (label) {
                label.textContent = '';
            }
            const parent = input.closest('.log-form__control');
            if (parent) {
                parent.classList.remove('log-form__control_error');
            }
            matchList.push(1);
        },
        validate: function (input, focus) {
            const label = input.nextElementSibling;
            let isPassword;
            if (input.dataset.type === 'password_again') {
                const passwordInput = input.parentNode.previousElementSibling.querySelector('input');
                isPassword = input.value !== passwordInput.value;
            }
            if (focus) {
                this.hideError(label, input);
            }
            else if (isPassword) {
                this.showError(label, input);
            }
            else if (input.dataset.type === 'email' && !input.value.match(emailRe)) {
                this.showError(label, input);
            }
            else if (input.dataset.type === 'phone' && !input.value.match(phoneRe)) {
                this.showError(label, input);
            }
            else if (input.dataset.size && input.value.length < parseInt(input.dataset.size)) {
                this.showError(label, input);
            }
            else if (input.value === '') {
                this.showError(label, input);
            }
            else {
                this.hideError(label, input);
            }
        },
        send: function (inputs, modal) {
            const data = [];
            matchList = [];
            Array.from(inputs).forEach((input) => {
                this.validate(input, false);
                const dataItem = {};
                dataItem[input.dataset.type] = input.value;
                data.push(dataItem);
            });
            const isValid = matchList.find(item => item === 0);
            if (isValid !== 0) {
                console.log('Данные: ', data);
            }
            else if (modal) {
                const overview = document.querySelector('.overview');
                if (overview) {
                    overview.classList.add('overview_active');
                }
                modal.show();
            }
        },
        listeners: function (form, modal) {
            form.addEventListener("blur", (event) => {
                const element = event.target;
                if (element.tagName === 'INPUT') {
                    this.validate(element, false);
                }
            }, true);
            form.addEventListener("focus", (event) => {
                const element = event.target;
                if (element.tagName === 'INPUT') {
                    this.validate(element, true);
                }
            }, true);
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const inputs = form.querySelectorAll('input');
                this.send(inputs, modal);
            });
        }
    };
})();
export function modalCheck() {
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
let hamburger = undefined;
export function showHamburger() {
    const modal = new Modal({});
    render('.container', modal);
    const hamburgerBtn = document.querySelectorAll('.js-hamburger') || [];
    Array.from(hamburgerBtn).forEach(item => {
        const element = item;
        element.addEventListener('click', (event) => {
            const type = element.dataset.type || '';
            if (hamburger) {
                remove('body', hamburger);
            }
            const { nav, navWidth, navHeight } = createNav(type);
            const x = event.pageX;
            const y = event.pageY;
            nav.style.left = `${x - navWidth + 10}px`;
            nav.style.top = `${y - navHeight}px`;
        });
    });
    const body = document.body;
    body.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav-list');
        const that = e.target;
        if (nav) {
            if (!that.closest('.js-hamburger')) {
                remove('body', hamburger);
                hamburger = undefined;
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
            createModal(type, modal);
        }
    });
}
function createNav(type) {
    let nav, navHeight = 0, navWidth = 0;
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
            nav = document.querySelector('.nav-list');
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
            nav = document.querySelector('.nav-list');
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
            nav = document.querySelector('.nav-list');
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
            nav = document.querySelector('.nav-list');
            navWidth = nav.offsetWidth / 2;
            break;
    }
    const res = { nav, hamburger, navWidth, navHeight };
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
//# sourceMappingURL=utils.js.map