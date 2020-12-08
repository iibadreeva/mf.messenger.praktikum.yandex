export const context = {
    avatar: {
        name: 'Инна',
        image: 'images/static_cat.jpg'
    },
    goBack: '/profile.html',
    formdata: {
        oldPassword: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Старый пароль',
                dataType: 'password_old',
                dataText: '',
                value: 'yandex.ru'
            }
        },
        password: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Пароль',
                dataType: 'password',
                dataText: '',
                value: 'inna@yandex.ru'
            }
        },
        passwordAgain: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Пароль (еще раз)',
                dataType: 'password_again',
                dataText: 'Пароли не совпадают',
                value: 'inna@yandex.ru'
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