import { IModal, IBtnG } from './index';

export const template = (props: Record<string, IModal>) => {
  if (Object.keys(props).length < 1) {
    return '';
  }
  const {
    title,
    type,
    titleCenter,
    formData,
    footer,
    radio,
    info,
  }: IModal = props;

  const templ = `
    <div class="modal">
      <div class="modal ${type === 'average' ? 'modal_average' : ''}">
        <div class="modal__body">
          <div class="modal__text ${titleCenter ? 'modal__text_center' : ''}">
            ${title}
          </div>
          ${
            formData
              ? `<div class="modal__control">
              <div class="modal__label">${formData.label}</div>
              <input class="modal__value" value="${formData.value}" autofocus>
            </div>`
              : ''
          }
          ${
            radio
              ? `<ul class="modal__lists">
              ${radio
                .map((item) => {
                  return `
                  <li class="modal__list">
                    <label>
                        <input class="modal__radio" type="radio" name="user" value="${item.id}">${item.login}
                    </label>
                  </li>`;
                })
                .join('')}
            </ul>`
              : ''
          }
          ${
            info
              ? `<div class="modal__text modal__text_center">
              ${info}
            </div>`
              : ''
          }
        </div>
        ${
          footer
            ? `<footer class="modal__footer ${
                footer.footerCenter ? 'modal__footer_center' : ''
              }">
            ${footer.btnGroup
              .map((button: IBtnG) => {
                return `
                <button
                  class="modal__btn ${button.clName}"
                  ${button.id ? `data-id="${button.id}"` : ''}
                >
                  ${button.title}
                </button>`;
              })
              .join('')}
          </footer>`
            : ''
        }
      </div>
    </div>`;

  return templ;
};
