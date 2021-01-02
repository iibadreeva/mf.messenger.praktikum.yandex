import Templator from "./templator";

const tmpl = '<div>Text</div>';
const tmplWithProp = '<div>{{ text }}</div>';
const expected = '<div>Text</div>';

describe('Шаблонизатор', () => {
  it('Возврат шаблона с данными', () => {
    const data = { text: 'Text' };
    const template = new Templator(tmplWithProp);

    const actual = template.compile(data);

    expect(actual).toEqual(expected);
  });

  it('Возврат шаблона без данных', () => {
    const template = new Templator(tmpl);

    const actual = template.compile({});

    expect(actual).toEqual(expected);
  });
});
