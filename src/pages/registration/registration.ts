import Block from '../../core/block';
import Button from '../../components/button/index';
import Input from '../../components/input/index';
import render from '../../core/utils/render';
import Templator from '../../core/utils/templator';
import {overviewShow} from '../../core/utils/overview';
import {forma} from '../../core/utils/form';
import {IContext, context} from './data'

class Page extends Block<IContext> {
  constructor(props: IContext) {
    super('main', 'container', props);
  }

  render() {
    const templ = `
        <form class="log-form js-form">
          <div class="js-form-group">
            <span class="log-form__title">{{ title }}</span>
          </div>
          <div class="log-form__group-btn js-btn"></div>
        </form>`;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

export const registration = () => {
  const {formdata: {email, login, firstName, lastName, phone, password, passwordAgain}, btn, link}: IContext = context;

  const page = new Page(context);
  render('.container', page);

  render('.js-form-group', new Input(email, 'log-form__control'));
  render('.js-form-group', new Input(login, 'log-form__control'));
  render('.js-form-group', new Input(firstName, 'log-form__control'));
  render('.js-form-group', new Input(lastName, 'log-form__control'));
  render('.js-form-group', new Input(phone, 'log-form__control'));
  render('.js-form-group', new Input(password, 'log-form__control'));
  render('.js-form-group', new Input(passwordAgain, 'log-form__control'));

  render('.js-btn', new Button(btn));
  render('.js-btn', new Button(link));

  const form = <HTMLDivElement>document.getElementsByClassName('log-form')[0];
  if (form) {
    forma.listeners(form, false);
  }
  overviewShow();
}
