import { Evento } from '../../src/Models/Eventos';
import { EventoRepository } from '../../src/Repositories/EventoRepository';
import { EventoRepo } from '../../src/Repositories/inMemory/EventoRepo';

describe('EventoRepository', () => {
    let eventoRepository: EventoRepository;

    beforeEach(() => { 
      eventoRepository = new EventoRepo();
    });

    describe('criarEvento', () => {
      test('deve criar um novo evento', async () => {
        const eventoData: Evento = { id: 1, nome: 'Evento Teste criar', data: new Date('2023-01-01'), localizacao: 'Local Teste', capacidade: 100 };
        const novoEvento = await eventoRepository.criarEvento(eventoData);
        expect(novoEvento).toEqual(eventoData);
      });
    });
  
    describe('obterEventos', () => {
      test('deve retornar uma lista vazia quando não há eventos', async () => {
        const eventos = await eventoRepository.obterEventos();
        expect(eventos).toEqual([]);
      });
  
      test('deve retornar todos os eventos registrados', async () => {
        const evento1: Evento = { id: 1, nome: 'Evento 1', data: new Date('2023-01-01'), localizacao: 'Local 1', capacidade: 100 };
        const evento2: Evento = { id: 2, nome: 'Evento 2', data: new Date('2023-01-02'), localizacao: 'Local 2', capacidade: 200 };
        await eventoRepository.criarEvento(evento1);
        await eventoRepository.criarEvento(evento2);
        const eventos = await eventoRepository.obterEventos();
        expect(eventos).toEqual([evento1, evento2]);
      });
    });
  
    describe('obterEventoPorId', () => {
      test('deve retornar null para um ID inexistente', async () => {
        const evento = await eventoRepository.obterEvento(1234);
        expect(evento).toBeNull();
      });
  
      test('deve retornar o evento correto para um ID existente', async () => {
        const evento: Evento = { id: 1, nome: 'Evento Teste att', data: new Date('2023-01-01'), localizacao: 'Local Teste', capacidade: 100 };
        await eventoRepository.criarEvento(evento);
        const eventoObtido = await eventoRepository.obterEvento(1);
        expect(eventoObtido).toEqual(evento);
      });
    });
  
    describe('atualizarEvento', () => {

      test('deve retornar false para um evento inexistente', async () => {
        const eventoData: Evento = { id: 999, nome: 'Evento Teste', data: new Date('2023-01-01'), localizacao: 'Local Teste', capacidade: 100 };
        const eventoAtualizado = await eventoRepository.atualizarEvento(eventoData);
        expect(eventoAtualizado).toBe(null);
      });
    });

      test('deve atualizar um evento existente', async () => {
        const eventoData: Evento = { id: 1, nome: 'Evento Teste', data: new Date('2023-01-01'), localizacao: 'Local Teste', capacidade: 100 };
        await eventoRepository.criarEvento(eventoData);
        const eventoAtualizado = await eventoRepository.atualizarEvento(eventoData);
        expect(eventoAtualizado).toEqual(eventoData);
      });
  
    describe('excluirEvento', () => {
      test('deve excluir um evento existente', async () => {
        const eventoData: Evento = { id: 1, nome: 'Evento Teste', data: new Date('2023-01-01'), localizacao: 'Local Teste', capacidade: 100 };
        await eventoRepository.criarEvento(eventoData);
        const eventId = 1;
        const eventoExcluido = await eventoRepository.excluirEvento(eventId);
        expect(eventoExcluido).toBe(true);
      });

        test('deve retornar fase para um ID inexistente', async () => {
            const eventId = 199999;
            const eventoExcluido = await eventoRepository.excluirEvento(eventId);
            expect(eventoExcluido).toBe(false);
        }
        );
  
    });
  });