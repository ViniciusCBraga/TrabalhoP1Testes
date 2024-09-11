import { UsuarioRepo } from "../../src/Repositories/inMemory/UsuarioRepo";
import { Usuario } from "../../src/Models/Usuario";

describe('UsuarioRepository', () => {
    let usuarioRepository: UsuarioRepo;

    beforeEach(() => {
        usuarioRepository = new UsuarioRepo();
    });

    describe('criarUsuario', () => {
        it('deve criar um usuario', async () => {
            const usuario = {
                id: 1,
                nome: "teste",
                email: "teste@gmail.com",
                senha: "123456"
            } as Usuario;

            const novoUsuario = await usuarioRepository.criarUsuario(usuario);

            expect(novoUsuario).toEqual(usuario);
        });
    });

    describe('obterUsuarios', () => {
        it('deve retornar uma lista vazia quando não há usuarios', async () => {
            const usuarios = await usuarioRepository.obterUsuarios();

            expect(usuarios).toEqual([]);
        });

        it('deve retornar todos os usuarios registrados', async () => {
            const usuario1 = {
                id: 1,
                nome: "teste",
                email: "teste@gmail.com",
                senha: "123456"
            } as Usuario;

            const usuario2 = {
                id: 2,
                nome: "teste",
                email: "teste2@gmail.com",
                senha: "123456"
            } as Usuario;

            await usuarioRepository.criarUsuario(usuario1);

            await usuarioRepository.criarUsuario(usuario2);

            const usuarios = await usuarioRepository.obterUsuarios();

            expect(usuarios).toEqual([usuario1, usuario2]);
        });

    });

    describe('obterUsuarioPorId', () => {
        it('deve retornar null para um ID inexistente', async () => {
            const usuario = await usuarioRepository.obterUsuario(1234);

            expect(usuario).toBeNull();
        });

        it('deve retornar o usuario correto para um ID existente', async () => {
            const usuario = {
                id: 1,
                nome: "teste",
                email: "teste@teste.com",
                senha: "123456"
            } as Usuario;

            await usuarioRepository.criarUsuario(usuario);

            const usuarioEncontrado = await usuarioRepository.obterUsuario(1);
            
            expect(usuarioEncontrado).toEqual(usuario);

        });

    });

    describe('atualizarUsuario', () => {
        it('deve retornar null para um ID inexistente', async () => {
            const usuario = {
                id: 1,
                nome: "teste",
                email: "teste@gmail.com",
                senha: "123456"
            } as Usuario;

            const usuarioAtualizado = await usuarioRepository.atualizarUsuario(usuario);

            expect(usuarioAtualizado).toBeNull();

        });

        it('deve atualizar o usuario correto para um ID existente', async () => {
            const usuario = {
                id: 1,
                nome: "teste",
                email: "teste@gmail.com",
                senha: "123456"
            } as Usuario;

            await usuarioRepository.criarUsuario(usuario);

            usuario.nome = "teste2";

            const usuarioAtualizado = await usuarioRepository.atualizarUsuario(usuario);

            expect(usuarioAtualizado).toEqual(usuario);

        });

    });

    describe('excluirUsuario', () => {
        it('deve retornar null para um ID inexistente', async () => {
            const usuario = await usuarioRepository.excluirUsuario(1234);

            expect(usuario).toBe(false);

        });

        it('deve excluir o usuario correto para um ID existente', async () => {
            const usuario = {
                id: 1,
                nome: "teste",
                email: "teste@gmail.com",
                senha: "123456"
            } as Usuario;

            await usuarioRepository.criarUsuario(usuario);

            const usuarioExcluido = await usuarioRepository.excluirUsuario(1);

            expect(usuarioExcluido).toBe(true);

        });

    });

});

