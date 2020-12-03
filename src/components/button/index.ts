import Block from '../../core/block.js';
import {Templator} from '../../core/utils.js';

interface IContext {
  text: string
  className: string
  type: string
  handleClick?: Function
  url?: string
}

export default class Button extends Block {
  constructor(props:IContext) {
    super('div', '', props);
  }

  render() {
    let templ:string = '';

    switch (this.props.type) {
      case 'link':
        templ = `<a
                    class="log-form__btn log-form__btn_gray"
                    href="{{ url }}"
                 >
                     {{ text }}
                 </a>`
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