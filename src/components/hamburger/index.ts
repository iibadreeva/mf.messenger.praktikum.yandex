import Block from '../../core/block';
import { template } from './template';

export enum NavType {
  Location = 'location',
  File = 'file',
  Media = 'photo-video',
  Avatar = 'avatar',
  CreateChat = 'create-chat',
  RemoveChat = 'remove-chat',
  AddUser = 'add-user',
  RemoveUser = 'remove-user',
  Profile = 'profiler',
}

interface INav {
  type?: NavType | string;
  title: string;
  clName?: string;
  to?: string;
}

export interface IContext {
  nav?: INav[];
}

export default class Hamburger extends Block<IContext> {
  constructor(props: IContext, className: string) {
    super('nav', className, props);
  }

  render() {
    return template(this.props);
  }
}
