import Block from '../../core/block';
import { template } from './template';

export interface IBtnG {
  clName: string;
  title: string;
  id?: string;
}

export interface IModal {
  title?: string;
  type?: string;
  titleCenter?: boolean;
  formData?: {
    label: string;
    value: string;
  };
  footer?:
    | {
        footerCenter: boolean;
        btnGroup: IBtnG[];
      }
    | undefined;
  radio?:
    | [
        {
          id: number;
          login: string;
        }
      ]
    | undefined;
  info?: string;
}

export default class Modal extends Block<IModal> {
  constructor(props: IModal) {
    super('div', '', props);
  }

  render() {
    return template(this.props);
  }
}
