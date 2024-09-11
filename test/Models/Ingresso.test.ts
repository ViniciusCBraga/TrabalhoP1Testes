import { Ingresso } from '../../src/Models/Ingresso';
import { IngressoRepository } from '../../src/Repositories/IngressoRepository';
import { IngressoRepo } from '../../src/Repositories/inMemory/IngressoRepo';

describe('IngressoRepository', () => {
    let ingressoRepository: IngressoRepository;

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

        it('deve retornar null quando o ingresso nao existe', async () => {
            const ingressoObtido = await ingressoRepository.obterIngresso(1);

            expect(ingressoObtido).toBeNull();
        }
        );
    });

    describe('atualizarIngresso', () => {
        it('deve atualizar um ingresso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as Ingresso;

            await ingressoRepository.criarIngresso(ingresso);

            ingresso.preco = 300;

            const ingressoAtualizado = await ingressoRepository.atualizarIngresso(ingresso);

            expect(ingressoAtualizado).toEqual(ingresso);
        });
    }
    );

    describe('excluirIngresso', () => {
        it('deve excluir um ingresso', async () => {
            const ingresso = {
                id: 1,
                idEvento: 1,
                preco: 100,
            } as unknown as Ingresso;

            await ingressoRepository.criarIngresso(ingresso);

            await ingressoRepository.excluirIngresso(1);

            const ingressoObtido = await ingressoRepository.obterIngresso(1);

            expect(ingressoObtido).toBeNull();
        });
    }
    );
});