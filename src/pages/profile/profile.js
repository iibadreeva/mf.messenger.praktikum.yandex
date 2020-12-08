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
var index_js_1 = require("../../components/avatar");
var utils_js_1 = require("../../core/utils.js");
var index_js_2 = require("../../components/input");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        return _super.call(this, 'main', 'error', props) || this;
    }
    Page.prototype.render = function () {
        var links = this.props.links;
        var templ = "\n        <main class=\"profile\">\n        <div class=\"profile__left\">\n          <div class=\"profile__left__arrow\"><i class=\"fa fa-long-arrow-left\"></i></div>\n        </div>\n        <div class=\"profile__form\">\n          <div class=\"js-avatar\"></div>\n          <div class=\"profile__items js-form\"></div>\n          <div class=\"profile__items\">\n            " + Object.keys(links).map(function (key) {
            return "<div class=\"profile__item\">\n                        <a class=\"profile__label " + links[key].className + "\" href=\"" + links[key].url + "\">" + links[key].name + "</a>\n                     </div>";
        }).join('') + "\n          </div>\n        </div>\n      </main>";
        return templ;
    };
    return Page;
}(block_js_1["default"]));
var context = {
    avatar: {
        name: 'Инна',
        image: 'images/static_cat.jpg'
    },
    formdata: {
        email: {
            type: 'profile',
            config: {
                type: 'email',
                placeholder: 'Почта',
                disabled: 'disabled',
                value: 'Inna@yandex.ru'
            }
        },
        login: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Логин',
                disabled: 'disabled',
                value: 'Inna'
            }
        },
        firstName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Имя',
                disabled: 'disabled',
                value: 'Инна'
            }
        },
        lastName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Фамилия',
                disabled: 'disabled',
                value: 'Бадреева'
            }
        },
        phone: {
            type: 'profile',
            config: {
                type: 'tel',
                placeholder: 'Телефон',
                disabled: 'disabled',
                value: '+7(909)967-30-30'
            }
        }
    },
    links: [
        {
            name: 'Изменить данные',
            url: '/profile_change.html',
            className: 'profile__label_link'
        },
        {
            name: 'Изменить пароль',
            url: '/profile_password.html',
            className: 'profile__label_link'
        },
        {
            name: 'Выйти',
            url: '#',
            className: 'profile__label_exit'
        }
    ]
};
var _a = context.formdata, email = _a.email, login = _a.login, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone, avatar = context.avatar;
utils_js_1.render('.container', new Page(context));
utils_js_1.render('.js-avatar', new index_js_1["default"](avatar));
utils_js_1.render('.js-form', new index_js_2["default"](email, 'profile__item'));
utils_js_1.render('.js-form', new index_js_2["default"](login, 'profile__item'));
utils_js_1.render('.js-form', new index_js_2["default"](firstName, 'profile__item'));
utils_js_1.render('.js-form', new index_js_2["default"](lastName, 'profile__item'));
utils_js_1.render('.js-form', new index_js_2["default"](phone, 'profile__item'));
