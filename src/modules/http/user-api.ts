import HTTP from "../http";
import {BaseAPI} from "./base-api";
import {host} from "../actions";

const userAPIInstance = new HTTP(host);
export class UserAPI extends BaseAPI {
  request() {
    return userAPIInstance.get('/api/v2/auth/user');
  }

  logout() {
    return userAPIInstance.post('/api/v2/auth/logout');
  }
}