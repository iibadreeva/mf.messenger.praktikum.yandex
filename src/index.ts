import router from './router';
import {UserAPI} from './modules/http/user-api';
import {Page404} from "./pages/404/404";
import {Page500} from "./pages/500/500";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";
import {Chat} from "./pages/chat/chat";
import {Profile} from "./pages/profile/profile";
import {ProfileChange} from "./pages/profile_change/profile_change";
import {ProfilePassword} from "./pages/profile_password/profile_password";


router
  .useProtect('/chat', Chat)
  .useProtect('/profile', Profile)
  .useProtect('/change', ProfileChange)
  .useProtect('/password', ProfilePassword)
  .use('/404', Page404)
  .use('/500', Page500)

const app = function () {
  new UserAPI().request()
    .then(res => res.ok)
    .then((isAuth) => {
      if(isAuth) {
        //временно
        router.use('/login', Login)
        router.use('/registration', Registration)

        router.isProtect = false;
        // router.useDefault('/chat', Page500)
        router.start();
      } else {
        // router.use('/', Login)
        router.useDefault('/login', Login)
        router.use('/registration', Registration)
        router.start();
      }
    });
};

app();
