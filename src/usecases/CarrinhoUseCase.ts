import { Carrinho } from "src/Models/Carrinho";
import { CarrinhoRepository } from "src/Repositories/CarrinhoRepository";

export class CarrinhoUsecase {
    constructor(private carrinhoRepository: CarrinhoRepository) {}

    async criarCarrinho(carrinho: Carrinho): Promise<Carrinho> {
        return this.carrinhoRepository.criarCarrinho(carrinho);
    }

    async obterCarrinhos(): Promise<Carrinho[]> {
        return this.carrinhoRepository.obterCarrinhos();
    }

    async obterCarrinho(id: number): Promise<Carrinho | null> {
        return this.carrinhoRepository.obterCarrinho(id);
    }

    async atualizarCarrinho(carrinho: Carrinho): Promise<Carrinho | null> {
        return this.carrinhoRepository.atualizarCarrinho(carrinho);
    }

    async excluirCarrinho(id: number): Promise<boolean> {
        return this.carrinhoRepository.excluirCarrinho(id);
    }

}