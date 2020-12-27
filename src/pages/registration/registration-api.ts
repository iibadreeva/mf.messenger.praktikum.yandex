import HTTP from "../../modules/http";
import {BaseAPI} from "../../modules/http/base-api";
import {host} from "../../modules/actions";

const userAPIInstance = new HTTP(host);

export class RegistrationApi extends BaseAPI {
  create(data:object) {
    return userAPIInstance.post('/api/v2/auth/signup', {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }
}