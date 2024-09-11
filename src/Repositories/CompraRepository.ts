import { Compra } from "src/Models/Compra";

export interface CompraRepository {
    criarCompra(compra: Compra): Promise<Compra>;
    obterCompras(): Promise<Compra[]>;
    obterCompra(id: number): Promise<Compra | null>;
    atualizarCompra(compra: Compra): Promise<Compra | null >;
    excluirCompra(id: number): Promise<boolean>;
}