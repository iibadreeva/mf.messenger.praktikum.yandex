interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    dataType: string,
    dataText: string,
    dataSize?: string,
    value: string
  }
}

interface IBtn {
  text: string,
  clName: string,
  type: string,
  url?: string
}

export interface IContext {
  title: string,
  formdata: {
    login: IInput,
    password: IInput
  },
  link: IBtn,
  btn: IBtn
}

export const context:IContext = {
  title: 'Вход',
  formdata: {
    login: {
      type: 'lightForm',
      config: {
        type: 'text',
        placeholder: 'Логин',
        dataType: 'login',
        dataText: 'Ведите логин, не мение 3 символов',
        dataSize: '3',
        value: ''
      }
    },
    password: {
      type: 'lightForm',
      config: {
        type: 'password',
        placeholder: 'Пароль',
        dataType: 'password',
        dataText: 'Ведите пароль',
        value: ''
      }
    },
  },
  link: {
    text: 'Регистрация',
    clName: 'log-form__btn log-form__btn_gray js-route-link',
    type: 'link',
    url: '/registration'
  },
  btn: {
    text: 'Авторизоваться',
    clName: 'log-form__btn',
    type: 'button',
  }
};