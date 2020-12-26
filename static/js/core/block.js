import EventBus from "./event-bus.js";
export default class Block {
    constructor(tagName = "div", className = '', props = {}) {
        this.props = {};
        this.EVENTS = {
            INIT: 'init',
            FLOW_CDM: 'flow:component-did-mount',
            FLOW_CDU: 'flow:component-did-update',
            FLOW_RENDER: 'flow:render',
        };
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            this.lastActiveElement = document.activeElement;
            Object.assign(this.props, nextProps);
            const eventBus = this.eventBus();
            eventBus.emit(this.EVENTS.FLOW_RENDER);
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
        this.lastActiveElement;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(this.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(this.EVENTS.INIT, this.init.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));
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
        this.eventBus().emit(this.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        const eventBus = this.eventBus();
        eventBus.emit(this.EVENTS.FLOW_RENDER);
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
            deleteProperty() {
                throw new Error('No access');
            }
        });
        return proxyProps;
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = "block";
    }
    hide() {
        this.getContent().style.display = 'none';
    }
}
//# sourceMappingURL=block.js.map