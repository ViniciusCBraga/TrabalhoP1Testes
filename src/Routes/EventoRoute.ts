import express, { Router } from 'express';
import { EventoController } from '../Controllers/EventoController';
import { EventoRepo } from '../Repositories/inMemory/EventoRepo';
import { EventosUseCase } from '../usecases/EventosUseCase';

const eventoRoutes = Router();
const eventoRepository = new EventoRepo();
const eventoUseCase = new EventosUseCase(eventoRepository);
const eventoController = new EventoController(eventoUseCase);
const eventoPath = '/evento';

eventoRoutes.post(eventoPath, (req, res) => eventoController.criarEvento(req, res));
eventoRoutes.get(eventoPath, (req, res) => eventoController.obterEventos(req, res));
eventoRoutes.get(`${eventoPath}/:id`, (req, res) => eventoController.obterEvento(req, res));
eventoRoutes.put(`${eventoPath}/:id`, (req, res) => eventoController.atualizarEvento(req, res));
eventoRoutes.delete(`${eventoPath}/:id`, (req, res) => eventoController.excluirEvento(req, res));

export default eventoRoutes;


