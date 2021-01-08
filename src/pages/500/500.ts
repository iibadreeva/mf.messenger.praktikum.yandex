import Block from '../../core/block';
import Button from "../../components/button/index";
import {IBtn, IContext, context} from './data';
import router from "../../router";
import {UserAPI} from "../../core/modules/http/user-api";

export class Page500 extends Block<IContext> {
  constructor() {
    super("main", 'error', {
      button: new Button(context.btn as IBtn).render(),
      title: context.title,
      description: context.description,
    });
  }

  goHome() {
    new UserAPI().request()
      .then(res => res.ok)
      .then((isAuth) => {
        if(isAuth) {
          router.go('/chat');
        } else {
          router.go('/login');
        }
      });
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const link: HTMLLinkElement | null = this.element.querySelector('.error__btn');
      if (link) {
        link.addEventListener('click', () => {
          this.goHome();
        });
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









