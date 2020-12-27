import Block from "../../core/block.js";
import Button from "../../components/button/index.js";
import Input from "../../components/input/index.js";
import Templator from "../../core/utils/templator.js";
import { overviewShow } from "../../core/utils/overview.js";
import { forma } from "../../core/utils/form.js";
import { context } from "./data.js";
import router from "../../router.js";
import { LoginAPI } from "./login-api.js";
export class Login extends Block {
    constructor() {
        const { formdata: { login, password }, btn, link, title } = context;
        super('main', '', {
            login: new Input(login).render(),
            password: new Input(password).render(),
            button: new Button(btn).render(),
            link: new Button(link).render(),
            title
        });
    }
    signin(data) {
        new LoginAPI()
            .create(data)
            .then((data) => {
            const { status } = data;
            if (status === 200) {
                router.isProtect = false;
                router.go('/chat');
            }
            else if (status >= 500) {
                router.go('/500');
            }
            else {
                alert('Не правильный логин или пароль');
            }
        });
    }
    goRegistration() {
        router.go('/registration');
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const form = this.element.querySelector('.log-form');
            const link = this.element.querySelector('.js-btn a');
            if (form) {
                forma.listeners(form);
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const inputs = form.querySelectorAll('input');
                    const data = forma.send(inputs, false);
                    if (data !== undefined && data !== null) {
                        this.signin(data);
                    }
                });
            }
            if (link) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.goRegistration();
                });
            }
        });
        overviewShow();
    }
    render() {
        const templ = `
        <form class="log-form js-form">
          <div>
            <span class="log-form__title">{{ title }}</span>
            <div class="log-form__control">
                {{ login }}
            </div>
            <div class="log-form__control">
                {{ password }}
            </div>
          </div>
          <div class="log-form__group-btn js-btn">
            {{ button }}
            {{ link }}
          </div>
        </form>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=login.js.map