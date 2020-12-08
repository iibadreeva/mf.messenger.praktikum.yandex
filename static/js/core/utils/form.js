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
//# sourceMappingURL=form.js.map