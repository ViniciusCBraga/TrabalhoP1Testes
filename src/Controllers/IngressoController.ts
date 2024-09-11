import { Request, Response } from "express";
import { Ingresso } from "src/Models/Ingresso";
import { IngressoRepository } from "src/Repositories/IngressoRepository";

export class IngressoController {
    constructor(private ingressoRepository: IngressoRepository) { }

    async criarIngresso(req: Request, res: Response) {
        try {
            const ingresso = req.body;
            const novoIngresso = await this.ingressoRepository.criarIngresso(ingresso);
            res.status(201).json(novoIngresso);
        } catch (error) {
            res.status(500).json({ error: 'Não foi possivel criar ingresso' });
        }
    }

    async obterIngressos(req: Request, res: Response) {
        try {
            const ingressos = await this.ingressoRepository.obterIngressos();
            res.status(200).json(ingressos);
        } catch (error) {
            res.status(500).json({ error: 'Não foi possivel obter ingressos' });
        }
    }

    async obterIngresso(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const ingresso = await this.ingressoRepository.obterIngresso(id);

            if (ingresso) {
                res.status(200).json(ingresso);
            } else {
                res.status(404).json({ error: 'Ingresso não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Não foi possivel obter ingresso' });
        }
    }

    async atualizarIngresso(req: Request, res: Response) {
        try {
            const ingressoId = parseInt(req.params.id); // Obtenha o ID do parâmetro da URL
            const ingressoExistente = await this.ingressoRepository.obterIngresso(ingressoId);

            if (!ingressoExistente) {
                return res.status(404).json({ error: 'Ingresso não encontrado' });
            }

            const ingressoAtualizado = req.body as Ingresso; // Obtenha o ingresso atualizado do corpo da solicitação
            ingressoAtualizado.id = ingressoId; // Garanta que o ID seja o mesmo

            const ingresso = await this.ingressoRepository.atualizarIngresso(ingressoAtualizado);

            if (!ingresso) {
                return res.status(500).json({ error: 'Não foi possível atualizar o ingresso' });
            }

            return res.status(200).json(ingresso);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async excluirIngresso(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const ingressoExcluido = await this.ingressoRepository.excluirIngresso(id);

            if (ingressoExcluido) {
                res.status(200).json({ message: 'Ingresso excluido com sucesso' });
            } else {
                res.status(404).json({ error: 'Ingresso não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Não foi possivel excluir ingresso' });
        }
    }
}
