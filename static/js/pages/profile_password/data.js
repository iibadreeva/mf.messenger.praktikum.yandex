export const context = {
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
//# sourceMappingURL=data.js.map