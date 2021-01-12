import { IInput, InputType } from './index';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IInput>) => {
  let templ = '';
  const { type } = (props as unknown) as IInput;

  switch (type) {
    case InputType.LightForm:
      templ = `
        <input 
          class="log-form__input"
          placeholder="{{ config.placeholder }}"
          type="{{ config.type }}"
          data-type="{{ config.dataType }}"
          data-text="{{ config.dataText }}"
          ${props.config.dataSize ? 'data-size="{{ config.dataSize }}"' : ''}
          ${props.config.disabled ? 'disabled="{{ config.disabled }}"' : ''}
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
          ${props.config.dataSize ? 'data-size="{{ config.dataSize }}"' : ''}
          ${props.config.disabled ? 'disabled="{{ config.disabled }}"' : ''}
          value="{{ config.value }}"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
         />
        `;
      break;
    case InputType.Search:
      templ = `
        <input
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
  return tmpl.compile(props);
};
