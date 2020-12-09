import Block from '../../core/block.js';
import Templator from '../../core/utils/templator.js';

interface IContext {
  text: string,
  clName: string,
  type: string,
  handleClick?: Function,
  url?: string
}

export default class Button extends Block<IContext> {
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
                 </a>`;
        break;
      default:
        templ = `<button
                    class="{{ clName }}"
                    ${this.props.handleClick ? 'onClick="{{ handleClick }}"' : ''}
                 >
                     {{ text }}
                 </button>`;
    }

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}