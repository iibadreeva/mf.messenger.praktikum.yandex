import HTTP from "../../modules/http.js";
import { BaseAPI } from "../../modules/http/base-api.js";
import { host } from "../../modules/actions.js";
const userAPIInstance = new HTTP(host);
export class UserAPI extends BaseAPI {
    request() {
        return userAPIInstance.get('/api/v2/auth/user');
    }
}
//# sourceMappingURL=user_api.js.map