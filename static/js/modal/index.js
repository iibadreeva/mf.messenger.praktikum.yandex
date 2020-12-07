import Block from '../../core/block.js';
import { Templator } from '../../core/utils.js';
export default class Button extends Block {
    constructor(props, className) {
        super('div', className, props);
    }
    render() {
        let templ = `<div class="modal__body">
                          <div class="modal__text modal__text_center">Добавить новго пользователя</div>
                          <div class="modal__control">
                            <div class="modal__label">Логин</div>
                            <input class="modal__value" value="Андрей" autofocus>
                          </div>
                        </div>
                        <footer class="modal__footer modal__footer_center">
                          <button class="modal__btn modal__btn_wide js-add-user-btn">Добавить</button>
                        </footer>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=index.js.map