import Block from "../../core/block.js";
import Avatar from "../../components/avatar/index.js";
import render from "../../core/utils/render.js";
import Input from "../../components/input/index.js";
import { context } from "./data.js";
class Page extends Block {
    constructor(props) {
        super('main', '', props);
    }
    render() {
        const { links } = this.props;
        const templ = `
        <main class="profile">
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <div class="profile__form">
          <div class="js-avatar"></div>
          <div class="profile__items js-form"></div>
          <div class="profile__items">
            ${links.map(item => {
            return `<div class="profile__item">
                        <a class="profile__label ${item.className}" href="${item.url}">${item.name}</a>
                     </div>`;
        })}
          </div>
        </div>
      </main>`;
        return templ;
    }
}
export const profile = () => {
    const { formdata: { email, login, firstName, lastName, phone }, avatar } = context;
    render('.container', new Page(context));
    render('.js-avatar', new Avatar(avatar));
    render('.js-form', new Input(email, 'profile__item'));
    render('.js-form', new Input(login, 'profile__item'));
    render('.js-form', new Input(firstName, 'profile__item'));
    render('.js-form', new Input(lastName, 'profile__item'));
    render('.js-form', new Input(phone, 'profile__item'));
};
//# sourceMappingURL=profile.js.map