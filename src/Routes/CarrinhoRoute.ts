import express, { Router } from 'express';
import { CarrinhoController } from '../Controllers/CarrinhoController';
import { CarrinhoRepo } from '../Repositories/inMemory/CarrinhoRepo';
import { CarrinhoUsecase } from '../usecases/CarrinhoUseCase';

const carrinhoRoutes = Router();
const carrinhoRepository = new CarrinhoRepo();
const carrinhoController = new CarrinhoController(carrinhoRepository);
const carrinhoPath = '/carrinho';

carrinhoRoutes.post(carrinhoPath, (req, res) => carrinhoController.criarCarrinho(req, res));
carrinhoRoutes.get(carrinhoPath, (req, res) => carrinhoController.obterCarrinhos(req, res));
carrinhoRoutes.get(`${carrinhoPath}/:id`, (req, res) => carrinhoController.obterCarrinho(req, res));
carrinhoRoutes.put(`${carrinhoPath}/:id`, (req, res) => carrinhoController.atualizarCarrinho(req, res));
carrinhoRoutes.delete(`${carrinhoPath}/:id`, (req, res) => carrinhoController.excluirCarrinho(req, res));

export default carrinhoRoutes;


