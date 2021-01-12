import Block from '../../core/block';
import { template } from './template';

export enum ButtonType {
  Link = 'link',
}

export interface IContext {
  text: string;
  clName: string;
  type: ButtonType | string;
  handleClick?: Function;
  url?: string;
}

export default class Button extends Block<IContext> {
  constructor(props: IContext) {
    super('div', '', props);
  }

  render() {
    return template(this.props);
  }
}
