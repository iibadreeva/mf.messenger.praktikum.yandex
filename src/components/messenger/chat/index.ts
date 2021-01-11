import Block from '../../../core/block';
import {template} from './template';

interface IInfo {
  time: string,
  text?: string,
  isMy?: true,
  image?: string,
  watch?: true
}

interface IChat {
  date: string,
  info: IInfo[]
}

export interface IContext {
  currentChat: IChat[]
}

export default class Index extends Block<IContext> {
  constructor(props:IContext, className: string) {
    super('div', className, props);
  }

  render() {
    return template(this.props);
  }
}

