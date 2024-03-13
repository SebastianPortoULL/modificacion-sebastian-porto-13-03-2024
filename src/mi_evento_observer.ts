import { Observable } from "./observable.js";
import { Observer } from "./observer.js";
import { Event } from "./event.js";
import { MiEvento } from "./mi_evento.js";

export enum OpenCloseEventType {'OPEN', 'CLOSE'}

/**
 * Clase MiEventoObserver observador de la clase MiEvento
 */
export class MiEventoObserver implements Observer<string> {

  constructor(private id: number, private name: string) {
    this.id = id;
    this.name = name;
  }

  get Id() {
    return this.id;
  }
 
  get Name() {
    return this.name;
  }

  update(observable: MiEvento<string>) {
    switch(observable.Data) {
      case OpenCloseEventType[0]:
        console.log(`I am a MiEventoObserver called ${this.Name} ` +
                    `and I have observed that MiEvento ${observable.Id} ` +
                    `was opened`);
        break;
      case OpenCloseEventType[1]:
        console.log(`I am a MiEventoObserver called ${this.Name} ` +
                    `and I have observed that MiEvento ${observable.Id} ` +
                    `was closed`);
        break;
    }
  }
}