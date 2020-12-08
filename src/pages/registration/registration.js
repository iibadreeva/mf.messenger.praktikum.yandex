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
var index_js_1 = require("../../components/button");
var index_js_2 = require("../../components/input");
var utils_js_1 = require("../../core/utils.js");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        return _super.call(this, 'main', 'container', props) || this;
    }
    Page.prototype.render = function () {
        var templ = "\n        <form class=\"log-form js-form\">\n          <div class=\"js-form-group\">\n            <span class=\"log-form__title\">{{ title }}</span>\n          </div>\n          <div class=\"log-form__group-btn js-btn\"></div>\n        </form>";
        var tmpl = new utils_js_1.Templator(templ);
        return tmpl.compile(this.props);
    };
    return Page;
}(block_js_1["default"]));
var context = {
    title: 'Регистрация',
    formdata: {
        email: {
            type: 'lightForm',
            config: {
                type: 'email',
                placeholder: 'Почта',
                dataType: 'email',
                dataText: 'Email введен некорректно',
                value: ''
            }
        },
        login: {
            type: 'lightForm',
            config: {
                type: 'text',
                placeholder: 'Логин',
                dataType: 'login',
                dataSize: '3',
                dataText: 'Ведите логин, не мение 3 символов',
                value: ''
            }
        },
        firstName: {
            type: 'lightForm',
            config: {
                type: 'text',
                placeholder: 'Имя',
                dataType: 'text',
                dataText: 'Поле не должно быть пустое',
                value: ''
            }
        },
        lastName: {
            type: 'lightForm',
            config: {
                type: 'text',
                placeholder: 'Фамилия',
                dataType: 'text',
                dataText: 'Поле не должно быть пустое',
                value: ''
            }
        },
        phone: {
            type: 'lightForm',
            config: {
                type: 'tel',
                placeholder: 'Телефон',
                dataType: 'phone',
                dataText: 'Телефон не соответствует +79999999999',
                value: ''
            }
        },
        password: {
            type: 'lightForm',
            config: {
                type: 'password',
                placeholder: 'Пароль',
                dataType: 'password',
                dataText: '',
                value: ''
            }
        },
        passwordAgain: {
            type: 'lightForm',
            config: {
                type: 'password',
                placeholder: 'Пароль (еще раз)',
                dataType: 'password_again',
                dataText: 'Пароли не совпадают',
                value: ''
            }
        }
    },
    link: {
        text: 'Войти',
        clName: 'log-form__btn log-form__btn_gray',
        type: 'link',
        url: '/login.html'
    },
    btn: {
        text: 'Зарегистрироваться',
        clName: 'log-form__btn',
        type: 'button'
    }
};
var _a = context.formdata, email = _a.email, login = _a.login, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone, password = _a.password, passwordAgain = _a.passwordAgain, btn = context.btn, link = context.link;
var page = new Page(context);
utils_js_1.render('.container', page);
utils_js_1.render('.js-form-group', new index_js_2["default"](email, 'log-form__control'));
utils_js_1.render('.js-form-group', new index_js_2["default"](login, 'log-form__control'));
utils_js_1.render('.js-form-group', new index_js_2["default"](firstName, 'log-form__control'));
utils_js_1.render('.js-form-group', new index_js_2["default"](lastName, 'log-form__control'));
utils_js_1.render('.js-form-group', new index_js_2["default"](phone, 'log-form__control'));
utils_js_1.render('.js-form-group', new index_js_2["default"](password, 'log-form__control'));
utils_js_1.render('.js-form-group', new index_js_2["default"](passwordAgain, 'log-form__control'));
utils_js_1.render('.js-btn', new index_js_1["default"](btn));
utils_js_1.render('.js-btn', new index_js_1["default"](link));
var form = document.getElementsByClassName('log-form')[0];
if (form) {
    utils_js_1.forma.listeners(form, false);
}
utils_js_1.overviewShow();
