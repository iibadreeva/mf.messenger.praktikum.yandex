import HTTP from '../../core/modules/http';
import { BaseAPI } from '../../core/modules/http/base-api';
import { host } from '../../core/modules/actions';

const userAPIInstance = new HTTP(host);

export class ChangeUserApi extends BaseAPI {
  update(data: object) {
    return userAPIInstance.put('/api/v2/user/profile', {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(data),
    });
  }

  updateAvatar(data: FormData) {
    return userAPIInstance.put('/api/v2/user/profile/avatar', {
      data: data,
    });
  }
}
