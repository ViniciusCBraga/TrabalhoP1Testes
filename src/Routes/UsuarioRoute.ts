import express, { Router } from 'express';
import { UsuarioController } from '../Controllers/UsuarioController';
import { UsuarioRepo } from '../Repositories/inMemory/UsuarioRepo';
import { UsuarioUseCase } from '../usecases/UsuarioUseCase';

const usuarioRoutes = Router();
const usuarioRepository = new UsuarioRepo();
const usuarioUseCase = new UsuarioUseCase(usuarioRepository);
const usuarioController = new UsuarioController(usuarioUseCase);
const usuarioPath = '/usuario';

usuarioRoutes.post(usuarioPath, (req, res) => usuarioController.criarUsuario(req, res));
usuarioRoutes.get(usuarioPath, (req, res) => usuarioController.obterUsuarios(req, res));
usuarioRoutes.get(`${usuarioPath}/:id`, (req, res) => usuarioController.obterUsuario(req, res));
usuarioRoutes.put(`${usuarioPath}/:id`, (req, res) => usuarioController.atualizarUsuario(req, res));
usuarioRoutes.delete(`${usuarioPath}/:id`, (req, res) => usuarioController.excluirUsuario(req, res));

export default usuarioRoutes;


