import Block from '../../core/block';
import {host} from "../../core/modules/actions";

interface IDialog {
  title: string;
  avatar:  string | null;
  id: string;
  isActive?: boolean;
}
interface IContext {
  dialogs?: IDialog[];
}

export default class Dialog extends Block<IContext> {
  constructor(props:IContext,) {
    super('ul', '', props);
  }

  render() {
    const {dialogs} = this.props as unknown as IContext;
    const templ = `
      ${dialogs ?
      `${dialogs.map(item => {
        return `
          <li
           class="messenger__item ${item.isActive ? 'messenger__item_active' : ''}"
           ${item.id ? `data-id=${item.id}` : ''}
           >
            <div class="messenger__item__photo">
              <img
                 class="messenger__item__image"
                 src="${item.avatar ? `${host}${item.avatar}` : ''}"
               >
             </div>
            <div class="messenger__item__body">
              <div class="messenger__item__title">${item.title}</div>
              <div class="messenger__item__text">&nbsp;</div>           
              <span class="messenger__item__arrow js-hamburger" data-type="chat">
                <i class="fa fa-caret-down"></i>
              </span>
            </div>
          </li>`
        }).join('')}` :
      ''}`

    return templ;
  }
}

