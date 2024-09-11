import { Compra } from "src/Models/Compra";
import { CompraRepository } from "../CompraRepository";

export class CompraRepo implements CompraRepository{
    private compras: Compra[] = [];
    private id: number = 0;

    async criarCompra(compra: Compra): Promise<Compra> {    
        compra.id = ++this.id;
        this.compras.push(compra);
        return compra;
    }

    async obterCompras(): Promise<Compra[]> {
        return this.compras;
    }

    async obterCompra(id: number): Promise<Compra | null> {
        const compra = this.compras.find(compra => compra.id === id);
        return compra || null;
    }

    async atualizarCompra(compra: Compra): Promise<Compra | null> {
        const index = this.compras.findIndex(e => e.id === compra.id);
        if (index === -1) {
          return null; 
        }
        this.compras[index] = compra;
        return compra;
      }
      

    async excluirCompra(id: number): Promise<boolean> {
        const index = this.compras.findIndex(compra => compra.id === id);
        if (index === -1) {
            return false;
        } 
        this.compras.splice(index, 1);
        return true;
    }

}