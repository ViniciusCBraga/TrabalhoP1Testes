import { Evento } from "src/Models/Eventos";
import { EventoRepository } from "src/Repositories/EventoRepository";

export class EventoRepo implements EventoRepository{
    private eventos: Evento[] = [];
    private id: number = 0;

    async criarEvento(evento: Evento): Promise<Evento> {
        evento.id = ++this.id;     
        this.eventos.push(evento);
        return evento;
    }

    async obterEventos(): Promise<Evento[]> {
        return this.eventos;
    }

    async obterEvento(id: number): Promise<Evento | null> {
        const evento = this.eventos.find(evento => evento.id === id);
        return evento || null;
    }

    async atualizarEvento(evento: Evento): Promise<Evento | null> {
        const index = this.eventos.findIndex(e => e.id === evento.id);
        if (index === -1) {
          return null; // Retornar null quando o evento não existe
        }
        this.eventos[index] = evento;
        return evento;
      }
      

    async excluirEvento(id: number): Promise<boolean> {
        const index = this.eventos.findIndex(evento => evento.id === id);
        if (index === -1) {
            return false;
        } 
        this.eventos.splice(index, 1);
        return true;
    }


}