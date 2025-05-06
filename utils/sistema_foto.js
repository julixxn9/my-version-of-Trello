import elementos from "./elementos.js";
import { usuario } from "./sistema_usuarios.js";
import extractFrom from "../node_modules/extract-uri-image";

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
        mostrarError(elementos.editarFoto, "error al acceder a la base de datos", elementos.errorPEditarPerfil);
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

export function cambiarFotoArchivo(){
    elementos.imagenPreview.src = elementos.imgCambiaPerfil.src;
    elementos.modalFoto.classList.remove("modal-hidden");
}

export function modificarFotoTemporal(event){
    event.preventDefault();

    // const baseUsuarioExiste = localStorage.getItem("Usuarios"); // 
    // let baseUsuarios = [];

    // if(!baseUsuarioExiste){
    //     elementos.errorPModal.textContent = "Error al acceder a la base de datos";
    //     return;
    // };

    // elementos.errorPModalEditarFoto.textContent = "";


    // baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste)); // concatenar la base de datos con la base de datos existente

    // Guarda la imagen seleccionada en usuario.temporal.foto
    usuario.temporal.foto = elementos.imagenPreview.src;

    // Mostrar la imagen en la vista de edición
    elementos.imgCambiaPerfil.src = usuario.temporal.foto;

    // Cierra el modal
    elementos.modalFoto.classList.add("modal-hidden");

    alert("¡Se ha modificado la foto correctamente!");

    setTimeout(() => {
        elementos.editarModalFoto.reset();
    }, 300);
}

export function cambiarFotosUrl() {

    let nuevaFoto = prompt("Ingrese el enlace a la nueva foto");

    if (nuevaFoto == null) {
            return;
        }
        const fotoPrueba = new Image();
        
        fotoPrueba.onload = async () => {
            try {
                const resultado = await extractFrom.url(nuevaFoto);
                elementos.imagenPreview.src = resultado;
        
            } catch (error) {
                elementos.imagenPreview.src = error;
                }
            };
        fotoPrueba.onerror =
            () => {
                alert("Error al cargar la imagen");
                return;
            };
        
        fotoPrueba.src = nuevaFoto;


}

export function cancelarModificarFoto(){
    elementos.modalFoto.classList.add("modal-hidden");
    setTimeout(() => {
        elementos.imagenPreview.src = "https://placehold.co/400"
    }, 500);
}
    
