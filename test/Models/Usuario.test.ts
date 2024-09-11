import { Usuario } from '../../src/Models/Usuario';
import { UsuarioRepository } from '../../src/Repositories/UsuarioRepository';
import { UsuarioRepo } from '../../src/Repositories/inMemory/UsuarioRepo';

describe('UsuarioRepo', () => {
    let usuarioRepo: UsuarioRepository;
    
    beforeEach(() => {
        usuarioRepo = new UsuarioRepo();
    });
    
    describe('criarUsuario', () => {
        test('deve criar um novo usuario', async () => {
          const usuarioData: Usuario = { id: 1, nome: 'Usuario Teste criar', email: 'teste@gmail.com', senha: '123456' };
            const novoUsuario = await usuarioRepo.criarUsuario(usuarioData);
            expect(novoUsuario).toEqual(usuarioData);
        });
    });

    describe('obterUsuarios', () => {
        test('deve retornar uma lista vazia quando não há usuarios', async () => {
            const usuarios = await usuarioRepo.obterUsuarios();
            expect(usuarios).toEqual([]);
        });

        test('deve retornar todos os usuarios registrados', async () => {
            const usuario1: Usuario = { id: 1, nome: 'Usuario 1', email: 'teste2@gmail.com', senha: '123456' };
            const usuario2: Usuario = { id: 2, nome: 'Usuario 2', email: 'teste1@gmail.com', senha: '123456' };
            await usuarioRepo.criarUsuario(usuario1);
            await usuarioRepo.criarUsuario(usuario2);
            const usuarios = await usuarioRepo.obterUsuarios();
            expect(usuarios).toEqual([usuario1, usuario2]);
        });
    });

    describe('obterUsuarioPorId', () => {
        test('deve retornar null para um ID inexistente', async () => {
            const usuario = await usuarioRepo.obterUsuario(1234);
            expect(usuario).toBeNull();
        });

        test('deve retornar o usuario correto para um ID existente', async () => {
            const usuario: Usuario = { id: 1, nome: 'Usuario Teste att', email: 'teste1@gmail.com', senha: '123456' };
            await usuarioRepo.criarUsuario(usuario);
            const usuarioEncontrado = await usuarioRepo.obterUsuario(1);
            expect(usuarioEncontrado).toEqual(usuario);
        });
    });

    describe('atualizarUsuario', () => {
        test('deve retornar null para um ID inexistente', async () => {
            const usuario: Usuario = { id: 1, nome: 'Usuario Teste att', email: 'teste@gmail.com', senha: '123456' };
            const usuarioAtualizado = await usuarioRepo.atualizarUsuario(usuario);
            expect(usuarioAtualizado).toBeNull();
        });

        test('deve atualizar o usuario correto para um ID existente', async () => {
            const usuario: Usuario = { id: 1, nome: 'Usuario Teste att', email: 'teste@gmail.com', senha: '123456' };
            await usuarioRepo.criarUsuario(usuario);

            const usuarioAtualizado: Usuario = { id: 1, nome: 'Usuario Teste att', email: 'teste@gmail.com', senha: '123456' };
            const usuarioEncontrado = await usuarioRepo.atualizarUsuario(usuarioAtualizado);
            expect(usuarioEncontrado).toEqual(usuarioAtualizado);
        });
    });

    describe('excluirUsuario', () => {
        test('deve retornar false para um ID inexistente', async () => {
            const excluido = await usuarioRepo.excluirUsuario(1234);
            expect(excluido).toBe(false);
        });

        test('deve retornar true para um ID existente', async () => {
            const usuario: Usuario = { id: 1, nome: 'Usuario Teste att', email: 'teste@gmail.com', senha: '123456' };
            await usuarioRepo.criarUsuario(usuario);
            const excluido = await usuarioRepo.excluirUsuario(1);
            expect(excluido).toBe(true);
        });
    });
});

