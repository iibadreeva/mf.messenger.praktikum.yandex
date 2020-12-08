export const context = {
    avatar: {
        name: 'Инна',
        image: 'images/static_cat.jpg',
        change: true
    },
    goBack: '/profile.html',
    formdata: {
        email: {
            type: 'profile',
            config: {
                type: 'email',
                placeholder: 'Почта',
                dataType: 'email',
                value: 'Inna@yandex.ru'
            }
        },
        login: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Логин',
                dataType: 'login',
                dataSize: '3',
                value: 'Inna'
            }
        },
        firstName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Имя',
                dataType: 'text',
                value: 'Инна'
            }
        },
        lastName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Фамилия',
                dataType: 'text',
                value: 'Бадреева'
            }
        },
        phone: {
            type: 'profile',
            config: {
                type: 'tel',
                placeholder: 'Телефон',
                dataType: 'phone',
                value: '+7(909)967-30-30'
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