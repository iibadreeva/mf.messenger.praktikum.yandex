import HTTP from "../core/modules/http";
// import {BaseAPI} from "../core/modules/base-api";

// export interface UserI {
//   avatar: string | null;
//   display_name: string | null;
//   email: string;
//   first_name: string;
//   id: number;
//   login: string;
//   phone: string;
//   second_name: string;
// }

export const host = 'https://ya-praktikum.tech';

// interface XMLHttpRequest extends XMLHttpRequestEventTarget

export const testApi2 = () => {
  const testAPIInstance = new HTTP(host);
  return testAPIInstance.post('/api/v2/auth/signup', {
    headers: {
      'content-type': 'application/json', // Данные отправляем в формате JSON
    },
    data: {
      first_name: "Артурт",
      second_name: "Морган",
      login: `a.morgan`,
      email: `a.morgan@rdr2.com`,
      phone: "+71234567890",
      password: "p@ssw0rd"
    }
  })
    .then((data) => JSON.parse(<any>data))
    .catch(console.error);
}

// const userAPIInstance = new HTTP(host);

// export default class CheckAPI extends BaseAPI {
//   request() {
//     return userAPIInstance.get('/api/v2/auth/user')
//   }
// }