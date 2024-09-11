import { Compra } from "src/Models/Compra";
import { CompraRepository } from "src/Repositories/CompraRepository";

export class CompraUseCase {
    constructor(private compraRepository: CompraRepository) { }

    async criarCompra(compra: Compra): Promise<Compra> {
        return this.compraRepository.criarCompra(compra);
    }

    async obterCompras(): Promise<Compra[]> {
        return this.compraRepository.obterCompras();
    }

    async obterCompra(id: number): Promise<Compra | null> {
        return this.compraRepository.obterCompra(id);
    }

    async atualizarCompra(compra: Compra): Promise<Compra | null> {
        return this.compraRepository.atualizarCompra(compra);
    }

    async excluirCompra(id: number): Promise<boolean> {
        return this.compraRepository.excluirCompra(id);
    }

}