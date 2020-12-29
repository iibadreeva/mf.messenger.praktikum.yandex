import router from "./router.js";
import { UserAPI } from "./modules/http/user-api.js";
import { Page404 } from "./pages/404/404.js";
import { Page500 } from "./pages/500/500.js";
import { Login } from "./pages/login/login.js";
import { Registration } from "./pages/registration/registration.js";
import { Chat } from "./pages/messenger/messenger.js";
import { Profile } from "./pages/profile/profile.js";
import { ProfileChange } from "./pages/profile_change/profile_change.js";
import { ProfilePassword } from "./pages/profile_password/profile_password.js";
router
    .useProtect('/chat', Chat)
    .useProtect('/profile', Profile)
    .useProtect('/change', ProfileChange)
    .useProtect('/password', ProfilePassword)
    .use('/404', Page404)
    .use('/500', Page500);
const authListener = function () {
    new UserAPI().request()
        .then(res => res.ok)
        .then((isAuth) => {
        if (isAuth) {
            router.use('/login', Login);
            router.use('/registration', Registration);
            router.isProtect = false;
            router.start();
        }
        else {
            router.useDefault('/login', Login);
            router.use('/registration', Registration);
            router.start();
        }
    });
};
authListener();
//# sourceMappingURL=index.js.map