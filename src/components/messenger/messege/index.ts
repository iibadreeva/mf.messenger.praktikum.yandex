import Block from '../../../core/block';
import { template } from './template';

export interface IInfo {
  time: string;
  content?: string;
  isMy?: boolean;
  timeOnly?: string;
  date?: string;
  user_id?: number;
  user_name?: string;
  userId?: number;
}

export interface IChat {
  date: string;
  info: IInfo[];
}

export interface IContext {
  currentChat: IChat[];
}

export default class Messege extends Block<IContext> {
  constructor(props: IContext) {
    super('div', '', props);
  }

  render() {
    return template(this.props);
  }
}
