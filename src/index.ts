import router from './router';
// import { authorization } from './js/authorization';
// import { Header } from './js/components/';
// import { isAlreadyLogin } from './js/util/authHelpers';
import {CheckUserAPI} from './modules/http/user-api';

import {Page404} from "./pages/404/404";
import {Page500} from "./pages/500/500";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";
import {Chat} from "./pages/messenger/messenger";


// isAlreadyLogin(authorization);

router
  // .useProtect('/', Page404)
  // .useProtect('/chat', Page500)
  // .use('/', Login)
  .useProtect('/profile', Chat)
  .useProtect('/', Chat)
  .use('/404', Page404)
  .use('/500', Page500)
  // .start();

const authListener = function () {
  new CheckUserAPI().request()
    .then(res => res.ok)
    .then((isAuth) => {
      if(isAuth) {
        // router.use('/', Page500)
        // router.use('/profile', Page500)
        router.isProtect = false;
        // router.useDefault('/chat', Page500)
        router.start();
      } else {
        // router.use('/', Login)
        router.useDefault('/login', Login)
        // router.use('/login', Login)
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
