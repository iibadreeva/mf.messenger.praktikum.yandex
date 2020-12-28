interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    dataType: string,
    dataSize?: string,
    value: string
  }
}
interface IBtn {
  text: string,
  clName: string,
  type: string,
  handleClick?: Function
}

export interface IContext {
  avatar: {
    name: string,
    image: string,
    change: boolean
  },
  formdata: {
    email: IInput,
    login: IInput,
    first_name: IInput,
    second_name: IInput,
    phone: IInput,
  },
  btn: IBtn
}

export const context:IContext = {
  avatar: {
    name: '',
    image: '',
    change: true
  },
  formdata: {
    email: {
      type: 'profile',
      config: {
        type: 'email',
        placeholder: 'Почта',
        dataType: 'email',
        value: ''
      }
    },
    login: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Логин',
        dataType: 'login',
        dataSize: '3',
        value: ''
      }
    },
    first_name: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Имя',
        dataType: 'first_name',
        value: ''
      }
    },
    second_name: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Фамилия',
        dataType: 'second_name',
        value: ''
      }
    },
    phone: {
      type: 'profile',
      config: {
        type: 'tel',
        placeholder: 'Телефон',
        dataType: 'phone',
        value: ''
      }
    }
  },
  btn: {
    text: 'Сохранить',
    type: 'button',
    clName: 'profile__btn js-submit',
  }
};