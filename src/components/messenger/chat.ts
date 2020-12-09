import Block from '../../core/block.js';

interface IInfo {
  time: string,
  text?: string,
  isMy?: true,
  image?: string,
  watch?: true
}

interface IChat {
  date: string,
  info: IInfo[]
}
interface IContext {
  currentChat: IChat[]
}

export default class Chat extends Block<IContext> {
  constructor(props:IContext, className: string) {
    super('div', className, props);
  }

  render() {
    const {currentChat} = this.props;

    const templ = `
        <div class="messenger__chat__body-empty"></div>
        <div class="messenger__chat__body">
          ${Object.keys(currentChat).map(function(key: string) {
    const {info} = currentChat[key];
    return `
              <div class="messenger__chat__date">${currentChat[key].date}</div>
              ${Object.keys(info).map(function(key: string) {
    const item = info[key];
    return `
                  <div
                   class="${item.isMy ? 'messenger__chat__out' :'messenger__chat__in'}"
                   >
                      ${item.text ? `${item.text}` :''}
                      ${item.image ?
                        `<div class="messenger__chat__image"><img src="${item.image}"></div>` :
                        ''}
                      <span
                        class="messenger__chat__time ${item.watch ? 'messenger__chat__time_active' :''}"
                      >
                        ${item.time}
                        ${item.isMy ?
                          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                            <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                          </svg>`:
                          ''}
                      </span>
                  </div>
                `;
  }).join('')}`;
  }).join('')}
        </div>`;

    return templ;
  }
}

