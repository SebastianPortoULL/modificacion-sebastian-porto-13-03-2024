import { Observable } from "./observable.js";
import { Observer } from "./observer.js";
import { Event } from "./event.js";

/**
 * Clase MiEvento de tipo génerico y observable
 */
export class MiEvento<T> implements Observable<T> {
  private observers: Observer<T>[] = [];

  constructor(private id: string, private data: T) {
    id = id;
    data = data;
  }

  get Id() {
    return this.id;
  }
 
  get Data() {
    return this.data;
  }

  get Observers() {
    return this.observers;
  }

  subscribe(observer: Observer<T>) {
    if (this.observers.includes(observer)) {
      throw new Error('The observer had already been subscribed');
    } else {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer: Observer<T>) {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      throw new Error('The observer has not been subscribed');
    } else {
      this.observers.splice(index, 1);
    }
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this));
  }

  onOpen(data: T) {
    const open: T = data;
    this.data = open;
    this.notify;
  }

  onClose(data: T) {
    const close: T = data;
    this.data = close;
    this.notify;
  }

}