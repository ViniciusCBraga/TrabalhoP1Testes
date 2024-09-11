import { Usuario } from "src/Models/Usuario";
import { UsuarioRepository } from "src/Repositories/UsuarioRepository";

export class UsuarioUseCase {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async criarUsuario(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.criarUsuario(usuario);
    }

    async obterUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepository.obterUsuarios();
    }

    async obterUsuario(id: number): Promise<Usuario | null> {
        return this.usuarioRepository.obterUsuario(id);
    }

    async atualizarUsuario(usuario: Usuario): Promise<Usuario | null> {
        return this.usuarioRepository.atualizarUsuario(usuario);
    }

    async excluirUsuario(id: number): Promise<boolean> {
        return this.usuarioRepository.excluirUsuario(id);
    }

}