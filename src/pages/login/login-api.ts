import HTTP from '../../core/modules/http';
import { BaseAPI } from '../../core/modules/http/base-api';
import { host } from '../../core/modules/actions';

const userAPIInstance = new HTTP(host);

export class LoginAPI extends BaseAPI {
  create(data: object) {
    return userAPIInstance.post('/api/v2/auth/signin', {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }
}
