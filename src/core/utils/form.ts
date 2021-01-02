import {ObjectKeyStringType} from "../types";
import {escape} from "./escape/escape";

export const forma = (function () {
  const phoneRe = /^\+7|8[-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
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
    send: function(inputs: NodeListOf<Element>, modal: any):ObjectKeyStringType | undefined {
      const data:ObjectKeyStringType = {};
      matchList = [];
      Array.from(inputs).forEach((input: any) => {
        this.validate(input, false);

        const value = escape(input);

        if(input.dataset.type !== 'password_again') {
          data[input.dataset.type] = value;
        }
      });
      const isValid = matchList.find(item => item === 0);
      if (isValid !== 0) {
        return data;
      } else if (modal) {
        const overview = document.querySelector('.overview');
        if (overview) {
          overview.classList.add('overview_active');
        }

        modal.show();
      }
    },
    listeners: function (form:HTMLDivElement) {
      form.addEventListener("blur", (event: Event) => {
        const element = <HTMLInputElement>event.target

        if (element.tagName === 'INPUT') {
          this.validate(element, false);
        }
      }, true);

      form.addEventListener("focus", (event: Event) => {
        const element = <HTMLInputElement>event.target

        if (element.tagName === 'INPUT') {
          this.validate(element, true);
        }
      }, true);
    }
  };
})();