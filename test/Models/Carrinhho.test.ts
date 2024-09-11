import { Carrinho } from '../../src/Models/Carrinho';
import { CarrinhoRepository } from '../../src/Repositories/CarrinhoRepository';
import { CarrinhoRepo } from '../../src/Repositories/inMemory/CarrinhoRepo';

describe('CarrinhoRepository', () => {
    let carrinhoRepository: CarrinhoRepository;

    beforeEach(() => {
        carrinhoRepository = new CarrinhoRepo();
    });

    describe('criarCarrinho', () => {
        it('deve criar um carrinho', async () => {
            const carrinho = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
            } as Carrinho;

            const novoCarrinho = await carrinhoRepository.criarCarrinho(carrinho);

            expect(novoCarrinho).toEqual(carrinho);
        });
    });

    describe('obterCarrinhos', () => {
        it('deve retornar uma lista de carrinhos', async () => {
            const carrinho1 = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
            } as Carrinho;

            const carrinho2 = {
                id: 2,
                idIngressos: [1,2],
                idUsuario: 2,
            } as Carrinho;

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
                idIngressos: [1,2],
                idUsuario: 1,
            } as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);

            const carrinhoEncontrado = await carrinhoRepository.obterCarrinho(1);

            expect(carrinhoEncontrado).toEqual(carrinho);
        });

        it('deve retornar null se não encontrar o carrinho', async () => {
            const carrinhoEncontrado = await carrinhoRepository.obterCarrinho(1);

            expect(carrinhoEncontrado).toBeNull();
        });
    });
    
    describe('atualizarCarrinho', () => {
        it('deve atualizar um carrinho', async () => {
            const carrinho = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
            } as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);

            const carrinhoAtualizado = {
                id: 1,
                idIngressos: [1,2,3],
                idUsuario: 1,
            } as Carrinho;

            const carrinhoRetornado = await carrinhoRepository.atualizarCarrinho(carrinhoAtualizado);

            expect(carrinhoRetornado).toEqual(carrinhoAtualizado);
        });
    }
);
    
    describe('deletarCarrinho', () => {
        it('deve deletar um carrinho', async () => {
            const carrinho = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
            } as Carrinho;

            await carrinhoRepository.criarCarrinho(carrinho);

            const carrinhoDeletado = await carrinhoRepository.excluirCarrinho(1);

            expect(carrinhoDeletado).toBe(true);
        });
    }
);
});


        