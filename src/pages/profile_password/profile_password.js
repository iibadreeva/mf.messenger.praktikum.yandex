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
var index_js_2 = require("../../components/avatar");
var utils_js_1 = require("../../core/utils.js");
var index_js_3 = require("../../components/input");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        return _super.call(this, 'main', 'error', props) || this;
    }
    Page.prototype.render = function () {
        var templ = "\n        <main class=\"profile\">\n        <a href=\"{{ goBack }}\"  class=\"profile__left\">\n          <div class=\"profile__left__arrow\"><i class=\"fa fa-long-arrow-left\"></i></div>\n        </a>\n        <form class=\"profile__form js-btn\">\n          <div class=\"js-avatar\"></div>\n          <div class=\"profile__items js-form\"></div>\n        </form>\n      </main>";
        var tmpl = new utils_js_1.Templator(templ);
        return tmpl.compile(this.props);
    };
    return Page;
}(block_js_1["default"]));
var context = {
    avatar: {
        name: 'Инна',
        image: 'images/static_cat.jpg'
    },
    goBack: '/profile.html',
    formdata: {
        oldPassword: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Старый пароль',
                dataType: 'password_old',
                dataText: '',
                value: 'yandex.ru'
            }
        },
        password: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Пароль',
                dataType: 'password',
                dataText: '',
                value: 'inna@yandex.ru'
            }
        },
        passwordAgain: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Пароль (еще раз)',
                dataType: 'password_again',
                dataText: 'Пароли не совпадают',
                value: 'inna@yandex.ru'
            }
        }
    },
    btn: {
        text: 'Сохранить',
        type: 'button',
        clName: 'profile__btn js-submit'
    }
};
var _a = context.formdata, oldPassword = _a.oldPassword, password = _a.password, passwordAgain = _a.passwordAgain, btn = context.btn, avatar = context.avatar;
// Выстраиваем разметку
utils_js_1.render('.container', new Page(context));
utils_js_1.render('.js-form', new index_js_3["default"](oldPassword, 'profile__item'));
utils_js_1.render('.js-form', new index_js_3["default"](password, 'profile__item'));
utils_js_1.render('.js-form', new index_js_3["default"](passwordAgain, 'profile__item'));
utils_js_1.render('.js-btn', new index_js_1["default"](btn));
utils_js_1.render('.js-avatar', new index_js_2["default"](avatar));
utils_js_1.modalCheck();
