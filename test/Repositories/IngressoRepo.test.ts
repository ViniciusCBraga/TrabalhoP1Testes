import { IngressoRepo } from "../../src/Repositories/inMemory/IngressoRepo";
import { Ingresso } from "../../src/Models/Ingresso";

describe('IngressoRepository', () => {
    let ingressoRepository: IngressoRepo;

    beforeEach(() => {
        ingressoRepository = new IngressoRepo();
    });

    describe('criarIngresso', () => {
        it('deve criar um ingresso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            const novoIngresso = await ingressoRepository.criarIngresso(ingresso);

            expect(novoIngresso).toEqual(ingresso);
        });
    });

    describe('obterIngressos', () => {
        it('deve retornar uma lista de ingressos', async () => {
            const ingresso1 = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            const ingresso2 = {
                id: 2,
                idEvento: 2,
                preco: 200,
            } as Ingresso;

            await ingressoRepository.criarIngresso(ingresso1);
            await ingressoRepository.criarIngresso(ingresso2);

            const ingressos = await ingressoRepository.obterIngressos();

            expect(ingressos).toEqual([ingresso1, ingresso2]);
        });
    });

    describe('obterIngresso', () => {
        it('deve retornar um ingresso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            await ingressoRepository.criarIngresso(ingresso);

            const ingressoObtido = await ingressoRepository.obterIngresso(1);

            expect(ingressoObtido).toEqual(ingresso);
        });
    });

    describe('atualizarIngresso', () => {
        it('deve atualizar um ingresso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            await ingressoRepository.criarIngresso(ingresso);

            ingresso.preco = 200;

            const ingressoAtualizado = await ingressoRepository.atualizarIngresso(ingresso);

            expect(ingressoAtualizado).toEqual(ingresso);
        });

        it('deve retornar null se o ingresso não existir', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            const ingressoAtualizado = await ingressoRepository.atualizarIngresso(ingresso);

            expect(ingressoAtualizado).toBeNull();
        });
    }
    );

    describe('removerIngresso', () => {
        it('deve remover um ingresso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            await ingressoRepository.criarIngresso(ingresso);

            await ingressoRepository.excluirIngresso(1);

            const ingressoObtido = await ingressoRepository.obterIngresso(1);

            expect(ingressoObtido).toBeNull();
        });

        it('deve retornar false se o ingresso não existir', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            await ingressoRepository.criarIngresso(ingresso);

            const ingressoObtido = await ingressoRepository.excluirIngresso(2);

            expect(ingressoObtido).toBe(false)
        });
    }
    );
});
