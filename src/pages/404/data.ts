export interface IBtn {
  text: string,
  clName: string,
  type: string,
  handleClick?: Function,
  url?: string
}

export interface IContext {
  title: string,
  description: string,
  btn: IBtn
}

export const context:IContext = {
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