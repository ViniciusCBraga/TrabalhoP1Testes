import { Usuario } from "../../Models/Usuario";
import { UsuarioRepository } from "../UsuarioRepository";

export class UsuarioRepo implements UsuarioRepository{
    private usuarios: Usuario[] = [];
    private id: number = 0;

    async criarUsuario(usuario: Usuario): Promise<Usuario> {
        usuario.id = ++this.id;
        this.usuarios.push(usuario);
        return usuario;
    }

    async obterUsuarios(): Promise<Usuario[]> {
        return this.usuarios;
    }

    async obterUsuario(id: number): Promise<Usuario | null> {
        const usuario = this.usuarios.find(usuario => usuario.id === id);
        return usuario || null;
    }

    async atualizarUsuario(usuario: Usuario): Promise<Usuario | null> {
        const index = this.usuarios.findIndex(e => e.id === usuario.id);
        if (index === -1) {
          return null; // Retornar null quando o usuario não existe
        }
        this.usuarios[index] = usuario;
        return usuario;
      }
      

    async excluirUsuario(id: number): Promise<boolean> {
        const index = this.usuarios.findIndex(usuario => usuario.id === id);
        if (index === -1) {
            return false;
        } 
        this.usuarios.splice(index, 1);
        return true;
    }
 }