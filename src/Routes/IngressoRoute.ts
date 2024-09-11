import express, { Router } from 'express';
import { IngressoController } from '../Controllers/IngressoController';
import { IngressoRepo } from '../Repositories/inMemory/IngressoRepo';
import { IngressoUseCase } from '../usecases/IngressoUseCase';

const ingressoRoutes = Router();
const ingressoRepository = new IngressoRepo();
const ingressoUseCase = new IngressoUseCase(ingressoRepository);
const ingressoController = new IngressoController(ingressoUseCase);
const ingressoPath = '/ingresso';

ingressoRoutes.post(ingressoPath, (req, res) => ingressoController.criarIngresso(req, res));
ingressoRoutes.get(ingressoPath, (req, res) => ingressoController.obterIngressos(req, res));
ingressoRoutes.get(`${ingressoPath}/:id`, (req, res) => ingressoController.obterIngresso(req, res));
ingressoRoutes.put(`${ingressoPath}/:id`, (req, res) => ingressoController.atualizarIngresso(req, res));
ingressoRoutes.delete(`${ingressoPath}/:id`, (req, res) => ingressoController.excluirIngresso(req, res));

export default ingressoRoutes;


