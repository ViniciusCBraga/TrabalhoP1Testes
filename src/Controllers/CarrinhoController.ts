import { Request, Response } from "express";
import { CarrinhoRepository } from "../Repositories/CarrinhoRepository";
import { Carrinho } from "../Models/Carrinho";

export class CarrinhoController {
    constructor(private carrinhoRepository: CarrinhoRepository) { }

    async criarCarrinho(req: Request, res: Response) {
        try {
            const carrinho = req.body;
            const novoCarrinho = await this.carrinhoRepository.criarCarrinho(carrinho);
                res.status(201).json(novoCarrinho);
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel criar carrinho' });
        }
    }

    async obterCarrinhos(req: Request, res: Response) {
        try {
            const carrinhos = await this.carrinhoRepository.obterCarrinhos();
                res.status(200).json(carrinhos);

        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter carrinhos' });
        }
    }

    async obterCarrinho(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const carrinho = await this.carrinhoRepository.obterCarrinho(id);

            if (carrinho) {
                res.status(200).json(carrinho);
            } else {
                res.status(404).json({ error: 'Carrinho nao encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter carrinho' });
        }
    }

    async atualizarCarrinho(req: Request, res: Response) {
        try {
            const carrinhoId = parseInt(req.params.id); // Obtenha o ID do parâmetro da URL
            const carrinhoExistente = await this.carrinhoRepository.obterCarrinho(carrinhoId);

            if (!carrinhoExistente) {
                return res.status(404).json({ error: 'Carrinho não encontrado' });
            }

            const carrinhoAtualizado = req.body as Carrinho; // Obtenha o carrinho atualizado do corpo da solicitação
            carrinhoAtualizado.id = carrinhoId; // Garanta que o ID seja o mesmo

            const carrinho = await this.carrinhoRepository.atualizarCarrinho(carrinhoAtualizado);

            if (!carrinho) {
                return res.status(500).json({ error: 'Não foi possível atualizar o carrinho' });
            }

            return res.status(200).json(carrinho);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async excluirCarrinho(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const carrinhoExcluido = await
                this.carrinhoRepository.excluirCarrinho(id);

            if (carrinhoExcluido) {
                res.status(200).json({ message: 'Carrinho excluido com sucesso' });
            }
            else {
                res.status(404).json({ error: 'Carrinho nao encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel excluir carrinho' });
        }
    }
}
