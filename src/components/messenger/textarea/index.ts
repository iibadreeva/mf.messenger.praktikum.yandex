import Block from '../../../core/block';
import { template } from './template';

export default class Textarea extends Block<object> {
  constructor(props: object, className: string) {
    super('footer', className, props);
  }

  render() {
    return template();
  }
}
