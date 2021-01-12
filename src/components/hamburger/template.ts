import { IContext, NavType } from './index';

export const template = (props: Record<string, IContext>) => {
  const { nav } = (props as unknown) as IContext;
  if (!nav || nav.length < 1) {
    return '';
  }

  const templ = `${nav
    .map((item) => {
      const { type, title, clName, to } = item;

      return `
      ${
        title
          ? `<li
          class="nav-list__item ${clName ? `${clName}` : ''}"
          ${type ? `data-type="${type}"` : ''}
          ${to ? `to="${to}"` : ''}
        >
          ${
            type === NavType.Media
              ? `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.619 20.5 4V14L14.5194 12.405C13.5108 12.136 12.4714 12 11.4275 12H10.5725C9.5286 12 8.4892 12.136 7.4806 12.405L1.5 14V4C1.5 2.619 2.6193 1.5 4 1.5ZM0 4C0 1.791 1.7909 0 4 0H18C20.2091 0 22 1.791 22 4V18C22 20.209 20.2091 22 18 22H4C1.7909 22 0 20.209 0 18V4ZM8 6C8 7.105 7.1046 8 6 8C4.8954 8 4 7.105 4 6C4 4.895 4.8954 4 6 4C7.1046 4 8 4.895 8 6Z" fill="#2F43F2"></path>
            </svg>"`
              : ''
          }
          ${
            type === NavType.File
              ? `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.619 20.5 4V12H16C13.7909 12 12 13.791 12 16V20.5H4C2.6193 20.5 1.5 19.381 1.5 18V4C1.5 2.619 2.6193 1.5 4 1.5ZM12 22H4C1.7909 22 0 20.209 0 18V4C0 1.791 1.7909 0 4 0H18C20.2091 0 22 1.791 22 4V12V18C22 20.209 20.2091 22 18 22H12Z" fill="#2F43F2"></path>
            </svg>"`
              : ''
          }
          ${
            type === NavType.Location
              ? `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 11C20.5 16.247 16.2467 20.5 11 20.5C5.7533 20.5 1.5 16.247 1.5 11C1.5 5.753 5.7533 1.5 11 1.5C16.2467 1.5 20.5 5.753 20.5 11ZM22 11C22 17.075 17.0751 22 11 22C4.9249 22 0 17.075 0 11C0 4.925 4.9249 0 11 0C17.0751 0 22 4.925 22 11ZM11 14C12.6569 14 14 12.657 14 11C14 9.343 12.6569 8 11 8C9.3431 8 8 9.343 8 11C8 12.657 9.3431 14 11 14Z" fill="#2F43F2"></path>
            </svg>`
              : ''
          }
          ${
            type === NavType.Avatar
              ? `<label for="avatar">${title}</label>`
              : `${title}`
          }       
        </li>`
          : ''
      }`;
    })
    .join('')}`;

  return templ;
};
