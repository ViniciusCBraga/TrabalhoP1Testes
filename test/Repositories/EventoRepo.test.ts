import { EventoRepo } from "../../src/Repositories/inMemory/EventoRepo";
import { Evento } from "../../src/Models/Eventos";

describe('EventoRepository', () => {
    let eventoRepository: EventoRepo;

    beforeEach(() => {
        eventoRepository = new EventoRepo();
    });

    describe('criarEvento', () => {
        it('deve criar um evento', async () => {
            const evento = {
                id: 1,
                nome: "Teste",
                data: new Date(),
                localizacao: "Local teste",
                capacidade: 1000,
            } as Evento;

            const novoEvento = await eventoRepository.criarEvento(evento);

            expect(novoEvento).toEqual(evento);
        });
    });

    describe('obterEventos', () => {
        it('deve retornar uma lista de eventos', async () => {
            const evento1 = {
                id: 1,
                nome: "Teste",
                data: new Date(),
                localizacao: "Local teste",
                capacidade: 1000,
            } as Evento;

            const evento2 = {
                id: 2,
                nome: "Teste2",
                data: new Date(),
                localizacao: "Local teste2",
                capacidade: 10200,
            } as Evento;

            await eventoRepository.criarEvento(evento1);
            await eventoRepository.criarEvento(evento2);

            const eventos = await eventoRepository.obterEventos();

            expect(eventos).toEqual([evento1, evento2]);
        });
    });

    describe('obterEvento', () => {
        it('deve retornar um evento', async () => {
            const evento = {
                id: 1,
                nome: "Teste",
                data: new Date(),
                localizacao: "Local teste",
                capacidade: 1000,
            } as Evento;

            await eventoRepository.criarEvento(evento);

            const eventoObtido = await eventoRepository.obterEvento(1);

            expect(eventoObtido).toEqual(evento);
        });
    });

    describe('atualizarEvento', () => {
        it('deve atualizar um evento', async () => {
            const evento = {
                id: 1,
                nome: "Teste",
                data: new Date(),
                localizacao: "Local teste",
                capacidade: 1000,
            } as Evento;

            await eventoRepository.criarEvento(evento);

            const eventoAtualizado = {
                id: 1,
                nome: "Teste2",
                data: new Date(),
                localizacao: "Local teste2",
                capacidade: 1000,
            } as Evento;

            const eventoAtualizadoObtido = await eventoRepository.atualizarEvento(eventoAtualizado);

            expect(eventoAtualizadoObtido).toEqual(eventoAtualizado);
        });
    }
    );

    describe('deletarEvento', () => {
        it('deve deletar um evento', async () => {
            const evento = {
                id: 1,
                nome: "Teste",
                data: new Date(),
                localizacao: "Local teste",
                capacidade: 1000,
            } as Evento;

            await eventoRepository.criarEvento(evento);

            await eventoRepository.excluirEvento(1);

            const eventoObtido = await eventoRepository.obterEvento(1);

            expect(eventoObtido).toEqual(null);
        });
    }
    );

});
