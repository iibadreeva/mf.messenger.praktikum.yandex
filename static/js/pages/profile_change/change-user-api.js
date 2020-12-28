import HTTP from "../../modules/http.js";
import { BaseAPI } from "../../modules/http/base-api.js";
import { host } from "../../modules/actions.js";
const userAPIInstance = new HTTP(host);
export class ChangeUserApi extends BaseAPI {
    update(data) {
        return userAPIInstance.put('/api/v2/user/profile', {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
    updateAvatar(data) {
        return userAPIInstance.put('/api/v2/user/profile/avatar', {
            data: data
        });
    }
}
//# sourceMappingURL=change-user-api.js.map