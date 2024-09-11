import { Ingresso } from "../../src/Models/Ingresso";
import { IngressoRepository } from "../../src/Repositories/IngressoRepository";
import { IngressoController } from "../../src/Controllers/IngressoController";
import { Request, Response } from 'express';

describe('IngressoController', () => {
    let ingressoController: IngressoController;
    let ingressoRepository: IngressoRepository;

    beforeEach(() => {
        const ingressoRepositoryMock = {
            criarIngresso: jest.fn(),
            obterIngressos: jest.fn(),
            obterIngresso: jest.fn(),
            atualizarIngresso: jest.fn(),
            excluirIngresso: jest.fn(),
            obterIngressosPorEvento: jest.fn(),
        };
        ingressoRepository = ingressoRepositoryMock;
        ingressoController = new IngressoController(ingressoRepository);
    });

    describe('criarIngresso', () => {
        it('Deve retornar 201 quando o ingresso for criado com sucesso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            ingressoRepository.criarIngresso = jest.fn().mockResolvedValue(ingresso);

            const req = {
                body: ingresso,
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.criarIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(ingresso);
        });

        it('Deve retornar 500 quando ocorrer algum erro ao criar o ingresso', async () => {

            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            ingressoRepository.criarIngresso = jest.fn().mockRejectedValue(new Error());

            const req = {
                body: ingresso,
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.criarIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Não foi possivel criar ingresso' });
        });
    });

    describe('obterIngressos', () => {
        it('Deve retornar 200 quando os ingressos forem obtidos com sucesso', async () => {
            const ingressos = [
                {
                    id: 1,
                    idEvento: 1,
                    preco: 100,
                } as Ingresso,
                {
                    id: 2,
                    idEvento: 2,
                    preco: 200,
                } as Ingresso,
            ];

            ingressoRepository.obterIngressos = jest.fn().mockResolvedValue(ingressos);

            const req = {} as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.obterIngressos(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(ingressos);
        });

        it('Deve retornar 500 quando ocorrer algum erro ao obter os ingressos', async () => {
            ingressoRepository.obterIngressos = jest.fn().mockRejectedValue(new Error());

            const req = {} as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.obterIngressos(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Não foi possivel obter ingressos' });
        });
    });

    describe('obterIngresso', () => {
        it('Deve retornar 200 quando o ingresso for obtido com sucesso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            ingressoRepository.obterIngresso = jest.fn().mockResolvedValue(ingresso);

            const req = {
                params: {
                    id: 1,
                },
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.obterIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(ingresso);
        });

        it('Deve retornar 500 quando ocorrer algum erro ao obter o ingresso', async () => {
            ingressoRepository.obterIngresso = jest.fn().mockRejectedValue(new Error());

            const req = {
                params: {
                    id: 1,
                },
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.obterIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Não foi possivel obter ingresso' });
        });

        it('Deve retornar 404 quando o ingresso não for encontrado', async () => {
            ingressoRepository.obterIngresso = jest.fn().mockResolvedValue(null);

            const req = {
                params: {
                    id: 1,
                },
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.obterIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Ingresso não encontrado' });
        });
    });

    describe('atualizarIngresso', () => {
        it('Deve retornar 200 quando o ingresso for atualizado com sucesso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            ingressoRepository.atualizarIngresso = jest.fn().mockResolvedValue(ingresso);

            const req = {
                params: {
                    id: 1,
                },
                body: ingresso,
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.atualizarIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(ingresso);
        });

        it('Deve retornar 500 quando ocorer algum erro ao atualizar o ingresso', async () => {
            ingressoRepository.atualizarIngresso = jest.fn().mockRejectedValue(new Error());

            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            const req = {
                params: {
                    id: 1,
                },
                body: ingresso,
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await ingressoController.atualizarIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Não foi possivel atualizar ingresso' });
        });

        it('Deve retornar 404 quando o ingresso não for encontrado', async () => {
            const req = {
                params: {
                    id: 1,
                },
                body: null,
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;
            ingressoRepository.atualizarIngresso = jest.fn().mockResolvedValue(null);

            await ingressoController.atualizarIngresso(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Ingresso não encontrado' });
        });
    });

    describe('excluirIngresso', () => {
        it('Deve retornar 200 quando o ingresso for excluído com sucesso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;
    
            ingressoRepository.excluirIngresso = jest.fn().mockResolvedValue(ingresso);
    
            const req = {
                params: {
                    id: 1,
                },
            } as unknown as Request;
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;
    
            await ingressoController.excluirIngresso(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Ingresso excluido com sucesso' });
        });
    
        it('Deve retornar 500 quando ocorrer algum erro ao excluir o ingresso', async () => {
            ingressoRepository.excluirIngresso = jest.fn().mockRejectedValue(new Error());
    
            const req = {
                params: {
                    id: 1,
                },
            } as unknown as Request;
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;
    
            await ingressoController.excluirIngresso(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Não foi possivel excluir ingresso' });
        });

        it('Deve retornar 404 quando o ingresso não for encontrado', async () => {
            ingressoRepository.excluirIngresso = jest.fn().mockResolvedValue(null);
    
            const req = {
                params: {
                    id: 1,
                },
            } as unknown as Request;
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;
    
            await ingressoController.excluirIngresso(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Ingresso não encontrado' });
        });
    });    
});
