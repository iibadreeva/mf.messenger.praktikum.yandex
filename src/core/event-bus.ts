interface Event {
  listeners: [];
}
type EventHandler<T extends Event> = (event: T) => void;


export default class EventBus {
  // private listeners: any = [];

  constructor(private listeners: any = []) {
    // this.listeners  = [];
  }

  //on<T extends Event>(event:T, callback: EventHandler<T>) {
  on<T extends Event>(event: string, callback: EventHandler<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  //off<T extends Event>(event: T, callback: EventHandler<T>): void {
  off<T extends Event>(event: string, callback: EventHandler<T>): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
        (listener: any) => listener !== callback
    );
  }

  // emit<T extends Event>(event: T, ...args: any) {
  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function(listener: any) {
      listener(...args);
    });
  }
};