import Block from '../../core/block';
import HeaderPhoto from '../../components/messenger/header-photo';
import Input from '../../components/input/index';
import Dialog from '../../components/messenger/dialog';
// import render from '../../core/utils/render';
import Templator from '../../core/utils/templator';
import showHamburger from '../../core/utils/show_hamburger';
import {IContext, context} from './data';

/*class Page extends Block<IContext> {
  constructor(props: IContext) {
    super('div', 'messenger', props);
  }

  render() {
    const templ = `
          <main class="messenger__left"></main>
          <aside class="messenger__right">
            <header class="messenger__header messenger__header_right"></header>
            <div class="messenger__content messenger__content_center">
              <p class="messenger__text">{{ description }}</p>
            </div>
          </aside>
        `;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

export const chat = () => {
  const {avatar, search, dialogs}: IContext = context;

  render('.container', new Page(context));
  render('.messenger__left', new HeaderPhoto(avatar, 'messenger__header'));
  render('.messenger__left', new Input(search, 'messenger__search'));
  render('.messenger__left', new Dialog({dialogs}, 'messenger__items'));

  showHamburger();
}*/

export class Chat extends Block<IContext> {
  constructor() {
    const {avatar, search, dialogs}: IContext = context;
    super(
      'div',
      'messenger',
      {
        description: context.description,
        header: new HeaderPhoto(avatar, 'messenger__header').render(),
        search: new Input(search).render(),
        dialogs: new Dialog({dialogs}, 'messenger__items').render(),
      }
    );
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const hamburgerBtn = this.element.querySelectorAll('.js-hamburger') || [];
      showHamburger(hamburgerBtn);
    });

  }

  render() {
    const templ = `
          <main class="messenger__left">
            <div class="messenger__header">{{ header }}</div>
            <div class="messenger__search">{{ search }}</div>
            <div class="messenger__items">{{ dialogs }}</div>
          </main>
          <aside class="messenger__right">
            <header class="messenger__header messenger__header_right"></header>
            <div class="messenger__content messenger__content_center">
              <p class="messenger__text">{{ description }}</p>
            </div>
          </aside>
        `;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}
