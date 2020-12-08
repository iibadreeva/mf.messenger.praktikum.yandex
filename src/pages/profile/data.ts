interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    disabled: string,
    value: string
  }
}

interface ILinks {
  name: string; url: string; className: string
}

export interface IContext {
  avatar: {
    name: string,
    image: string
  },
  formdata: {
    email: IInput,
    login: IInput,
    firstName: IInput,
    lastName: IInput,
    phone: IInput,
  },
  links: ILinks[]
}

export const context:IContext = {
  avatar: {
    name: 'Инна',
    image: 'images/static_cat.jpg'
  },
  formdata: {
    email: {
      type: 'profile',
      config: {
        type: 'email',
        placeholder: 'Почта',
        disabled: 'disabled',
        value: 'Inna@yandex.ru'
      }
    },
    login: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Логин',
        disabled: 'disabled',
        value: 'Inna'
      }
    },
    firstName: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Имя',
        disabled: 'disabled',
        value: 'Инна'
      }
    },
    lastName: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Фамилия',
        disabled: 'disabled',
        value: 'Бадреева'
      }
    },
    phone: {
      type: 'profile',
      config: {
        type: 'tel',
        placeholder: 'Телефон',
        disabled: 'disabled',
        value: '+7(909)967-30-30'
      }
    }
  },
  links: [
    {
      name: 'Изменить данные',
      url: '/profile_change.html',
      className: 'profile__label_link'
    },
    {
      name: 'Изменить пароль',
      url: '/profile_password.html',
      className: 'profile__label_link'
    },
    {
      name: 'Выйти',
      url: '#',
      className: 'profile__label_exit'
    }
  ]
};