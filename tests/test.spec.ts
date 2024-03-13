import 'mocha';
import {expect} from 'chai';

import { MiEvento } from '../src/mi_evento.js'
import { MiEventoObserver, OpenCloseEventType } from '../src/mi_evento_observer.js';

describe('Tests para la clase MiEvento con su observador MiEventoObserver', () => {
  let mi_evento : MiEvento<string>;
  let primer_observador: MiEventoObserver;
  let segundo_observador: MiEventoObserver;

  beforeEach(() => {
    mi_evento = new MiEvento<string>('Evento 1', '');
    primer_observador = new MiEventoObserver(0, 'Observador 1');
    segundo_observador = new MiEventoObserver(1, 'Observador 2');
	});

  it('se crea una instancia de MiEvento', () => {
		expect(mi_evento).to.be.an.instanceof(MiEvento);
	});

  it('se crea una instancia de MiEventoObserver', () => {
		expect(primer_observador).to.be.an.instanceof(MiEventoObserver);
		expect(segundo_observador).to.be.an.instanceof(MiEventoObserver);
	});

  it('se inicializa correctamente una instancia de MiEvento', () => {
    expect(mi_evento.Id).to.be.deep.equal('Evento 1');
    expect(mi_evento.Data).to.be.deep.equal('');
  });

  it('se inicializa correctamente una instancia de MiEventoObserver', () => {
    expect(primer_observador.Id).to.be.deep.equal(0);
    expect(primer_observador.Name).to.be.deep.equal('Observador 1');

    expect(segundo_observador.Id).to.be.deep.equal(1);
    expect(segundo_observador.Name).to.be.deep.equal('Observador 2');
  });

  it('se suscribe correctamente un observador a MiEvento', () => {
    mi_evento.subscribe(primer_observador);
    expect(mi_evento.Observers).to.be.deep.equal([primer_observador]);
    mi_evento.subscribe(segundo_observador)
    expect(mi_evento.Observers).to.be.deep.equal([primer_observador, segundo_observador]);
    expect(() => mi_evento.subscribe(primer_observador)).to.throw(Error);
    expect(() => mi_evento.subscribe(segundo_observador)).to.throw(Error);
  });

  it('se desuscribe correctamente un observador de MiEvento', () => {
    mi_evento.subscribe(primer_observador);
    mi_evento.subscribe(segundo_observador);

    mi_evento.unsubscribe(primer_observador);
    expect(mi_evento.Observers).to.be.deep.equal([segundo_observador]);
    mi_evento.unsubscribe(segundo_observador);
    expect(mi_evento.Observers).to.be.deep.equal([]);
    expect(() => mi_evento.unsubscribe(primer_observador)).to.throw(Error);
    expect(() => mi_evento.unsubscribe(segundo_observador)).to.throw(Error);
  });

  it('se notifica abrir y cerrar correctamente la instancia de MiEvento', () => {
    mi_evento.subscribe(primer_observador);
    mi_evento.subscribe(segundo_observador);
    const open : string = OpenCloseEventType[0];
    mi_evento.onOpen(open);
    mi_evento.notify();
    const close : string = OpenCloseEventType[1];
    mi_evento.onClose(close);
    mi_evento.notify();
  });
});