export function render(query, block) {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(block.getContent());
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
const infoModal = (text = 'Ошибка, попробуйте ещё раз') => {
    const overview = document.getElementsByClassName('overview')[0];
    const body = document.body;
    const isModal = document.getElementsByClassName('modal')[0];
    if (!isModal) {
        const modal = document.createElement('div');
        const template = `<div class="modal__body">
                          <div class="modal__text modal__text_center">${text}</div>
                        </div>
                        <footer class="modal__footer modal__footer_center">
                          <button class="modal__btn modal__btn_wide js-add-user-btn">Поменять</button>
                        </footer>`;
        overview.classList.add('overview_active');
        modal.classList.add('modal');
        modal.innerHTML = template;
        body.appendChild(modal);
        const btn = document.getElementsByClassName('js-add-user-btn')[0];
        btn.addEventListener('click', () => {
            overview.classList.remove('overview_active');
            body.removeChild(modal);
        });
    }
};
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
                infoModal('Не все поля правильно заполнены');
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
            form.addEventListener('click', (event) => {
                const element = event.target;
                if (element.classList.contains('js-submit')) {
                    const inputs = form.querySelectorAll('input');
                    this.send(inputs, modal);
                }
            });
        }
    };
})();
//# sourceMappingURL=utils.js.map