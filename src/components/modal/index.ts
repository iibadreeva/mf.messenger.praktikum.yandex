import Block from '../../core/block.js';

interface IBtnG {
  clName: string,
  title: string
}

interface IModal {
  title?: string,
  type?: string,
  titleCenter?: boolean,
  formData?: {
    label: string,
    value: string
  },
  footer?: {
    footerCenter: boolean,
    btnGroup: IBtnG[]
  } | undefined
}

export default class Modal extends Block<IModal> {
  constructor(props: IModal) {
    super('div', '', props);
  }

  render() {
    if (Object.keys(this.props).length < 1) {
      return '';
    }
    const {
      title,
      type,
      titleCenter,
      formData,
      footer
    } : IModal= this.props;

    let templ = `
        <div class="modal">
          <div class="modal ${type === 'average' ? 'modal_average' : ''}">
          <div class="modal__body">
            <div
             class="modal__text ${titleCenter ? 'modal__text_center' : ''}">
              ${title}
             </div>
            ${formData ?
              `<div class="modal__control">
                <div class="modal__label">${formData.label}</div>
                <input class="modal__value" value="${formData.value}" autofocus>
              </div>` :
              ''
            }
            
          </div>
          ${footer ?
          `<footer class="modal__footer ${footer.footerCenter ? 'modal__footer_center' : ''}">
            ${Object.keys(footer.btnGroup).map((key: any) => {
              console.log(key)
              const button = footer.btnGroup[key];
              return `<button
                          class="modal__btn ${button.clName}"
                      >
                          ${button.title}
                      </button>`
            }).join('')}` :
            ''}
          </footer>
          </div>
        </div>`;

    return templ;
  }
}