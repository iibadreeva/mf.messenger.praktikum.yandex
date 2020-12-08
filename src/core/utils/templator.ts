declare let window:any;
type ObjectType = {
  [key: string]: any;
}

function get<T extends object>(obj:T, path: string, defaultValue:string='something else'): any {
  const keys = path.split('.');

  let result:ObjectType = obj;
  for (let key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}

export default class Templator<T extends object> {
  private TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  private readonly _template:string;

  constructor(template:string) {
    this._template = template;
  }

  compile(ctx:T) {
    const template: string = this._template;
    return this._compileTemplate(template, ctx);
  }

  _compileTemplate(template:string, ctx:T) {
    let tmpl = template;
    let key = null;


    while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(ctx, tmplValue);

        if (typeof data === "function") {
          window[tmplValue] = data;
          tmpl = tmpl.replace(
            new RegExp(key[0], "gi"),
            `window.${key[1].trim()}()`
          );
          continue;
        }

        tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
      }
    }

    return tmpl;
  }
}