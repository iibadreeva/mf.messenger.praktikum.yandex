export const context = {
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
        firstName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Имя',
                dataType: 'text',
                value: ''
            }
        },
        lastName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Фамилия',
                dataType: 'text',
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
//# sourceMappingURL=data.js.map