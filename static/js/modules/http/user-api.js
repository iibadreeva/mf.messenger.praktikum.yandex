import HTTP from "../http.js";
import { BaseAPI } from "./base-api.js";
import { host } from "../actions.js";
const userAPIInstance = new HTTP(host);
export class UserAPI extends BaseAPI {
    request() {
        return userAPIInstance.get('/api/v2/auth/user');
    }
    logout() {
        return userAPIInstance.post('/api/v2/auth/logout');
    }
}
//# sourceMappingURL=user-api.js.map