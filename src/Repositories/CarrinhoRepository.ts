import { Carrinho } from "src/Models/Carrinho";

export interface CarrinhoRepository  {
    criarCarrinho(carrinho: Carrinho): Promise<Carrinho>;
    obterCarrinhos(): Promise<Carrinho[]>;
    obterCarrinho(id: number): Promise<Carrinho | null>;
    atualizarCarrinho(carrinho: Carrinho): Promise<Carrinho | null >;
    excluirCarrinho(id: number): Promise<boolean>;
}
