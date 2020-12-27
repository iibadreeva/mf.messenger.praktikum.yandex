export const context = {
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
//# sourceMappingURL=data.js.map