declare let window:any;
import Block from '../../core/block';
import render from '../../core/utils/render';
import Templator from '../../core/utils/templator';
import {context, IContext} from "../404/data";
// import Router2 from "../../core/router/route_2";
// import {routes} from "../../core/router/data";
// import Router2 from "../../core/router/route_2";
// console.log(routes)
// const router = new Router2();

// window.render = new Router2();

class Page extends Block<IContext> {
  constructor(props: IContext) {
    super("main", '', props);
  }

  render() {
    const templ = `
    <h1>Test 1</h1>
    <ul>
      <li><a class="js-route-link" href="/">Home</a></li>
      <li><a class="js-route-link" href="/test1">test1</a></li>
      <li><a class="js-route-link" href="/test2">test2</a></li>
      <li><a class="js-route-link" href="/test3">test2</a></li>
      <li><button class="js-route-link" to="back">back</button></li>
      <li><button class="js-route-link" to="forward">forward</button></li>
    </ul>
    
    <div data-router-outlet>
    `;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

// export const res = render(".container", new Page(context));

export const test1 = () => {
  render(".container", new Page(context));
}
