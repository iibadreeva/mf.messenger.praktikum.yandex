import Block from '../../core/block';

interface IDialog {
  title: string,
  avatar: string,
  date: string,
  count?: number,
  isActive?: boolean,
  message: {
    text: string,
    isMy?: boolean
  }
}
interface IContext {
  dialogs: IDialog[]
}

export default class Dialog extends Block<IContext> {
  constructor(props:IContext, className: string) {
    super('ul', className, props);
  }

  render() {
    const {dialogs} = this.props as unknown as IContext;
    const templ = `
      ${dialogs.map(item => {
        return `
          <li class="messenger__item ${item.isActive ? 'messenger__item_active' : ''}">
            <div class="messenger__item__photo">
            <img class="messenger__item__image" src="${item.avatar}"></div>
            <div class="messenger__item__body">
              <div class="messenger__item__title">${item.title}</div>
              <div class="messenger__item__text">
                 ${item.message.isMy ? '<span>Вы:</span>' : ''}
                Изображение
              </div>
              <span class="messenger__item__info">${item.date}</span>
              ${item.count ? `<span class="messenger__item__number">${item.count}</span>` : ''}                     
              <span class="messenger__item__arrow js-hamburger" data-type="chat">
                <i class="fa fa-caret-down"></i>
              </span>
            </div>
          </li>`
        }).join('')}`

    return templ;
  }
}

