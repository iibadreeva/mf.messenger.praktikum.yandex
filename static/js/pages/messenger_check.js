import Block from '../core/block.js';
import { Templator, render, showHamburger } from '../core/utils.js';
import HeaderPhoto from '../components/messenger/header-photo.js';
import Input from '../components/input/index.js';
import Dialog from '../components/messenger/dialog.js';
import Chat from '../components/messenger/chat.js';
import Textarea from '../components/messenger/textarea.js';
class Page extends Block {
    constructor(props) {
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
const context = {
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
            active: true,
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
    ],
    currentChat: [
        {
            date: 'Вчера',
            info: [
                {
                    time: '',
                    text: 'Страница с чатом. от дизайнеров Практикума, вам нужно будет самостоятельно доработать интерфейс. Например, выбрать как будет выглядеть кнопка или иконка удаления чата (а может ссылка или меню), где она будет располагаться, будет ли модальное окно с вопросом «Вы уверены?» и как оно будет выглядеть, что будет происходить после удаления.'
                },
                {
                    time: '11:15',
                    text: 'Очень интересно',
                    my: true,
                    watch: true
                }
            ]
        },
        {
            date: 'Сегодня',
            info: [
                {
                    time: '09:48',
                    text: 'Два блока: слева — список с чатами, но один из них должен быть активным; справа — блок с «лентой» переписки активного чата. Нужно отображать следующую информацию о сообщениях: дата отдельного сообщения, прочитано ли, дата переписки (например, 19 июля: «лента» сообщений за этот день). Необходимо выделять собеседников (цветом или расположением сообщений), а также само сообщение. Нужно уметь отправлять и отображать: обычный текст, Emoji, картинки, видео. Также должна быть возможность удалить чат. Обратите внимание, что этого нет в примере. Даже если решите использовать макет от дизайнеров Практикума, вам нужно будет самостоятельно доработать интерфейс. Например, выбрать как будет выглядеть кнопка или иконка удаления чата (а может ссылка или меню), где она будет располагаться, будет ли модальное окно с вопросом «Вы уверены?» и как оно будет выглядеть, что будет происходить после удаления.'
                },
                {
                    time: '10:01',
                    image: 'images/static_cat.jpg'
                },
                {
                    time: '11:15',
                    text: 'Спасибо',
                    my: true
                }
            ]
        }
    ]
};
const { avatar, search, dialogs, currentChat } = context;
render('.container', new Page(context));
render('.messenger__left', new HeaderPhoto(avatar, 'messenger__header'));
render('.messenger__left', new Input(search, 'messenger__search'));
render('.messenger__left', new Dialog({ dialogs }, 'messenger__items'));
render('.messenger__content', new Chat({ currentChat }, 'messenger__chat'));
render('.messenger__content', new Textarea({}, 'editor'));
const scrollDown = () => {
    const chart = document.querySelector('.messenger__chat');
    if (chart) {
        chart.scrollTop = chart.scrollHeight;
    }
};
setTimeout(() => scrollDown(), 100);
showHamburger();
//# sourceMappingURL=messenger_check.js.map