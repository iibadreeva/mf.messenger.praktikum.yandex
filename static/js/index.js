import router from "./router.js";
import { CheckUserAPI } from "./pages/profile/user_api.js";
import { Page404 } from "./pages/404/404.js";
import { Page500 } from "./pages/500/500.js";
router
    .use('/404', Page404)
    .use('/500', Page500);
const authListener = function () {
    new CheckUserAPI().request()
        .then(res => res.ok)
        .then((isAuth) => {
        if (isAuth) {
            router.use('/', Page500);
            router.use('/profile', Page500);
        }
        else {
            router.use('/login', Page404);
            router.use('/registration', Page404);
        }
        router.start();
    });
};
authListener();
//# sourceMappingURL=index.js.map