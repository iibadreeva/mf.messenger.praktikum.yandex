import router from './router';
// import { authorization } from './js/authorization';
// import { Header } from './js/components/';
// import { isAlreadyLogin } from './js/util/authHelpers';
import {CheckUserAPI} from "./pages/profile/user_api";

import {Page404} from "./pages/404/404";
import {Page500} from "./pages/500/500";


// isAlreadyLogin(authorization);

router
  // .useProtect('/', Page404)
  // .useProtect('/chat', Page500)
  .use('/404', Page404)
  .use('/500', Page500)
  // .start();

const authListener = function () {
  new CheckUserAPI().request()
    .then(res => res.ok)
    .then((isAuth) => {
      if(isAuth) {

        router.use('/', Page500)
        router.use('/profile', Page500)
      } else {
        router.use('/login', Page404)
        router.use('/registration', Page404)
      }
      router.start();
    });
};

authListener();
// document.addEventListener('changeAuthorization', authListener, false);
