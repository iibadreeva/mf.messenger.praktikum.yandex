import { IContext } from './index';

export const template = (props: Record<string, IContext>) => {
  const { currentChat } = (props as unknown) as IContext;

  const templ = `<div class="messenger__chat">
    <div class="messenger__chat__body-empty"></div>
    <div class="messenger__chat__body">
      ${currentChat.map((currentChat) => {
        const { info } = currentChat;
        return `
          <div class="messenger__chat__date">${currentChat.date}</div>
          ${info
            .map((item) => {
              return `
              <div class="${
                item.isMy ? 'messenger__chat__out' : 'messenger__chat__in'
              }" >
                <div class="messenger__chat__title">
                    ${item.user_name ? item.user_name : ''}
                </div>
                ${item.content ? `${item.content}` : ''}
                <span class="messenger__chat__time">
                  ${item.timeOnly}
                </span>
              </div>`;
            })
            .join('')}
      `;
      })}
    </div>
    </div>`;

  return templ;
};
