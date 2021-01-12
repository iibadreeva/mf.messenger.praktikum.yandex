import Block from '../../core/block';
import { template } from './template';

export enum InputType {
  LightForm = 'lightForm',
  Profile = 'profile',
  Search = 'search',
}

export interface IInput {
  disabled?: string;
  dataSize?: string;
  type: InputType | string;
  config: {
    type: string;
    placeholder: string;
    value: string;
    disabled?: string;
    dataType?: string;
    dataSize?: string;
  };
}

export default class Input extends Block<IInput> {
  constructor(props: IInput) {
    super('div', '', props);
  }

  render() {
    return template(this.props);
  }
}
