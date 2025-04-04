// import Usuario from "./classes/Usuario.js";
import vista from "./utils/controlador.js";
import elementos from "./utils/elementos.js";
import { registrarUsuario, ingresarUsuario } from "./utils/sistema_usuarios.js";
import { cambiarFoto, guardarFoto, cancelarFoto } from "./utils/sistema_foto.js";
import { configuracion, linkLogin, salir, linkRegistro } from "./utils/rutas_vistas.js";
import { formularioNotas, cambiarEstadoNota, filtrarNotas, cambiarNota } from "./utils/sistema_notas.js";
// vista.asignarElementos(elementos);

window.addEventListener("resize", ()=>{
    const mediaQuery = window.matchMedia("(max-apect-ratio: 4/5)");
    elementos.header.querySelector(".perfil div ul").style.display = mediaQuery.matches ? "flex" : "none";
    setTimeout(() => {
        elementos.header.querySelector(".perfil div ul").style.display = "flex"
    }, 1);
})

// Iniciar en la vista de login
vista.actualizar_vista(0);

// Cambiar de vista entre registro e inicio de sesión
elementos.linkRegister.addEventListener("click", linkLogin);
elementos.linkSesion.addEventListener("click", linkRegistro);

// Evento de registro
elementos.register.addEventListener("submit", registrarUsuario);

// delegación de eventos para el cambio de estado de las notas
// change se activa cuando cambia el valor de un elemento interactivo
elementos.grupoNotas.addEventListener("change", cambiarEstadoNota );

elementos.selectGrupNotes.addEventListener("change", filtrarNotas );

// Evento de inicio de sesión
elementos.login.addEventListener("submit", ingresarUsuario);

// Evento para cambiar foto de perfil
elementos.BtnCambiarFoto.addEventListener("click", cambiarFoto);

// Guardar la nueva foto en localStorage
elementos.BtnGuardarFoto.addEventListener("click", guardarFoto);

// Cancelar cambio de foto
elementos.BtnCancelarFoto.addEventListener("click", cancelarFoto);

elementos.headerConfing.addEventListener("click", configuracion)

elementos.headerExit.addEventListener("click",salir);

elementos.formNotas.addEventListener("submit",formularioNotas);

elementos.grupoNotas.addEventListener("click", cambiarNota);
// function actEliminarNotas(){
//     elementos.grupoNotas.forEach(element => {
//         element.addEventListener("click", eliminarNota);
//     })
// }

pactEliminarNotas()

function pactEliminarNotas(){
    const baseNotas = JSON.parse(localStorage.getItem("Notas"));
    if(!baseNotas) return; 
    baseNotas.forEach(nota => {
        if(nota.eliminado == undefined);
        nota.eliminado = false;
    });

    localStorage.setItem("Notas", JSON.stringify(baseNotas));
}
