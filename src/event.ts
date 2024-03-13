/**
 * Interfaz Evento de tipo genérico
 */
export interface Event<T> {
  id : string;
  data : T;
}