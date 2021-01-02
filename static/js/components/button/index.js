import Block from "../../core/block.js";
import Templator from "../../core/utils/templator/templator.js";
var ButtonType;
(function (ButtonType) {
    ButtonType["Link"] = "link";
})(ButtonType || (ButtonType = {}));
export default class Button extends Block {
    constructor(props) {
        super('div', '', props);
    }
    render() {
        let templ = '';
        const { type } = this.props;
        switch (type) {
            case ButtonType.Link:
                templ = `<a
                    class="log-form__btn log-form__btn_gray"
                    href="{{ url }}"
                 >
                     {{ text }}
                 </a>`;
                break;
            default:
                templ = `<button
                    class="{{ clName }}"
                 >
                     {{ text }}
                 </button>`;
        }
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=index.js.map