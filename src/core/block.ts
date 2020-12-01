import EventBus from './event-bus.js';

interface IMeta {
  tagName: string
  className?: string
  props?: object
}

export default class Block {
  public props: any;
  public eventBus() {}
  // type tagName: string;
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
  };

  _element: HTMLElement | null = null;
  _meta: IMeta | null = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", className='', props = {}) {
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
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus:EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));//--
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
    const eventBus:any = this.eventBus();
    eventBus.emit(Block.EVENTS.FLOW_RENDER);
    // this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    const eventBus:any = this.eventBus();
    eventBus.emit(Block.EVENTS.FLOW_RENDER);
    // this.eventBus().emit(Block.EVENTS.FLOW_RENDER); //--
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(): void {}

  _componentDidUpdate(oldProps:MouseEvent, newProps:MouseEvent):void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {}
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: MouseEvent, newProps: MouseEvent): boolean {
    if (oldProps && newProps) {}
    return true;
  }

  setProps = <T extends object>(nextProps: T) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);

    const eventBus: any = this.eventBus();
    eventBus.emit(Block.EVENTS.FLOW_RENDER);
    // this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  };

  get element() {
    return this._element;
  }

  _render(): void {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    // this._element.innerHTML = block;

    const element: any = this._element;
    if (element) {
      element.innerHTML = block;
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return <HTMLElement>this.element;
  }

  _makePropsProxy(props: object): object {
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
          throw new Error('Нет прав')
        }

        target[prop] = val;
        return true;
      },
      deleteProperty(target:any, prop: string) {
        if(prop.indexOf('_') === 0) {
          throw new Error('Нет прав')
        }

        delete target[prop];
        return true;
      }
    });

    return proxyProps;
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return <HTMLElement>document.createElement(tagName);
  }

  show(): void {
    const el: HTMLElement | null = this.getContent();
    if(el) {
      el.style.display = "block";
    }
  }

  hide(): void {
    const el: HTMLElement | null = this.getContent();
    if(el) {
      el.style.display = "none";
    }
  }
}