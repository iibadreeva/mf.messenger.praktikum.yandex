import Block from '../../core/block.js';
import Templator from '../../core/utils/templator.js'

interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    value: string,
    disabled?: string,
    dataType?: string,
    dataSize?: string,
  }
}

export default class Input extends Block<IInput> {
  constructor(props: IInput, className: string) {
    super('div', className, props);
  }

  render() {
    let templ = '';

    switch (this.props.type) {
      case 'lightForm':
        templ = `
            <input 
                  class="log-form__input"
                  placeholder="{{ config.placeholder }}"
                  type="{{ config.type }}"
                  data-type="{{ config.dataType }}"
                  data-text="{{ config.dataText }}"
                  ${this.props.config.dataSize ? 'data-size="{{ config.dataSize }}"' : ''}
                  ${this.props.config.disabled ? 'disabled="{{ config.disabled }}"' : ''}
                  value="{{ config.value }}"
                  autocomplete="off"
                  autocapitalize="off"
                  autocorrect="off"
             />
             <span class="log-form__error"></span>
            `;
        break;
      case 'profile':
        templ = `
            <div class="profile__label">{{ config.placeholder }}</div>
            <input 
                  class="profile__value"
                  placeholder="{{ config.placeholder }}"
                  type="{{ config.type }}"
                  data-type="{{ config.dataType }}"
                  ${this.props.config.dataSize ? 'data-size="{{ config.dataSize }}"' : ''}
                  ${this.props.config.disabled ? 'disabled="{{ config.disabled }}"' : ''}
                  value="{{ config.value }}"
                  autocomplete="off"
                  autocapitalize="off"
                  autocorrect="off"
             />
            `;
        break;
      case 'search':
        templ = `<input
                    type="{{ config.type }}"
                    class="messenger__search__input"
                    placeholder="{{ config.placeholder }}"
                    value="{{ config.value }}"
                 />`;
        break;
      default:
        templ = '';
    }

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}