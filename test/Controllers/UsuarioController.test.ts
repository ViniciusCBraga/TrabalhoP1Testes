import { Usuario } from "../../src/Models/Usuario";
import { UsuarioRepository } from "../../src/Repositories/UsuarioRepository";
import { UsuarioController } from "../../src/Controllers/UsuarioController";
import { Request, Response } from 'express';

describe('UsuarioController', () => {
    let usuarioController: UsuarioController;
    let usuarioRepository: UsuarioRepository;

    beforeEach(() => {
        const usuarioRepositoryMock = {
            criarUsuario: jest.fn(),
            obterUsuarios: jest.fn(),
            obterUsuario: jest.fn(),
            atualizarUsuario: jest.fn(),
            excluirUsuario: jest.fn(),
        };
        usuarioRepository = usuarioRepositoryMock as any;
        usuarioController = new UsuarioController(usuarioRepository);
    });

    describe('criarUsuario', () => {

        it('deve retornar 201 quando o usuario for criado', async () => {
            const usuario = {
                id: 1,
                nome: 'Usuario 1',
                email: 'test@gmail.com',
                senha: '123456',

            } as Usuario;

            usuarioRepository.criarUsuario = jest.fn().mockResolvedValue(usuario);

            const req = {
                body: usuario
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as any;

            await usuarioController.criarUsuario(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith(usuario);
        });

        it('deve retornar 500 quando ocorrer algum erro', async () => {
            const usuario = {
                id: 1,
                nome: 'Usuario 1',
                email: 'teste@gmail.com',
                senha: '123456',
            } as Usuario;

            usuarioRepository.criarUsuario = jest.fn().mockRejectedValue(new Error());

            const req = {
                body: usuario
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as any;

            await usuarioController.criarUsuario(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Não foi possivel criar usuario' });
        });
    });

describe('obterUsuarios', () => {
    it('deve retornar 200 quando obter usuarios', async () => {
        const usuarios = [
            {
                id: 1,
                nome: 'Usuario 1',
                email: 'teste1@gmai.com',
                senha: '123456',
            },
            {
                id: 2,
                nome: 'Usuario 2',
                email: 'teste2@gmail.com',
                senha: '123456',
            },
        ] as Usuario[];

        usuarioRepository.obterUsuarios = jest.fn().mockResolvedValue(usuarios);

        const req = {} as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;   

        await usuarioController.obterUsuarios(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(usuarios);
    });

    it('deve retornar 500 quando ocorrer algum erro', async () => {
        usuarioRepository.obterUsuarios = jest.fn().mockRejectedValue(new Error());

        const req = {} as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await usuarioController.obterUsuarios(req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({ error: 'Não foi possivel obter usuarios' });
    }
    );
});

describe('obterUsuario', () => {
    it('deve retornar 200 quando obter usuario', async () => {
        const usuario = {
            id: 1,
            nome: 'Usuario 1',
            email: 'teste1@gmail.com',
            senha: '123456',
        } as Usuario;

        usuarioRepository.obterUsuario = jest.fn().mockResolvedValue(usuario);

        const req = {
            params: {
                id: 1
            }
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await usuarioController.obterUsuario(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(usuario);
    });

    it('deve retornar 404 quando usuario não for encontrado', async () => {

        usuarioRepository.obterUsuario = jest.fn().mockResolvedValue(null);

        const req = {
            params: {
                id: 1
            }
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await usuarioController.obterUsuario(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({ error: 'Usuario não encontrado' });
    }
    );

    it('deve retornar 500 quando ocorrer algum erro', async () => {
        usuarioRepository.obterUsuario = jest.fn().mockRejectedValue(new Error());

        const req = {
            params: {
                id: 1
            }
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await usuarioController.obterUsuario(req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({ error: 'Não foi possivel obter usuario' });
    }
    );
});

describe('atualizarUsuario', () => {
    it('deve retornar 200 quando atualizar usuario', async () => {
        const usuario = {
            id: 1,
            nome: 'Usuario 1',
            email: 'teste@gmai.com',
            senha: '123456',
        } as Usuario;

        // Mock para simular que o usuário já existe
        usuarioRepository.obterUsuario = jest.fn().mockResolvedValue(usuario);

        // Mock para simular a atualização do usuário
        usuarioRepository.atualizarUsuario = jest.fn().mockResolvedValue(usuario);

        const req = {
            params: {
                id: 1
            },
            body: usuario
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await usuarioController.atualizarUsuario(req, res);

        // Verificar se o status retornado é 200 e o usuário foi atualizado
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(usuario);
    });


    it('deve retornar 404 quando usuario não for encontrado', async () => {
        const usuario = {
            id: 1,
            nome: 'Usuario 1',
            email: 'teste@gmail.com',
            senha: '123456',
        } as Usuario;

        usuarioRepository.atualizarUsuario = jest.fn().mockResolvedValue(null);

        const req = {
            params: {
                id: 1
            },
            body: usuario
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await usuarioController.atualizarUsuario(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({ error: 'Usuario não encontrado' });
    });

    it('deve retornar 500 quando ocorrer algum erro', async () => {
        const usuario = {
            id: 1,
            nome: 'Usuario 1',
            email: 'teste@gmail.com',
            senha: '123456',
        } as Usuario;

        usuarioRepository.atualizarUsuario = jest.fn().mockRejectedValue(new Error());

        const req = {
            params: {
                id: 1
            },
            body: usuario
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await usuarioController.atualizarUsuario(req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({ error: 'Não foi possivel atualizar usuario' });

    });

    describe('removerUsuario', () => {

        it('deve retornar 200 quando remover usuario', async () => {
            const usuario = {
                id: 1,
                nome: 'Usuario 1',
                email: 'teste@gmail.com',
                senha: '123456',

            } as Usuario;

            usuarioRepository.excluirUsuario = jest.fn().mockResolvedValue(usuario);

            const req = {
                params: {
                    id: 1
                }
            } as any;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as any;

            await usuarioController.excluirUsuario(req, res);

            expect(res.status).toBeCalledWith(200);

        });

        it('deve retornar 404 quando usuario não for encontrado', async () => {
            const usuario = {
                id: 1,
                nome: 'Usuario 1',
                email: 'teste@gmail.com',
                senha: '123456',

            } as Usuario;

            usuarioRepository.excluirUsuario = jest.fn().mockResolvedValue(null);

            const req = {

                params: {
                    id: 1
                }
            } as any;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as any;

            await usuarioController.excluirUsuario(req, res);

            expect(res.status).toBeCalledWith(404);

        });

        it('deve retornar 500 quando ocorrer algum erro', async () => {

            usuarioRepository.excluirUsuario = jest.fn().mockRejectedValue(new Error());

            const req = {

                params: {
                    id: 1
                }
            } as any;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as any;

            await usuarioController.excluirUsuario(req, res);

            expect(res.status).toBeCalledWith(500);

        }
        );

    });


});
});
