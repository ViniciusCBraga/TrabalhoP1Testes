import { CarrinhoRepo } from "../../src/Repositories/inMemory/CarrinhoRepo";
import { Carrinho } from "../../src/Models/Carrinho";

describe('CarrinhoRepository', () => {
    let carrinhoRepository: CarrinhoRepo;

    beforeEach(() => {
        carrinhoRepository = new CarrinhoRepo();
    });

    describe('criarCarrinho', () => {
        it('deve criar um carrinho', async () => {
            const carrinho = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
            } as Carrinho;

            const novoCarrinho = await carrinhoRepository.criarCarrinho(carrinho);

            expect(novoCarrinho).toEqual(carrinho);
        });
    });

    describe('obterCarrinhos', () => {
        it('deve retornar uma lista de carrinhos', async () => {
            const carrinho1 = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
            }as Carrinho;

            const carrinho2 = {
                id: 2,
                idUsuario: 2,
                idIngressos: [1],
            }as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho1);
            await carrinhoRepository.criarCarrinho(carrinho2);

            const carrinhos = await carrinhoRepository.obterCarrinhos();

            expect(carrinhos).toEqual([carrinho1, carrinho2]);
        });
    });

    describe('obterCarrinho', () => {
        it('deve retornar um carrinho', async () => {
            const carrinho = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
            } as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);

            const carrinhoObtido = await carrinhoRepository.obterCarrinho(1);

            expect(carrinhoObtido).toEqual(carrinho);
        });
    });

    describe('atualizarCarrinho', () => {
        it('deve atualizar um carrinho', async () => {
            const carrinho = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
            } as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);
            
            const carrinhoAtualizado = {
                id: 1,
                idUsuario: 2,
                idIngressos: [2],
            }as Carrinho;

            await carrinhoRepository.atualizarCarrinho(carrinhoAtualizado);

            const carrinhoObtido = await carrinhoRepository.obterCarrinho(1);

            expect(carrinhoObtido).toEqual(carrinhoAtualizado);

        });

        it('deve retornar null quando não encontrar o carrinho', async () => {
            const carrinho = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
            } as Carrinho;

            const carrinhoAtualizado = {
                id: 2,
                idUsuario: 2,
                idIngressos: [2],
            }as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);

            const carrinhoObtido = await carrinhoRepository.atualizarCarrinho(carrinhoAtualizado);

            expect(carrinhoObtido).toBeNull();
        });
    });

    describe('deletarCarrinho', () => {
        it('deve deletar um carrinho', async () => {
            const carrinho = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
            } as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);

            await carrinhoRepository.excluirCarrinho(1);

            const carrinhoObtido = await carrinhoRepository.obterCarrinho(1);

            expect(carrinhoObtido).toBeNull();
        });

        it('deve retornar false quando não encontrar o carrinho', async () => {
            const carrinho = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
            } as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);

            const carrinhoExcluido = await carrinhoRepository.excluirCarrinho(2);

            expect(carrinhoExcluido).toBeFalsy();
        });}
    );

});

