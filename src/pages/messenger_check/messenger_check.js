"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var block_js_1 = require("../../core/block.js");
var utils_js_1 = require("../core/utils.js");
var header_photo_js_1 = require("../../components/messenger/header-photo.js");
var index_js_1 = require("../../components/input");
var dialog_js_1 = require("../../components/messenger/dialog.js");
var chat_js_1 = require("../../components/messenger/chat.js");
var textarea_js_1 = require("../../components/messenger/textarea.js");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        return _super.call(this, 'div', 'messenger', props) || this;
    }
    Page.prototype.render = function () {
        var templ = "\n          <main class=\"messenger__left\"></main>\n          <aside class=\"messenger__right\">\n            <header class=\"messenger__header messenger__header_right\">\n                <div class=\"messenger__header__hamburger js-hamburger\" data-type=\"chat\"><i class=\"fa fa-bars\"></i></div>\n            </header>\n            <div class=\"messenger__content\"></div>\n          </aside>\n        ";
        var tmpl = new utils_js_1.Templator(templ);
        return tmpl.compile(this.props);
    };
    return Page;
}(block_js_1["default"]));
var context = {
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
var avatar = context.avatar, search = context.search, dialogs = context.dialogs, currentChat = context.currentChat;
utils_js_1.render('.container', new Page(context));
utils_js_1.render('.messenger__left', new header_photo_js_1["default"](avatar, 'messenger__header'));
utils_js_1.render('.messenger__left', new index_js_1["default"](search, 'messenger__search'));
utils_js_1.render('.messenger__left', new dialog_js_1["default"]({ dialogs: dialogs }, 'messenger__items'));
utils_js_1.render('.messenger__content', new chat_js_1["default"]({ currentChat: currentChat }, 'messenger__chat'));
utils_js_1.render('.messenger__content', new textarea_js_1["default"]({}, 'editor'));
var scrollDown = function () {
    var chart = document.querySelector('.messenger__chat');
    if (chart) {
        chart.scrollTop = chart.scrollHeight;
    }
};
// Если много текста, скролим в конец
setTimeout(function () { return scrollDown(); }, 100);
utils_js_1.showHamburger();
