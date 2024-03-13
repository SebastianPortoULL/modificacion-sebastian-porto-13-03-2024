import { Observer } from "./observer.js";
import { Event } from "./event.js";

/**
 * Interfaz Observable para clases observables
 */
export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(evento: Event<T>): void;
}