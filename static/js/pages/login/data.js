export const context = {
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
        clName: 'log-form__btn log-form__btn_gray',
        type: 'link',
        url: '/registration.html'
    },
    btn: {
        text: 'Авторизоваться',
        clName: 'log-form__btn',
        type: 'button',
    }
};
//# sourceMappingURL=data.js.map