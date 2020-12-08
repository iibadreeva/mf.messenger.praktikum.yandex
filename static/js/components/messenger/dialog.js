import Block from '../../core/block.js';
export default class Dialog extends Block {
    constructor(props, className) {
        super('ul', className, props);
    }
    render() {
        const { dialogs } = this.props;
        const templ = `
        ${Object.keys(dialogs).map(function (key) {
            const dialog = dialogs[key];
            return `<li class="messenger__item ${dialog.isActive ? 'messenger__item_active' : ''}">
                    <div class="messenger__item__photo">
                    <img class="messenger__item__image" src="${dialog.avatar}"></div>
                    <div class="messenger__item__body">
                      <div class="messenger__item__title">${dialog.title}</div>
                      <div class="messenger__item__text">
                         ${dialog.message.isMy ? '<span>Вы:</span>' : ''}
                        Изображение
                      </div>
                      <span class="messenger__item__info">${dialog.date}</span>
                      ${dialog.count ? `<span class="messenger__item__number">${dialog.count}</span>` : ''}                     
                      <span class="messenger__item__arrow js-hamburger" data-type="chat">
                        <i class="fa fa-caret-down"></i>
                      </span>
                    </div>
                  </li>`;
        }).join('')}`;
        return templ;
    }
}
//# sourceMappingURL=dialog.js.map