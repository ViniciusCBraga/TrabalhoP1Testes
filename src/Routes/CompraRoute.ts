import express, { Router } from 'express';
import { CompraController } from '../Controllers/CompraController';
import { CompraRepo } from '../Repositories/inMemory/CompraRepo';
import { CompraUseCase } from '../usecases/CompraUseCase';

const compraRoutes = Router();
const compraRepository = new CompraRepo();
const compraUseCase = new CompraUseCase(compraRepository);
const compraController = new CompraController(compraUseCase);
const compraPath = '/compra';

compraRoutes.post(compraPath, (req, res) => compraController.criarCompra(req, res));
compraRoutes.get(compraPath, (req, res) => compraController.obterCompras(req, res));
compraRoutes.get(`${compraPath}/:id`, (req, res) => compraController.obterCompra(req, res));
compraRoutes.put(`${compraPath}/:id`, (req, res) => compraController.atualizarCompra(req, res));
compraRoutes.delete(`${compraPath}/:id`, (req, res) => compraController.excluirCompra(req, res));

export default compraRoutes;


