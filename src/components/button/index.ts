import Block from '../../core/block';
import Templator from '../../core/utils/templator/templator';

enum ButtonType {
  Link = 'link'
}

interface IContext {
  text: string,
  clName: string,
  type: ButtonType | string,
  handleClick?: Function,
  url?: string
}

export default class Button extends Block<IContext> {
  constructor(props:IContext) {
    super('div', '', props);
  }

  render() {
    let templ:string = '';
    const {type} = this.props as unknown as IContext

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