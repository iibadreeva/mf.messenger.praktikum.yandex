import Block from '../../core/block';
import { template } from './template';

export interface IContext {
  name: string;
  image: string;
  change?: boolean;
}

export default class Avatar extends Block<IContext> {
  constructor(props: IContext) {
    super('div', '', props);
  }

  render() {
    return template(this.props);
  }
}
