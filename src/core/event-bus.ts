interface Event {
  listeners: {};
}
type EventHandler<T extends Event> = (event: T) => void;

export default class EventBus {
  constructor(private listeners: Record<string, Function[]> = {}) {}

  on<T extends Event>(event: string, callback: EventHandler<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off<T extends Event>(event: string, callback: EventHandler<T>): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: string[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener: Function) {
      listener(...args);
    });
  }
}
