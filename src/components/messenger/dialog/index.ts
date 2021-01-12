import Block from '../../../core/block';
import { template } from './template';

interface IDialog {
  title: string;
  avatar: string | null;
  id: string;
  isActive?: boolean;
}

export interface IContext {
  dialogs?: IDialog[];
}

export default class Index extends Block<IContext> {
  constructor(props: IContext) {
    super('ul', '', props);
  }

  render() {
    return template(this.props);
  }
}
