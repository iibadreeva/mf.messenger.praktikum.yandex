import Block from '../../core/block';
import Templator from '../../core/utils/templator/templator'

export enum InputType {
  LightForm = 'lightForm',
  Profile = 'profile',
  Search = 'search'
}

interface IInput {
  disabled?: string;
  dataSize?: string;
  type: InputType | string,
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
  constructor(props: IInput) {
    super('div', '', props);
  }

  render() {
    let templ = '';
    const {type} = this.props as unknown as IInput;

    switch (type) {
      case InputType.LightForm :
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
      case InputType.Profile:
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
      case InputType.Search:
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