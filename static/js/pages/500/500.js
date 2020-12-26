import Block from "../../core/block.js";
import Button from "../../components/button/index.js";
import { context } from "./data.js";
import router from "../../router.js";
export class Page500 extends Block {
    constructor() {
        super("main", 'error', {
            button: new Button(context.btn).render(),
            title: context.title,
            description: context.description,
        });
    }
    goHome() {
        router.go('/');
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const link = this.element.querySelector('.error__btn');
            if (link) {
                link.onclick = this.goHome.bind(this);
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
//# sourceMappingURL=500.js.map