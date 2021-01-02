interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    dataType: string,
    dataText: string,
    value: string
  }
}
interface IBtn {
  text: string,
  clName: string,
  type: string,
  handleClick?: Function
}

interface IBtnG {
  clName: string,
  title: string
}

interface IModal {
  title: string,
  titleCenter: boolean,
  footer: {
    footerCenter: boolean,
    btnGroup: IBtnG[]
  }
}

export interface IContext {
  avatar: {
    name: string,
    image: string
  },
  formdata: {
    oldPassword: IInput,
    newPassword: IInput,
    passwordAgain: IInput,
  },
  btn: IBtn,
  modal: IModal
}

export const context:IContext = {
  avatar: {
    name: '',
    image: ''
  },
  formdata: {
    oldPassword: {
      type: 'profile',
      config: {
        type: 'password',
        placeholder: 'Старый пароль',
        dataType: 'oldPassword',
        dataText: '',
        value: ''
      }
    },
    newPassword: {
      type: 'profile',
      config: {
        type: 'password',
        placeholder: 'Пароль',
        dataType: 'newPassword',
        dataText: '',
        value: ''
      }
    },
    passwordAgain: {
      type: 'profile',
      config: {
        type: 'password',
        placeholder: 'Пароль (еще раз)',
        dataType: 'password_again',
        dataText: 'Пароли не совпадают',
        value: ''
      }
    }
  },
  btn: {
    text: 'Сохранить',
    type: 'button',
    clName: 'profile__btn js-submit',
  },
  modal: {
    title: 'Не все поля правильно заполнены',
    titleCenter: true,
    footer: {
      footerCenter: true,
      btnGroup: [
        {
          clName: 'modal__btn_wide js-modal-btn',
          title: 'Поменять',
        }
      ]
    }
  }
};