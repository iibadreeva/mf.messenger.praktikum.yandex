import Block from '../core/block.js';
import { Templator, render, showHamburger } from '../core/utils.js';
import HeaderPhoto from '../components/messenger/header-photo.js';
import Input from '../components/input/index.js';
import Dialog from '../components/messenger/dialog.js';
class Page extends Block {
    constructor(props) {
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
const context = {
    description: 'Пожалуйста, выберите чат, чтобы начать обмен сообщениями',
    avatar: {
        image: ''
    },
    search: {
        type: 'search',
        config: {
            type: 'text',
            placeholder: 'Поиск',
            value: ''
        }
    },
    dialogs: [
        {
            title: 'Андрей',
            avatar: '',
            date: 'Пт',
            message: {
                text: 'Изображение'
            }
        },
        {
            title: 'Киноклуб',
            avatar: '',
            date: '10:49',
            message: {
                text: 'стикер',
                my: true
            }
        },
        {
            title: 'Андрей',
            avatar: 'images/static_cat.jpg',
            date: 'Пт',
            message: {
                text: 'Друзья, у меня для вас особенный выпуск новостей!...'
            }
        },
        {
            title: 'Андрей',
            avatar: '',
            date: 'Ср',
            count: 2,
            message: {
                text: 'Друзья, у меня для вас особенный выпуск'
            }
        },
        {
            title: 'Андрей',
            avatar: '',
            date: 'Ср',
            message: {
                text: 'Изображение'
            }
        },
        {
            title: 'Андрей',
            avatar: '',
            date: 'Ср',
            message: {
                text: 'Изображение'
            }
        },
        {
            title: 'Андрей',
            avatar: '',
            date: 'Ср',
            message: {
                text: 'Изображение'
            }
        }
    ]
};
const { avatar, search, dialogs } = context;
render('.container', new Page(context));
render('.messenger__left', new HeaderPhoto(avatar, 'messenger__header'));
render('.messenger__left', new Input(search, 'messenger__search'));
render('.messenger__left', new Dialog({ dialogs }, 'messenger__items'));
showHamburger();
//# sourceMappingURL=messenger.js.map