import Block from '../../../core/block';
import { template } from './template';

export interface IContext {
  image: string;
}

export default class Index extends Block<IContext> {
  constructor(props: IContext) {
    super('header', '', props);
  }

  render() {
    return template(this.props);
  }
}
