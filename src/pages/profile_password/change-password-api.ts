import HTTP from "../../core/modules/http";
import {BaseAPI} from "../../core/modules/http/base-api";
import {host} from "../../core/modules/actions";

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