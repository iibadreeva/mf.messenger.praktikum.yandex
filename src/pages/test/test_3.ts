import Block from '../../core/block';
import render from '../../core/utils/render';
import Templator from '../../core/utils/templator';
import {context, IContext} from "../404/data";


class Page extends Block<IContext> {
  constructor(props: IContext) {
    super("main", '', props);
  }

  render() {
    const templ = `
        <h1>Test 3</h1>
        <ul>
          <li><a class="js-route-link" href="/">Home</a></li>
          <li><a class="js-route-link" href="/test1">test1</a></li>
          <li><a class="js-route-link" href="/test2">test2</a></li>
          <li><a class="js-route-link" href="/test3/1">test3</a></li>
          <li><button class="js-route-link" to="back">back</button></li>
          <li><button class="js-route-link" to="forward">forward</button></li>
        </ul>
    `;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

export const test3 = () => {
  render(".container", new Page(context));
}
// render(".container", new Page(context));