import Block from '../../core/block';

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
    btnGroup: IBtnG[],
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
            <div class="modal__text ${titleCenter ? 'modal__text_center' : ''}">
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
            ${footer.btnGroup.map((button: IBtnG) => {
              return `<button class="modal__btn ${button.clName}">
                          ${button.title}
                      </button>`
            })}` :
            ''}
            </footer>
        </div>
      </div>`;

    return templ;
  }
}