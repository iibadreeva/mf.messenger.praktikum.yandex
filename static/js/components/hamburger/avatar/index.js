import Block from '../../core/block.js';
import Templator from '../../core/utils/templator.js';
export default class Avatar extends Block {
    constructor(props) {
        super('div', '', props);
    }
    render() {
        const templ = `
        <div class="profile__heaed">
            <div class="profile__photo">
                <img class="profile__image" src="{{ image }}">
                ${this.props.change ? `
                    <div class="profile__placeholder js-hamburger" data-type="avatar">
                      <div class="profile__placeholder__text">Поменять
                        <div>аватар</div>
                      </div>
                    </div>` :
            ''}
            </div>
            <div class="profile__name">{{ name }}</div>
        </div>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=index.js.map