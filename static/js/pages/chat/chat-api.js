import HTTP from "../../modules/http.js";
import { BaseAPI } from "../../modules/http/base-api.js";
import { host } from "../../modules/actions.js";
const cartAPIInstance = new HTTP(host);
export class ChatApi extends BaseAPI {
    request() {
        return cartAPIInstance.get('/api/v2/chats');
    }
    createChat(data) {
        return cartAPIInstance.post('/api/v2/chats', {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
    deleteChat(data) {
        return cartAPIInstance.delete('/api/v2/chats', {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
    searchUser(data) {
        return cartAPIInstance.post('/api/v2/user/search', {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
    requestChatUser(id) {
        return cartAPIInstance.get(`/api/v2/chats/${id}/users`);
    }
    addUserToChat(data) {
        return cartAPIInstance.put('/api/v2/chats/users', {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
    deleteUserFromChat(data) {
        return cartAPIInstance.delete('/api/v2/chats/users', {
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
}
//# sourceMappingURL=chat-api.js.map