import Block from '../core/block.js';
import Button from "../components/button/index.js";
import {Templator, render} from "../core/utils.js";

interface IContext {
  title: string
  description: string
  subDescription: string
  btn: object
}
type btnType = {
  text: string,
  className: string,
  type: string,
  handleClick?: Function,
  url?: string
}

class Page extends Block {
  constructor(props: IContext) {
    // Создаём враппер дом-элемент button
    super("main", 'error', props);
  }

  render() {
    const templ = `
        <h1 class="error__title">{{ title }}</h1>
        <div class="error__footer js-btn">
          <p class="error__text">{{ description }}</p>
          <p class="error__text">{{ subDescription }}</p>
        </div>`;

    const tmpl:any = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

const context:IContext = {
  title: '500',
  description: 'К сожелению, страница недоступна.',
  subDescription: 'Мы уже работаем над устранением неисправностей',
  btn: {
    text: 'К чату?',
    clName: 'error__btn',
    type: 'button',
    handleClick: () => {
      console.log('check authorisation before');
    }
  }
};

const page = new Page(context);
render(".container", page);

const btn = context.btn as btnType
const button = new Button(btn);
render(".js-btn", button);










