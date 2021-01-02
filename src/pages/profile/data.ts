export interface UserI {
  avatar: string | null;
  display_name: string | null;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    disabled: string,
    value: string
  }
}

export interface ILinks {
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
    first_name: IInput,
    second_name: IInput,
    phone: IInput,
  },
  links: ILinks[]
}

export const context:IContext = {
  avatar: {
    name: '',
    image: ''
  },
  formdata: {
    email: {
      type: 'profile',
      config: {
        type: 'email',
        placeholder: 'Почта',
        disabled: 'disabled',
        value: '1'
      }
    },
    login: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Логин',
        disabled: 'disabled',
        value: ''
      }
    },
    first_name: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Имя',
        disabled: 'disabled',
        value: ''
      }
    },
    second_name: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Фамилия',
        disabled: 'disabled',
        value: ''
      }
    },
    phone: {
      type: 'profile',
      config: {
        type: 'tel',
        placeholder: 'Телефон',
        disabled: 'disabled',
        value: ''
      }
    }
  },
  links: [
    {
      name: 'Изменить данные',
      url: '/change',
      className: 'profile__label_link js-change'
    },
    {
      name: 'Изменить пароль',
      url: '/password',
      className: 'profile__label_link js-password'
    },
    {
      name: 'Выйти',
      url: '/',
      className: 'profile__label_exit'
    }
  ]
};