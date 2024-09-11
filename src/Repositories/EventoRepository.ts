import {Evento} from '../Models/Eventos';

export interface EventoRepository {
    criarEvento(evento: Evento): Promise<Evento>;
    obterEventos(): Promise<Evento[]>;
    obterEvento(id: number): Promise<Evento | null>;
    atualizarEvento(evento: Evento): Promise<Evento | null >;
    excluirEvento(id: number): Promise<boolean>;
}
