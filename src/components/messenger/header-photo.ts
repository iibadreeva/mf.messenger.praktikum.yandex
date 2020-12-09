import Block from '../../core/block.js';
import Templator from '../../core/utils/templator.js'

interface IContext {
  image: string
}

export default class HeaderPhoto extends Block<IContext> {
  constructor(props:IContext, className: string) {
    super('header', className, props);
  }

  render() {
    const templ:string = `
            <div class="messenger__header__photo">
              <img class="messenger__header__image" src="{{ image }}">
            </div>
            <div class="messenger__header__hamburger js-hamburger" data-type="profile"><i class="fa fa-bars"></i></div>
            `;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}