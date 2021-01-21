import { IContext } from './data';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  const { description } = props;
  const templ = `
    <main class="messenger__left">
      <div class="messenger__header">{{ header }}</div>
      <div class="messenger__search">{{ search }}</div>
      <div class="messenger__items">{{ dialogs }}</div>
    </main>
    <aside class="messenger__right">
      <header class="messenger__header messenger__header_right"></header>
      ${
        description
          ? `<div class="messenger__content messenger__content_center">
              <p class="messenger__text">{{ description }}</p>
            </div>`
          : `
          <div class="messenger__content">
            {{ messege }}
            {{ editor }}
          </div>`
      }
      
    </aside>`;

  const tmpl = new Templator(templ);
  return tmpl.compile(props);
};
