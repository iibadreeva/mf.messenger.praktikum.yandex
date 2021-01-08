import EventBus from './event-bus';
import {ObjectKeyStringType} from "./types";

interface IMeta {
  tagName: string,
  className?: string,
  props: Record<string, Object>
}

export default abstract class Block<Props extends Object> {
  public props: Record<string, Props> = {};
  eventBus: () => EventBus;

  lastActiveElement: any;
  EVENTS: ObjectKeyStringType = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null = null;
  _meta: IMeta | null = null;

  constructor(tagName: string = "div", className:string = '', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      className,
      props
    };


    try {
      this.props = this._makePropsProxy(props);
    } catch (error) {
      console.log(error);
    }

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(this.EVENTS.INIT);
  }

  _registerEvents(eventBus:EventBus) {
    eventBus.on(this.EVENTS.INIT, this.init.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));//--
  }

  _createResources() {
    const { tagName, className } = this._meta!;
    this._element = this._createDocumentElement(tagName);
    if (className) {
      this._element.classList.add(className)
    }
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(this.EVENTS.FLOW_CDM);
  }

  _componentDidMount(): void {
    this.componentDidMount();
    const eventBus = this.eventBus();
    eventBus.emit(this.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(): void {}

  _componentDidUpdate(oldProps:MouseEvent, newProps:MouseEvent): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {}
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: MouseEvent, newProps: MouseEvent): boolean {
    if (oldProps && newProps) {}
    return true;
  }

  setProps = <T extends object>(nextProps: T): void => {
    if (!nextProps) {
      return;
    }

    this.lastActiveElement = document.activeElement;
    Object.assign(this.props, nextProps);

    const eventBus = this.eventBus();
    eventBus.emit(this.EVENTS.FLOW_RENDER);
  };

  get element(): HTMLElement {
    return <HTMLElement>this._element;
  }

  _render(): void {
    const block = this.render();

    const element:any = this._element;
    if (element) {
      element.innerHTML = block;
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent(): HTMLElement {
    return <HTMLElement>this.element;
  }

  _makePropsProxy(props: object) {
    const proxyProps = new Proxy(props, {
      get(target: any, prop: string) {
        if(prop.indexOf('_') === 0) {
          throw new Error('Нет прав')
        }

        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: any, prop: string, val:string) {
        if(prop.indexOf('_') === 0) {
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

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return <HTMLElement>document.createElement(tagName);
  }

  show(): void {
    this.getContent().style.display = "block";
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}