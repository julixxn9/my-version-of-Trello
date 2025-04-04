import elementos from "./elementos.js";
import vista from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import { traerNota } from "./sistema_notas.js";

export function cancelarFoto(){
    elementos.imgPhoto.src = usuario.actual.foto;
    elementos.userNameHeader.textContent = usuario.actual.name.replaceAll("&#60", "<").replaceAll("&#62", ">");
    vista.actualizar_vista(3);
    setTimeout(()=>{
        traerNota(usuario.actual.correo);
    },500)
}

export function guardarFoto() {
    let extraerFoto = elementos.imgCambiaPerfil.src;

    const baseUsuarioExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = []

    if(!baseUsuarioExiste){
        alert("error al acceder a la base de datos");
        return;
    }

    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

    const indexUsuarioExistente = baseUsuarios.findIndex(usuarioBuscar => usuarioBuscar.correo == usuario.actual.correo);

    if(indexUsuarioExistente == -1){
        alert("Error al cambiar la foto de perfil");
        return;
    }

    usuario.actual.foto = extraerFoto;
    baseUsuarios[indexUsuarioExistente].foto = extraerFoto;

    elementos.imgPhoto.src = extraerFoto;
    elementos.userNameHeader.textContent = usuario.actual.name.replaceAll("&#60", "<").replaceAll("&#62", ">");

    localStorage.setItem("Usuarios", JSON.stringify(baseUsuarios));

    vista.actualizar_vista(3);
    setTimeout(()=>{
        traerNota(usuario.actual.correo);
    },500)
}

export function cambiarFoto() {
    let urlFoto = prompt("Ingrese el enlace a la nueva foto");
    if (urlFoto == null) {
        return;
    }
    
    const fotoPrueba = new Image();
    
    
    fotoPrueba.onload = () => {
            elementos.imgCambiaPerfil.src = urlFoto;
        };
    fotoPrueba.onerror =
        () => {
            alert("Error al cargar la imagen");
            return;
        };
    
    fotoPrueba.src = urlFoto;

    setTimeout(()=>{
        traerNota(usuario.actual.correo)
    },500)
}