import EventBus from './event-bus.js';
export default class Block {
    constructor(tagName = "div", className = '', props = {}) {
        this.props = {};
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
            const eventBus = this.eventBus();
            eventBus.emit(Block.EVENTS.FLOW_RENDER);
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            className,
            props
        };
        try {
            this.props = this._makePropsProxy(props);
        }
        catch (error) {
            console.log(error);
        }
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _createResources() {
        const { tagName, className } = this._meta;
        this._element = this._createDocumentElement(tagName);
        if (className) {
            this._element.classList.add(className);
        }
    }
    init() {
        this._createResources();
        const eventBus = this.eventBus();
        eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    _componentDidMount() {
        this.componentDidMount();
        const eventBus = this.eventBus();
        eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) { }
    }
    componentDidUpdate(oldProps, newProps) {
        if (oldProps && newProps) { }
        return true;
    }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        const element = this._element;
        if (element) {
            element.innerHTML = block;
        }
    }
    render() { }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        const proxyProps = new Proxy(props, {
            get(target, prop) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет прав');
                }
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, val) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет прав');
                }
                target[prop] = val;
                return true;
            },
            deleteProperty(target, prop) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет прав');
                }
                delete target[prop];
                return true;
            }
        });
        return proxyProps;
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        const el = this.getContent();
        if (el) {
            el.style.display = "block";
        }
    }
    hide() {
        const el = this.getContent();
        if (el) {
            el.style.display = "none";
        }
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
};
//# sourceMappingURL=block.js.map