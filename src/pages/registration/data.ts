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
    email: IInput,
    login: IInput,
    first_name: IInput,
    second_name: IInput,
    phone: IInput,
    password: IInput,
    passwordAgain: IInput
  },
  link: IBtn,
  btn: IBtn
}

export const context:IContext = {
  title: 'Регистрация',
  formdata: {
    email: {
      type: 'lightForm',
      config: {
        type: 'email',
        placeholder: 'Почта',
        dataType: 'email',
        dataText: 'Email введен некорректно',
        value: ''
      }
    },
    login: {
      type: 'lightForm',
      config: {
        type: 'text',
        placeholder: 'Логин',
        dataType: 'login',
        dataSize: '3',
        dataText: 'Ведите логин, не мение 3 символов',
        value: ''
      }
    },
    first_name: {
      type: 'lightForm',
      config: {
        type: 'text',
        placeholder: 'Имя',
        dataType: 'first_name',
        dataText: 'Поле не должно быть пустое',
        value: ''
      }
    },
    second_name: {
      type: 'lightForm',
      config: {
        type: 'text',
        placeholder: 'Фамилия',
        dataType: 'second_name',
        dataText: 'Поле не должно быть пустое',
        value: ''
      }
    },
    phone: {
      type: 'lightForm',
      config: {
        type: 'tel',
        placeholder: 'Телефон',
        dataType: 'phone',
        dataText: 'Телефон не соответствует +79999999999',
        value: ''
      }
    },
    password: {
      type: 'lightForm',
      config: {
        type: 'password',
        placeholder: 'Пароль',
        dataType: 'password',
        dataText: '',
        value: ''
      }
    },
    passwordAgain: {
      type: 'lightForm',
      config: {
        type: 'password',
        placeholder: 'Пароль (еще раз)',
        dataType: 'password_again',
        dataText: 'Пароли не совпадают',
        value: ''
      }
    }
  },
  link: {
    text: 'Войти',
    clName: 'log-form__btn log-form__btn_gray js-route-link',
    type: 'link',
    url: '/login'
  },
  btn: {
    text: 'Зарегистрироваться',
    clName: 'log-form__btn',
    type: 'button',
  }
};