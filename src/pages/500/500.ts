import Block from '../../core/block';
import Button from "../../components/button/index";
import {IBtn, IContext, context} from './data';
import router from "../../router";

export class Page500 extends Block<IContext> {
  constructor() {
    super("main", 'error', {
      button: new Button(context.btn as IBtn).render(),
      title: context.title,
      description: context.description,
    });
  }

  goHome() {
    router.go('/');
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const link: HTMLLinkElement | null = this.element.querySelector('.error__btn');
      if (link) {
        link.onclick = this.goHome.bind(this);
      }
    });
  }

  render() {
    const { title, description,  button } = this.props;
    const templ = `
        <h1 class="error__title">${title}</h1>
        <div class="error__footer">
          <p class="error__text">${description}</p>
          ${button}
        </div>`;
    return templ;
  }
}









