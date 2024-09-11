import { Compra } from '../../src/Models/Compra';
import { CompraRepository } from '../../src/Repositories/CompraRepository';
import { CompraRepo } from '../../src/Repositories/inMemory/CompraRepo';

describe('CompraRepository', () => {
    let compraRepository: CompraRepository;

    beforeEach(() => {
        compraRepository = new CompraRepo();
    });

    describe('criarCompra', () => {
        it('deve criar uma compra', async () => {
            const compra = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
                dataCompra: new Date(),
            } as Compra;

            const novaCompra = await compraRepository.criarCompra(compra);

            expect(novaCompra).toEqual(compra);
        });
    });

    describe('obterCompras', () => {
        it('deve retornar uma lista de compras', async () => {
            const compra1 = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
                dataCompra: new Date(),
            } as Compra;

            const compra2 = {
                id: 2,
                idIngressos: [1,2],
                idUsuario: 2,
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra1);
            await compraRepository.criarCompra(compra2);

            const compras = await compraRepository.obterCompras();

            expect(compras).toEqual([compra1, compra2]);
        });
    });

    describe('obterCompra', () => {
        it('deve retornar uma compra', async () => {
            const compra = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra);

            const compraObtida = await compraRepository.obterCompra(1);

            expect(compraObtida).toEqual(compra);
        });
    });

    describe('atualizarCompra', () => {
        it('deve atualizar uma compra', async () => {
            const compra = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra);

            const compraAtualizada = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
                dataCompra: new Date(),
            }as Compra;

            const compraAtualizadaObtida = await compraRepository.atualizarCompra(compraAtualizada);

            expect(compraAtualizadaObtida).toEqual(compraAtualizada);
        });

        it('deve retornar erro ao atualizar uma compra inexistente', async () => {

            const compraAtualizada = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
                dataCompra: new Date(),
            } as Compra;

            const compraAtualizadaObtida = await compraRepository.atualizarCompra(compraAtualizada);

            expect(compraAtualizadaObtida).toBeNull();
        }
        );

    });

    describe('deletarCompra', () => {
        it('deve deletar uma compra', async () => {
            const compra = {
                id: 1,
                idIngressos: [1,2],
                idUsuario: 1,
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra);

            await compraRepository.excluirCompra(1);

            const compraObtida = await compraRepository.obterCompra(1);

            expect(compraObtida).toBeNull();
        });
    }
    );
});
