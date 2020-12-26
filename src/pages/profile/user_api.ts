import HTTP from "../../core/modules/http";
import {BaseAPI} from "../../core/modules/base-api";


export const host = 'https://ya-praktikum.tech';

const userAPIInstance = new HTTP(host);

export class CheckUserAPI extends BaseAPI {
  request() {
    return userAPIInstance.get('/api/v2/auth/user')
  }
}