import {Event} from './event.js'
import { Observable } from './observable.js';

/**
 * Interfaz Observer para clases observadoras
 */
export interface Observer<T> {
	update(observable: Observable<T>) : void;
}