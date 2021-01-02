function get(obj, path, defaultValue = 'something else') {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        result = result[key];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result !== null && result !== void 0 ? result : defaultValue;
}
export default class Templator {
    constructor(template) {
        this.TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
        this._template = template;
    }
    compile(ctx) {
        const template = this._template;
        return this._compileTemplate(template, ctx);
    }
    _compileTemplate(template, ctx) {
        let tmpl = template;
        let key = null;
        while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = get(ctx, tmplValue);
                if (typeof data === "function") {
                    window[tmplValue] = data;
                    tmpl = tmpl.replace(new RegExp(key[0], "gi"), `window.${key[1].trim()}()`);
                    continue;
                }
                tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
            }
        }
        return tmpl;
    }
}
//# sourceMappingURL=templator.js.map