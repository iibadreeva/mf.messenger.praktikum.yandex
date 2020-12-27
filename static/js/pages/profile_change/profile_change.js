import Block from "../../core/block.js";
import Button from "../../components/button/index.js";
import Avatar from "../../components/avatar/index.js";
import Templator from "../../core/utils/templator.js";
import checkProfile from "../../core/utils/check_profile.js";
import showHamburger from "../../core/utils/show_hamburger.js";
import Input from "../../components/input/index.js";
import { context } from "./data.js";
export class ProfileChange extends Block {
    constructor() {
        const { formdata: { email, login, firstName, lastName, phone }, btn, avatar } = context;
        super('main', '', {
            avatar: new Avatar(avatar).render(),
            email: new Input(email).render(),
            login: new Input(login).render(),
            first_name: new Input(firstName).render(),
            second_name: new Input(lastName).render(),
            phone: new Input(phone).render(),
            button: new Button(btn).render(),
        });
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const hamburgerBtn = this.element.querySelectorAll('.js-hamburger');
            checkProfile();
            showHamburger(hamburgerBtn);
        });
    }
    render() {
        const { avatar, button, email, login, first_name, second_name, phone } = this.props;
        const templ = `
        <main class="profile">
        <form>
          <div class="profile__left">
            <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
            <input type="file" name="avatar" accept="image/*">
          </div>
          <div class="profile__form js-btn">
            <div class="js-avatar">${avatar}</div>
            <div class="profile__items js-form">
              <div class="profile__item">${email}</div>
              <div class="profile__item">${login}</div>
              <div class="profile__item">${first_name}</div>
              <div class="profile__item">${second_name}</div>
              <div class="profile__item">${phone}</div>
            </div>
            ${button}
          </div>
        </form>
      </main>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=profile_change.js.map