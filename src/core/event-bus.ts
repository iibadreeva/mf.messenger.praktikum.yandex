interface Event {
  listeners: [];
}
type EventHandler<T extends Event> = (event: T) => void;


export default class EventBus {
  constructor(private listeners: any = []) {}

  on<T extends Event>(event: string, callback: EventHandler<T>) {
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
        (listener: any) => listener !== callback
    );
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function(listener: any) {
      listener(...args);
    });
  }
};