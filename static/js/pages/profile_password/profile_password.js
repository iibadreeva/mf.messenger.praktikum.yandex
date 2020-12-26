import Block from "../../core/block.js";
import Button from "../../components/button/index.js";
import Avatar from "../../components/avatar/index.js";
import render from "../../core/utils/render.js";
import Templator from "../../core/utils/templator.js";
import checkProfile from "../../core/utils/check_profile.js";
import Input from "../../components/input/index.js";
import { context } from "./data.js";
class Page extends Block {
    constructor(props) {
        super('main', 'error', props);
    }
    render() {
        const templ = `
        <main class="profile">
        <a href="{{ goBack }}"  class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </a>
        <form class="profile__form js-btn">
          <div class="js-avatar"></div>
          <div class="profile__items js-form"></div>
        </form>
      </main>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
export const profilePassword = () => {
    const { formdata: { oldPassword, password, passwordAgain }, btn, avatar } = context;
    render('.container', new Page(context));
    render('.js-form', new Input(oldPassword, 'profile__item'));
    render('.js-form', new Input(password, 'profile__item'));
    render('.js-form', new Input(passwordAgain, 'profile__item'));
    render('.js-btn', new Button(btn));
    render('.js-avatar', new Avatar(avatar));
    checkProfile();
};
//# sourceMappingURL=profile_password.js.map