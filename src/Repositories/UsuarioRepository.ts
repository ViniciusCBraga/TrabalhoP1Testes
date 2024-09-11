import { Usuario } from "src/Models/Usuario";

export interface UsuarioRepository {
    criarUsuario(usuario: Usuario): Promise<Usuario>;
    obterUsuarios(): Promise<Usuario[]>;
    obterUsuario(id: number): Promise<Usuario | null>;
    atualizarUsuario(usuario: Usuario): Promise<Usuario | null >;
    excluirUsuario(id: number): Promise<boolean>;
}