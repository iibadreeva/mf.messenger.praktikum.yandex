import { IContext } from './data';

export const template = (props: Record<string, IContext>) => {
  const { links, avatar } = (props as unknown) as IContext;
  const { email, login, first_name, second_name, phone } = props;

  const templ = `
    <main class="profile">
      <div class="profile__left">
        <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
      </div>
      <div class="profile__form">
        <div class="js-avatar">
          ${avatar}
        </div>
        <div class="profile__items js-form">
          <div class="profile__item">${email}</div>
          <div class="profile__item">${login}</div>
          <div class="profile__item">${first_name}</div>
          <div class="profile__item">${second_name}</div>
          <div class="profile__item">${phone}</div>
        </div>
        <div class="profile__items">
          ${links
            .map((item) => {
              return `
              <div class="profile__item">
                <a class="profile__label ${item.className}" href="${item.url}">${item.name}</a>
              </div>`;
            })
            .join('')}
        </div>
      </div>
    </main>`;

  return templ;
};
