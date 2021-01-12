import { IContext } from './data';

export const template = (props: Record<string, IContext>) => {
  const { title, description, button } = props;
  const templ = `
    <h1 class="error__title">${title}</h1>
    <div class="error__footer">
      <p class="error__text">${description}</p>
      ${button}
    </div>`;
  return templ;
};
