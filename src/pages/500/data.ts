export interface IBtn {
  text: string,
  clName: string,
  type: string,
  handleClick: Function
}

export interface IContext {
  title: string,
  description: string,
  subDescription: string,
  btn: IBtn
}

export const context:IContext = {
  title: '500',
  description: 'К сожелению, страница недоступна.',
  subDescription: 'Мы уже работаем над устранением неисправностей',
  btn: {
    text: 'К чату?',
    clName: 'error__btn',
    type: 'button',
    handleClick: () => {
      console.log('check authorisation before');
    }
  }
};
