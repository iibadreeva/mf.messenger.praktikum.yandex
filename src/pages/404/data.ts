export interface IBtn {
  text: string,
  clName: string,
  type: string,
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
    type: 'button'
  }
};