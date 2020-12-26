import HTTP from "../../core/modules/http.js";
import { BaseAPI } from "../../core/modules/base-api.js";
export const host = 'https://ya-praktikum.tech';
const userAPIInstance = new HTTP(host);
export class CheckUserAPI extends BaseAPI {
    request() {
        return userAPIInstance.get('/api/v2/auth/user');
    }
}
//# sourceMappingURL=user_api.js.map