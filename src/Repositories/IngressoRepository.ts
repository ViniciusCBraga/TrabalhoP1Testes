import { Ingresso } from "src/Models/Ingresso";

export interface IngressoRepository {
    criarIngresso(ingresso: Ingresso): Promise<Ingresso>;
    obterIngressos(): Promise<Ingresso[]>;
    obterIngresso(id: number): Promise<Ingresso | null>;
    atualizarIngresso(ingresso: Ingresso): Promise<Ingresso | null >;
    excluirIngresso(id: number): Promise<boolean>;
}
