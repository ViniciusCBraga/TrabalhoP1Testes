import { Request, Response } from "express";
import { CompraRepository } from "../Repositories/CompraRepository";
import { Compra } from "../Models/Compra";

export class CompraController {
    constructor(private compraRepository: CompraRepository) { }

    async criarCompra(req: Request, res: Response) {
        try {
            const compra = req.body as Compra;
            const novaCompra = await this.compraRepository.criarCompra(compra);
            if (novaCompra) {
                res.status(201).json(novaCompra);
            } else {
                res.status(400).json({ error: 'Compra nao encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel criar compra' });
        }
    }

    async obterCompras(req: Request, res: Response) {
        try {
            const compras = await this.compraRepository.obterCompras();
            res.status(200).json(compras);
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter compras' });
        }
    }

    async obterCompra(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const compra = await this.compraRepository.obterCompra(id);
                res.status(200).json(compra);
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter compra' });
        }
    }

    async atualizarCompra(req: Request, res: Response) {
        try {
            const compraId = parseInt(req.params.id); // Obtenha o ID do parâmetro da URL
            const compraExistente = await this.compraRepository.obterCompra(compraId);

            if (!compraExistente) {
                return res.status(404).json({ error: 'Compra não encontrada' });
            }

            const compraAtualizado = req.body as Compra; // Obtenha o compra atualizado do corpo da solicitação
            compraAtualizado.id = compraId; // Garanta que o ID seja o mesmo

            const compra = await this.compraRepository.atualizarCompra(compraAtualizado);

            if (!compra) {
                return res.status(500).json({ error: 'Não foi possível atualizar o compra' });
            }

            return res.status(200).json(compra);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async excluirCompra(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const compraExcluida = await this.compraRepository.excluirCompra(id);

            if (compraExcluida) {
                res.status(200).json({ message: 'Compra excluida com sucesso' });
            } else {
                res.status(404).json
                    ({ error: 'Compra nao encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel excluir compra' });
        }
    }
}
