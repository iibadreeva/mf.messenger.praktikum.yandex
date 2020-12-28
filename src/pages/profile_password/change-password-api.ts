import HTTP from "../../modules/http";
import {BaseAPI} from "../../modules/http/base-api";
import {host} from "../../modules/actions";

const userAPIInstance = new HTTP(host);

export class ChangePasswordApi extends BaseAPI {
  update(data:object) {
    return userAPIInstance.put('/api/v2/user/password', {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    });
  }
}