import Block from '../core/block.js';
import Button from "../components/button/index.js";
import {Templator, render} from "../core/utils.js";

/* Глобально для Handlebars */
/*declare let window:any;
declare global {
  interface Window { Handlebars: object; }
}*/

interface IBtn {
  text: string,
  clName: string,
  type: string,
  handleClick?: Function,
  url?: string
}

interface IContext {
  title: string,
  description: string,
  btn: IBtn
}

class Page extends Block {
  constructor(props: IContext) {
    super("main", 'error', props);
  }

  render() {
    const templ = `
        <h1 class="error__title">{{ title }}</h1>
        <div class="error__footer js-btn">
          <p class="error__text">{{ description }}</p>
        </div>`;

    const tmpl:any = new Templator(templ);
    return tmpl.compile(this.props);

    // способ исбользования Handlebars
    /*const source = "<p>Hello, my name is {{field1}}."
    const template = window.Handlebars.compile(source);
    return template(this.props);*/
  }
}

const context:IContext = {
  title: '404',
  description: 'Ой! Такой страницы нет на сайте :(',
  btn: {
    text: 'К чату?',
    clName: 'error__btn',
    type: 'button',
    handleClick: () => {
      console.log('check authorisation before');
    }
  }
};

render(".container", new Page(context));
render(".js-btn", new Button(context.btn as IBtn));