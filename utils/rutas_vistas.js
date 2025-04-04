import vista from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import elementos from "./elementos.js";
import { limpiarNotas, traerNota } from "./sistema_notas.js";

export function configuracion() {
    elementos.imgCambiaPerfil.src = usuario.actual.foto;
    elementos.userName.textContent = usuario.actual.name;
    elementos.headerInputCheck.checked = false;
    elementos.header.querySelector(".perfil").classList.add("hide-list");
    // elementos.divNotes.querySelector(".menuNote").classList.add("hide-list");
    setTimeout(() => {
        vista.actualizar_vista(2);
        elementos.grupoNotas.innerHTML = ""; // limpia las notas antes de recargar
        traerNota(usuario.actual.correo); // recarga las notas desde el localStorage

        setTimeout(()=>{
            elementos.header.querySelector(".perfil").classList.remove("hide-list");
            // elementos.divNotes.querySelector(".descripcionNote").classList.remove("hide-list");
        },600)

    }, 1000);
    limpiarNotas();
}
export function salir() {
    usuario.actual = {};
    setTimeout(()=>{
        vista.actualizar_vista(0);
        elementos.grupoNotas.innerHTML = "";
        elementos.userName.textContent = "";
        elementos.imgCambiaPerfil.src = "";
    },500)
    limpiarNotas();
    elementos.formNotas.reset();
    elementos.headerInputCheck.checked = false;
}
export function linkLogin() {
    vista.actualizar_vista(0);
}
export function linkRegistro() {
    vista.actualizar_vista(1);
}


