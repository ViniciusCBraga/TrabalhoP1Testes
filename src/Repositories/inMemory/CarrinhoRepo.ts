import { Carrinho } from "../../Models/Carrinho";
import { CarrinhoRepository } from "../CarrinhoRepository";

export class CarrinhoRepo implements CarrinhoRepository {
    private carrinhos: Array<Carrinho> = new Array<Carrinho>();
    private id: number = 0;

    async criarCarrinho(carrinho: Carrinho): Promise<Carrinho> {
        carrinho.id = ++this.id;
        this.carrinhos.push(carrinho);
        return carrinho;
    }

    async obterCarrinhos(): Promise<Carrinho[]> {
        return this.carrinhos;
    }

    async obterCarrinho(id: number): Promise<Carrinho | null> {
        const carrinho = this.carrinhos.find(c => c.id === id);
        return carrinho || null;
    }

    async atualizarCarrinho(carrinho: Carrinho): Promise<Carrinho | null> {
        const index = this.carrinhos.findIndex(c => c.id === carrinho.id);
        if (index === -1) {
            return null;
        }
        this.carrinhos[index] = carrinho;
        return carrinho;
    }

    async excluirCarrinho(id: number): Promise<boolean> {
        const index = this.carrinhos.findIndex(c => c.id === id);
        if (index === -1) {
            return false;
        }
        this.carrinhos.splice(index, 1);
        return true;
    }
}