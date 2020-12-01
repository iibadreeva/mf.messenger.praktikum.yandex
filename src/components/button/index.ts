import Block from '../../core/block.js';
import {Templator} from '../../core/utils.js';

interface IContext {
  textBtn: string
  handleClick: Function
}

export default class Button extends Block {
  constructor(props:IContext) {
    super('div', '', props);
  }

  render() {
    const templ = `<button onclick="{{ handleClick }}" class="error__btn">{{ textBtn }}</button>`;

    const tmpl:any = new Templator(templ);
    return tmpl.compile(this.props);
  }
}