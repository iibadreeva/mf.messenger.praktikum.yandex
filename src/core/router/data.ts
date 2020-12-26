import {Page404} from "../../pages/404/404";
import {Page500} from "../../pages/500/500";
import {login} from "../../pages/login/login";
import {registration} from "../../pages/registration/registration";
import {chat} from "../../pages/messenger/messenger";
import {profile} from "../../pages/profile/profile";
import {profileChange} from '../../pages/profile_change/profile_change'
import {profilePassword} from '../../pages/profile_password/profile_password'

export interface routesI {
  path: string,
  getTemplate: Function
}

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