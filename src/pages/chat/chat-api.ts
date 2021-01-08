import HTTP from "../../core/modules/http";
import {BaseAPI} from "../../core/modules/http/base-api";
import {host} from "../../core/modules/actions";

const cartAPIInstance = new HTTP(host);

export class ChatApi extends BaseAPI {
  request() {
    return cartAPIInstance.get('/api/v2/chats');
  }

  createChat(data:object) {
    return cartAPIInstance.post('/api/v2/chats', {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    });
  }

  deleteChat(data:object) {
    return cartAPIInstance.delete('/api/v2/chats', {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    });
  }

  searchUser(data:object) {
    return cartAPIInstance.post('/api/v2/user/search', {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    });
  }

  requestChatUser(id: number) {
    return cartAPIInstance.get(`/api/v2/chats/${id}/users`);
  }

  addUserToChat(data:object) {
    return cartAPIInstance.put('/api/v2/chats/users', {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    });
  }

  deleteUserFromChat(data:object) {
    return cartAPIInstance.delete('/api/v2/chats/users', {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    });
  }
}