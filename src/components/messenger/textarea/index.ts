import Block from '../../../core/block';
import { template } from './template';

export default class Textarea extends Block<object> {
  constructor(props: object) {
    super('footer', '', props);
  }

  render() {
    return template();
  }
}
