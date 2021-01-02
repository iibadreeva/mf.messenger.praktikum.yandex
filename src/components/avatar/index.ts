import Block from '../../core/block';
import Templator from '../../core/utils/templator/templator';

interface IContext {
  name: string,
  image: string,
  change?: boolean
}

export default class Avatar extends Block<IContext> {
  constructor(props:IContext) {
    super('div', '', props);
  }

  render() {
    const templ:string = `
        <div class="profile__heaed">
            <div class="profile__photo">
                <img class="profile__image" src="{{ image }}">
                ${this.props.change ? `
                    <div class="profile__placeholder js-hamburger" data-type="avatar">
                      <div class="profile__placeholder__text">Поменять <br>аватар
                      </div>
                    </div>`:
                  ''}
            </div>
            <div class="profile__name">{{ name }}</div>
        </div>`;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}