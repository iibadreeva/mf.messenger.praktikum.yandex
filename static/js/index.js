import router from "./router.js";
import { CheckUserAPI } from "./modules/http/user-api.js";
import { Page404 } from "./pages/404/404.js";
import { Page500 } from "./pages/500/500.js";
import { Login } from "./pages/login/login.js";
import { Registration } from "./pages/registration/registration.js";
import { Chat } from "./pages/messenger/messenger.js";
router
    .useProtect('/profile', Chat)
    .useProtect('/', Chat)
    .use('/404', Page404)
    .use('/500', Page500);
const authListener = function () {
    new CheckUserAPI().request()
        .then(res => res.ok)
        .then((isAuth) => {
        if (isAuth) {
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