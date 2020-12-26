import HTTP from "../http";
import {BaseAPI} from "./base-api";
import {host} from "../actions";

const userAPIInstance = new HTTP(host);
export class CheckUserAPI extends BaseAPI {
  request() {
    return userAPIInstance.get('/api/v2/auth/user')
  }
}