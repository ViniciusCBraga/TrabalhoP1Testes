import { Evento } from "../../src/Models/Eventos";
import { EventoController } from '../../src/Controllers/EventoController';
import { EventoRepository } from "../../src/Repositories/EventoRepository";
import { Request, Response } from 'express';

describe('EventoController', () => {
  let eventoController: EventoController;
  let eventoRepository: EventoRepository;

  beforeEach(() => {
    // Crie o mock do EventoRepository para simular o comportamento desejado
    const eventoRepositoryMock: EventoRepository = {
      criarEvento: jest.fn(),
      obterEventos: jest.fn(),
      obterEvento: jest.fn(),
      atualizarEvento: jest.fn(),
      excluirEvento: jest.fn(),
    };

    eventoRepository = eventoRepositoryMock;
    eventoController = new EventoController(eventoRepository);
  });

  // Teste para o método "criarEvento"
  describe('criarEvento', () => {
    // Deve criar um novo evento e retorná-lo
    it('deve criar um novo evento e retorná-lo', async () => {
      // Simula o corpo da requisição para criar um evento
      const req = {
        body: {
          nome: 'Evento 1',
          data: '2023-07-17',
          localizacao: 'Local 1',
          capacidade: 100,
        },
      } as Request;

      // Simula o objeto de resposta
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Evento que será retornado pelo mock do eventoRepository
      const novoEvento: Evento = {
        id: 1,
        nome: 'Evento 1',
        data: new Date('2023-07-17'),
        localizacao: 'Local 1',
        capacidade: 100,
      };
      jest.spyOn(eventoRepository, 'criarEvento').mockResolvedValue(novoEvento);

      // Chama o método a ser testado e aguarda a conclusão
      await eventoController.criarEvento(req, res);

      
      expect(res.status).toHaveBeenCalledWith(201);
      
      expect(res.json).toHaveBeenCalledWith(novoEvento);
    });

    // Deve lidar com erros ao criar um evento e retornar o código de status 500
    it('deve lidar com erros e retornar o código de status 500', async () => {
      
      const req = {
        body: {
          nome: 'Evento 1',
          data: '2023-07-17',
          localizacao: 'Local 1',
          capacidade: 100,
        },
      } as Request;

     
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Simula um erro ao criar o evento usando o mock do eventoRepository
      jest.spyOn(eventoRepository, 'criarEvento').mockRejectedValue(new Error('Falha ao criar evento'));

      
      await eventoController.criarEvento(req, res);

      
      expect(res.status).toHaveBeenCalledWith(500);
     
      expect(res.json).toHaveBeenCalledWith({ error: 'Nao foi possivel criar evento' });
    });
  });

  // Teste para o método "obterEventos"
  describe('obterEventos', () => {
    // Deve retornar uma lista de eventos
    it('deve retornar uma lista de eventos', async () => {
      
      const eventos: Evento[] = [
        { id: 1, nome: 'Evento 1', data: new Date('2023-07-17'), localizacao: 'Local 1', capacidade: 50 },
        { id: 2, nome: 'Evento 2', data: new Date('2023-07-17'), localizacao: 'Local 2', capacidade: 100 },
      ];

      const req = {} as Request;

      
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(), 
      } as unknown as Response;

      // Configura o mock do eventoRepository para retornar os eventos simulados
      jest.spyOn(eventoRepository, 'obterEventos').mockResolvedValue(eventos);

      
      await eventoController.obterEventos(req, res);

     
      expect(res.status).toHaveBeenCalledWith(200);
      
      expect(res.json).toHaveBeenCalledWith(eventos);
    });

    // Deve lidar com erros ao obter eventos e retornar o código de status 500
    it('deve lidar com erros e retornar o código de status 500', async () => {
      const req = {} as Request;

     
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      
      jest.spyOn(eventoRepository, 'obterEventos').mockRejectedValue(new Error('Falha ao obter eventos'));

      
      await eventoController.obterEventos(req, res);

      
      expect(res.status).toHaveBeenCalledWith(500);
      
      expect(res.json).toHaveBeenCalledWith({ error: 'Nao foi possivel obter eventos' });
    });
  });

  // Teste para o método "obterEvento"
describe('obterEvento', () => {
    // Deve retornar um evento existente
    it('deve retornar um evento existente', async () => {
      const eventoExistente: Evento = {
        id: 1,
        nome: 'Evento Existente',
        data: new Date('2023-07-17'),
        localizacao: 'Local Existente',
        capacidade: 100,
      };
  
      const req = {
        params: { id: '1' },
      } as unknown as Request;
  
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
  
      // Configura o mock do eventoRepository para retornar o evento simulado
      jest.spyOn(eventoRepository, 'obterEvento').mockResolvedValue(eventoExistente);
  
      await eventoController.obterEvento(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(eventoExistente);
    });
  
    // Deve lidar com a obtenção de um evento inexistente e retornar o código de status 404
    it('deve lidar com a obtenção de um evento inexistente e retornar o código de status 404', async () => {
      const req = {
        params: { id: '100' },
      } as unknown as Request;
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;
  
      // Configura o mock do eventoRepository para retornar null quando o evento não existe
      jest.spyOn(eventoRepository, 'obterEvento').mockResolvedValue(null);
  
      await eventoController.obterEvento(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
    });
  });
  

  // Teste para o método "atualizarEvento"
  describe('atualizarEvento', () => {
    // Deve atualizar um evento existente e retorná-lo
    it('deve atualizar um evento existente e retorná-lo', async () => {
      const req = {
          params: { id: '1' },
          body: {
              nome: 'Evento Atualizado',
              data: '2023-07-18',
              localizacao: 'Local Atualizado',
              capacidade: 200,
          },
      } as unknown as Request;
    
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
    
      const eventoExistente: Evento = {
        id: 1,
        nome: 'Evento Antigo',
        data: new Date('2023-07-18'),
        localizacao: 'Local Antigo',
        capacidade: 100,
      };
    
      const eventoAtualizado: Evento = {
        id: 1,
        nome: 'Evento Atualizado',
        data: new Date('2023-07-18'),
        localizacao: 'Local Atualizado',
        capacidade: 200,
      };
    
      // Mock do repositório para encontrar o evento
      jest.spyOn(eventoRepository, 'obterEvento').mockResolvedValue(eventoExistente);
    
      // Mock do repositório para atualizar o evento
      jest.spyOn(eventoRepository, 'atualizarEvento').mockResolvedValue(eventoAtualizado);
    
      await eventoController.atualizarEvento(req, res);
    
      expect(res.json).toHaveBeenCalledWith(eventoAtualizado);
    });
    

    // Deve lidar com a atualização de um evento inexistente e retornar o código de status 404
    it('deve lidar com a atualização de um evento inexistente e retornar o código de status 404', async () => {
      const req = {

          body: {
              nome: 'Evento Atualizado',
              data: '2023-07-18',
              localizacao: 'Local Atualizado',
              capacidade: 22
          },
      }  as Request;

     
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

     
      jest.spyOn(eventoRepository, 'atualizarEvento').mockResolvedValue(null);

     
      await eventoController.atualizarEvento(req, res);

     
      expect(res.status).toHaveBeenCalledWith(404);
      
      expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
    });

    it('deve lidar com erros ao atualizar um evento e retornar o código de status 500', async () => {
      const req = {
          params: { id: '1' },
          body: {
              nome: 'Evento Atualizado',
              data: '2023-07-18',
              local: 'Local Atualizado',
          },
      } as unknown as Request;

     
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      
      jest.spyOn(eventoRepository, 'atualizarEvento').mockRejectedValue(new Error('Falha ao atualizar evento'));

      
      await eventoController.atualizarEvento(req, res);

      
      expect(res.status).toHaveBeenCalledWith(500);
      
      expect(res.json).toHaveBeenCalledWith({ error: 'Nao foi possivel atualizar evento' });
    } );
   } );   

    // Testes para o método "excluirEvento"
    describe('excluirEvento', () => {
        // Deve excluir um evento existente e retornar uma mensagem de sucesso
        it('deve excluir um evento existente e retornar uma mensagem de sucesso', async () => {
          const req = {
              params: { id: '1' },
          } as unknown as Request;
    
         
          const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          } as unknown as Response;
    
        
          jest.spyOn(eventoRepository, 'excluirEvento').mockResolvedValue(true);
    
        
          await eventoController.excluirEvento(req, res);
    
          // Verifica se o método "excluirEvento" foi chamado com o ID do evento
          expect(eventoRepository.excluirEvento).toHaveBeenCalledWith(1);
          
          expect(res.status).toHaveBeenCalledWith(204);
          // Verifica se o método "send" foi chamado
          expect(res.send).toHaveBeenCalled();
        });
    
        // Deve lidar com a exclusão de um evento inexistente e retornar o código de status 404
        it('deve lidar com a exclusão de um evento inexistente e retornar o código de status 404', async () => {
            const req = {
                params: { id: '100' },
            } as unknown as Request;
        
           
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
           
            jest.spyOn(eventoRepository, 'excluirEvento').mockResolvedValue(false);
        
           
            await eventoController.excluirEvento(req, res);
        
            // Verifica se o método "excluirEvento" foi chamado com o ID do evento
            expect(eventoRepository.excluirEvento).toHaveBeenCalledWith(100);
           
            expect(res.status).toHaveBeenCalledWith(404);
           
            expect(res.json).toHaveBeenCalledWith({ error: 'Evento não encontrado' });
        });

        it('deve lidar com erros ao excluir um evento e retornar o código de status 500', async () => {
            const req = {
                params: { id: '1' },
            } as unknown as Request;
        
           
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
           
            jest.spyOn(eventoRepository, 'excluirEvento').mockRejectedValue(new Error('Falha ao excluir evento'));
        
           
            await eventoController.excluirEvento(req, res);
        
            // Verifica se o método "excluirEvento" foi chamado com o ID do evento
            expect(eventoRepository.excluirEvento).toHaveBeenCalledWith(1);
           
            expect(res.status).toHaveBeenCalledWith(500);
           
            expect(res.json).toHaveBeenCalledWith({ error: 'Nao foi possivel excluir evento' });
        });
    });
  });
