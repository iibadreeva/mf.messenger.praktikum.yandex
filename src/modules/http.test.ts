import HTTP from './http';
import {host, METHOD} from "./actions";

describe('Тест HTTP', () => {
  it('Проверка вызова метода queryStringify', () => {
    XMLHttpRequest.prototype.open = jest.fn();
    XMLHttpRequest.prototype.setRequestHeader = jest.fn();
    XMLHttpRequest.prototype.send = jest.fn();

    const options = {
      data: {
        name: 'Test',
      },
    };

    const http = new HTTP(host);
    const spy = jest.spyOn(http, 'queryStringify');
    http.get('', options);
    expect(spy).toHaveBeenCalled();
  });

  it('Был вызван метод XMLHttpRequest.send()', () => {
    const mock = jest.fn();
    XMLHttpRequest.prototype.open = jest.fn();
    XMLHttpRequest.prototype.setRequestHeader = jest.fn();
    XMLHttpRequest.prototype.send = mock;
    const options = {
      data: {
        name: 'Test',
      },
      headers: {
        'content-type': 'application/json'
      },
      method: METHOD.POST
    };
    const http = new HTTP(host);
    http.request('/api/v2/auth/signup', options);
    expect(mock).toBeCalled();
  });
});
