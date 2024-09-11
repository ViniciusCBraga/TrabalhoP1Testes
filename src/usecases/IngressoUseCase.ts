import { Ingresso } from "src/Models/Ingresso";
import { IngressoRepository } from "src/Repositories/IngressoRepository";

export class IngressoUseCase {
    constructor(private ingressoRepository: IngressoRepository) {}

    async criarIngresso(ingresso: Ingresso): Promise<Ingresso> {
        return this.ingressoRepository.criarIngresso(ingresso);
    }

    async obterIngressos(): Promise<Ingresso[]> {
        return this.ingressoRepository.obterIngressos();
    }

    async obterIngresso(id: number): Promise<Ingresso | null> {
        return this.ingressoRepository.obterIngresso(id);
    }

    async atualizarIngresso(ingresso: Ingresso): Promise<Ingresso | null> {
        return this.ingressoRepository.atualizarIngresso(ingresso);
    }

    async excluirIngresso(id: number): Promise<boolean> {
        return this.ingressoRepository.excluirIngresso(id);
    }

}