import HTTP from "../../modules/http.js";
import { BaseAPI } from "../../modules/http/base-api.js";
import { host } from "../../modules/actions.js";
const userAPIInstance = new HTTP(host);
export class LoginAPI extends BaseAPI {
    create(data) {
        return userAPIInstance.post('/api/v2/auth/signin', {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
}
//# sourceMappingURL=login-api.js.map