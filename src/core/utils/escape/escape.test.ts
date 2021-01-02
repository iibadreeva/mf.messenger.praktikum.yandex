import {escape} from "./escape";

const input = document.createElement('input');

describe('escape', () => {
  it('Проверка на обычный текст', () => {
    input.value = 'test'
    const actual = escape(input);
    const expected = 'test';

    expect(actual).toEqual(expected);
  });

  it('Проверка на разметку', () => {
    input.value = '<a>test</a>'
    const actual = escape(input);
    const expected = '&lt;a&gt;test&lt;/a&gt;';

    expect(actual).toEqual(expected);
  });
});
