import Block from "../../core/block.js";
import Button from "../../components/button/index.js";
import { context } from "./data.js";
import router from "../../router.js";
import { UserAPI } from "../../modules/http/user-api.js";
export class Page404 extends Block {
    constructor() {
        super("main", 'error', {
            button: new Button(context.btn).render(),
            title: context.title,
            description: context.description,
        });
    }
    goHome() {
        new UserAPI().request()
            .then(res => res.ok)
            .then((isAuth) => {
            if (isAuth) {
                router.go('/');
            }
            else {
                router.go('/login');
            }
        });
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const link = this.element.querySelector('.error__btn');
            if (link) {
                link.addEventListener('click', () => {
                    this.goHome();
                });
            }
        });
    }
    render() {
        const { title, description, button } = this.props;
        const templ = `
        <h1 class="error__title">${title}</h1>
        <div class="error__footer">
          <p class="error__text">${description}</p>
          ${button}
        </div>`;
        return templ;
    }
}
//# sourceMappingURL=404.js.map