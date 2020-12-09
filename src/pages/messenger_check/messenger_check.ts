import Block from '../../core/block.js';
import HeaderPhoto from '../../components/messenger/header-photo.js';
import Input from '../../components/input/index.js';
import Dialog from '../../components/messenger/dialog.js';
import Chat from '../../components/messenger/chat.js';
import Textarea from '../../components/messenger/textarea.js';
import render from '../../core/utils/render.js';
import Templator from '../../core/utils/templator.js';
import showHamburger from '../../core/utils/show_hamburger.js';
import {IContext, context} from './data.js';

class Page extends Block<IContext> {
  constructor(props: IContext) {
    super('div', 'messenger', props);
  }

  render() {
    const templ = `
          <main class="messenger__left"></main>
          <aside class="messenger__right">
            <header class="messenger__header messenger__header_right">
                <div class="messenger__header__hamburger js-hamburger" data-type="chat"><i class="fa fa-bars"></i></div>
            </header>
            <div class="messenger__content"></div>
          </aside>
        `;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

const {avatar, search, dialogs, currentChat}: IContext = context;

render('.container', new Page(context));
render('.messenger__left', new HeaderPhoto(avatar, 'messenger__header'));
render('.messenger__left', new Input(search, 'messenger__search'));
render('.messenger__left', new Dialog({dialogs}, 'messenger__items'));
render('.messenger__content', new Chat({currentChat}, 'messenger__chat'));
render('.messenger__content', new Textarea({}, 'editor'));

const scrollDown = () => {
  const chart = document.querySelector('.messenger__chat');

  if (chart) {
    chart.scrollTop = chart.scrollHeight;
  }
};
// Если много текста, скролим в конец
setTimeout(() => scrollDown(), 300);

showHamburger();

