import { Evento } from "src/Models/Eventos";
import { EventoRepository } from "src/Repositories/EventoRepository";

export class EventosUseCase {
    constructor(private eventoRepository: EventoRepository) { }

    async criarEvento(evento: Evento): Promise<Evento> {
        return this.eventoRepository.criarEvento(evento);
    }

    async obterEventos(): Promise<Evento[]> {
        return this.eventoRepository.obterEventos();
    }

    async obterEvento(id: number): Promise<Evento | null> {
        return this.eventoRepository.obterEvento(id);
    }

    async atualizarEvento(evento: Evento): Promise<Evento | null> {
        return this.eventoRepository.atualizarEvento(evento);
    }

    async excluirEvento(id: number): Promise<boolean> {
        return this.eventoRepository.excluirEvento(id);
    }

}