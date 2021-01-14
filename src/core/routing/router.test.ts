import Router from './router';
import Block from '../block';

describe('Router', () => {
  /*it('Проверка на pathname', () => {
    const router = new Router();
    const mock = jest.fn();

    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      mock();
    });

    window.history.replaceState({}, '', '/404');
    window.addEventListener('popstate', mock);

    new PopStateEvent('popstate', {
      state: { page: 1 },
    });
    // window.dispatchEvent(new HashChangeEvent('hashchange'));
    //
    expect(mock).toBeCalled();

    mock.mockRestore();
  });*/

  it('Изменения пути при вызове router.go()', () => {
    const router = new Router();
    const mock = jest.fn();
    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      mock();
    });

    window.history.replaceState({}, '', 'login');
    router.go('/login');
    expect(window.location.pathname).toEqual('/login');
  });

  it('Вызов страницы при изменении пути1', () => {
    const router = new Router();

    const Mock = jest.fn();

    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      Mock();
    });

    router.use('/login', Mock).start();
    window.history.replaceState({}, '', '/login');

    expect(Mock).toBeCalled();
  });

  it('Изменение страниц', () => {
    const router = new Router();
    interface IContext {}

    class Component extends Block<IContext> {
      render() {
        return '<div>Login</div>';
      }
    }
    class Component2 extends Block<IContext> {
      render() {
        return '<div>Registration</div>';
      }
    }

    const mock = jest.fn();
    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      mock();
    });

    router.use('/login', Component).use('/registration', Component2).start();

    window.history.replaceState({}, '', '/login');
    window.history.replaceState({}, '', '/registration');

    expect(mock).toBeCalled();
  });
});
