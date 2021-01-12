import { isEqual } from './is_equal';

describe('isEqual', () => {
  it('Возвращает false если ссылки на объекты не равны', () => {
    const a: any = { a: 'test1' };
    const b: any = { a: 'test1' };

    expect(isEqual(a, b)).toEqual(false);
  });

  it('Возвращает true если ссылки на объекты равны', () => {
    const a: any = { a: 'test1' };
    const b = a;
    expect(isEqual(a, b)).toBeTruthy();
  });
});
