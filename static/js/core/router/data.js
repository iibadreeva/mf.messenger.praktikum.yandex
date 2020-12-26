import { Page404 } from "../../pages/404/404.js";
import { Page500 } from "../../pages/500/500.js";
import { login } from "../../pages/login/login.js";
import { registration } from "../../pages/registration/registration.js";
import { chat } from "../../pages/messenger/messenger.js";
import { profile } from "../../pages/profile/profile.js";
import { profileChange } from "../../pages/profile_change/profile_change.js";
import { profilePassword } from "../../pages/profile_password/profile_password.js";
export const routes = [
    {
        path: '/login',
        getTemplate: () => login(),
    },
    {
        path: '/registration',
        getTemplate: () => registration(),
    },
    {
        path: '/500',
        getTemplate: () => new Page404(),
    },
    {
        path: '/404',
        getTemplate: () => new Page500(),
    },
];
export const routesUser = [
    {
        path: '/chat',
        getTemplate: () => chat(),
    },
    {
        path: '/profile',
        getTemplate: () => profile(),
    },
    {
        path: '/change',
        getTemplate: () => profileChange(),
    },
    {
        path: '/password',
        getTemplate: () => profilePassword(),
    },
    {
        path: '/500',
        getTemplate: () => new Page404(),
    },
    {
        path: '/404',
        getTemplate: () => new Page500(),
    },
];
//# sourceMappingURL=data.js.map