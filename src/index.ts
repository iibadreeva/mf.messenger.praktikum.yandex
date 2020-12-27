import router from './router';
// import { authorization } from './js/authorization';
// import { Header } from './js/components/';
// import { isAlreadyLogin } from './js/util/authHelpers';
import {UserAPI} from './modules/http/user-api';

import {Page404} from "./pages/404/404";
import {Page500} from "./pages/500/500";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";
import {Chat} from "./pages/messenger/messenger";
import {Profile} from "./pages/profile/profile";
import {ProfileChange} from "./pages/profile_change/profile_change";


// isAlreadyLogin(authorization);

router
  // .useProtect('/', Page404)
  // .useProtect('/chat', Page500)
  // .use('/', Login)
  .useProtect('/', Chat)
  .useProtect('/chat', Chat)
  .useProtect('/profile', Profile)
  .useProtect('/change', ProfileChange)
  .useProtect('/password', Profile)
  .use('/404', Page404)
  .use('/500', Page500)
  // .start();

const authListener = function () {
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

// setTimeout(() => router.go('/login'), 1000)
// setTimeout(() => router.go('/registration'), 2000)
// setTimeout(() => router.go('/login'), 3000)
// setTimeout(() => router.go('/registration'), 4000)


authListener();
// document.addEventListener('changeAuthorization', authListener, false);
