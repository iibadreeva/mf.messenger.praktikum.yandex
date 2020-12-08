export const context = {
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
        firstName: {
            type: 'lightForm',
            config: {
                type: 'text',
                placeholder: 'Имя',
                dataType: 'text',
                dataText: 'Поле не должно быть пустое',
                value: ''
            }
        },
        lastName: {
            type: 'lightForm',
            config: {
                type: 'text',
                placeholder: 'Фамилия',
                dataType: 'text',
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
        clName: 'log-form__btn log-form__btn_gray',
        type: 'link',
        url: '/login.html'
    },
    btn: {
        text: 'Зарегистрироваться',
        clName: 'log-form__btn',
        type: 'button',
    }
};
//# sourceMappingURL=data.js.map