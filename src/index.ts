import './sass/app.scss';
import router from './router';
import { UserAPI } from './core/modules/http/user-api';
import { Page404 } from './pages/404/404';
import { Page500 } from './pages/500/500';
import { Login } from './pages/login/login';
import { Registration } from './pages/registration/registration';
import { Chat } from './pages/chat/chat';
import { Profile } from './pages/profile/profile';
import { ProfileChange } from './pages/profile_change/profile_change';
import { ProfilePassword } from './pages/profile_password/profile_password';

router
  .useProtect('/messege', Chat)
  .useProtect('/profile', Profile)
  .useProtect('/change', ProfileChange)
  .useProtect('/password', ProfilePassword)
  .use('/404', Page404)
  .use('/500', Page500);

new UserAPI()
  .request()
  .then((res) => {
    if (res.status === 200) {
      return res.ok;
    } else {
      router.use('/500', Login);
    }
  })
  .then((isAuth) => {
    if (isAuth) {
      router.use('/login', Login);
      router.use('/registration', Registration);

      router.isProtect = false;
      router.start();
    } else {
      router.useDefault('/login', Login);
      router.use('/registration', Registration);
      router.start();
    }
  })
  .catch(() => router.go('/500'));
