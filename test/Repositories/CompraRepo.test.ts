import { CompraRepo } from "../../src/Repositories/inMemory/CompraRepo";
import { Compra } from "../../src/Models/Compra";

describe('CompraRepository', () => {
    let compraRepository: CompraRepo;

    beforeEach(() => {
        compraRepository = new CompraRepo();
    });

    describe('criarCompra', () => {
        it('deve criar uma compra', async () => {
            const compra = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
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
                idUsuario: 1,
                idIngressos: [1],
                dataCompra: new Date(),
            }  as Compra;

            const compra2 = {
                id: 2,
                idUsuario: 2,
                idIngressos: [2],
                dataCompra: new Date(),
            }  as Compra;

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
                idUsuario: 1,
                idIngressos: [1],
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
                idUsuario: 1,
                idIngressos: [1],
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra);

            const compraAtualizada = {
                id: 1,
                idUsuario: 2,
                idIngressos: [2],
                dataCompra: new Date(),
            } as Compra;

            const compraObtida = await compraRepository.atualizarCompra(compraAtualizada);

            expect(compraObtida).toEqual(compraAtualizada);
        });

        it('deve retornar null se a compra não existir', async () => {
            const compra = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
                dataCompra: new Date(),
            } as Compra;

            const compraAtualizada = {
                id: 2,
                idUsuario: 2,
                idIngressos: [2],
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra);

            const compraObtida = await compraRepository.atualizarCompra(compraAtualizada);

            expect(compraObtida).toBeNull();
        });
    }
    );

    describe('deletarCompra', () => {
        it('deve deletar uma compra', async () => {
            const compra = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra);

            await compraRepository.excluirCompra(1);

            const compraObtida = await compraRepository.obterCompra(1);

            expect(compraObtida).toBeNull();
        });

        it('deve retornar null se a compra não existir', async () => {
            const compra = {
                id: 1,
                idUsuario: 1,
                idIngressos: [1],
                dataCompra: new Date(),
            } as Compra;

            await compraRepository.criarCompra(compra);

            await compraRepository.excluirCompra(2);

            const compraObtida = await compraRepository.obterCompra(1);

            expect(compraObtida).toEqual(compra);
        });
    }

    );
});
