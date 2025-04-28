import elementos from "./elementos.js";
import vista from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import { traerNota } from "./sistema_notas.js";

export function cambiarDatos() {
  elementos.nombreModificado.value = usuario.temporal.name;
  elementos.apellidoModificado.value = usuario.temporal.lastName;
  elementos.edadModificado.value = usuario.temporal.age;
  elementos.emailModificado.value = usuario.temporal.correo;
  elementos.modalEditarDatos.classList.remove("modal-hidden");
  }

  export function aceptarEdicionUsuario(event) {
    event.preventDefault();
  
    //validar si existe la base de datos de "Usuarios"
    const baseUsuariosExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];
  
    //si la base de datos no existe, arrojar un error diciendo que no está registrado o encontrado
    if (!baseUsuariosExiste) {
      elementos.errorPModal.textContent = "Error al acceder a la base de datos";
      return;
    }
  
    //si existe, formatearla con el arreglo JSON
    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));
    let campoCorreo = elementos.emailModificado.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;");
    const usuarioExistenteIndice = baseUsuarios.findIndex((user) => user.correo.toLowerCase() === campoCorreo.toLowerCase());

  
    if (usuarioExistenteIndice){
      if(usuarioExistenteIndice.correo != usuario.actual.correo){
        elementos.errorPModal.textContent = "El nuevo correo ya fue usuado por otra cuenta"
      }
    }

    let campoClaveAnterior = elementos.contraOldModificado.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;");
    if(campoClaveAnterior != usuario.actual.password){
      elementos.errorPModal.textContent = "La clave anterior no es la misma";
      return;
    }
  
    let campoClaveNueva = elementos.contraNewModificado.value
    let campoClaveNuevaConfirmar = elementos.contraConfirmarModificado.value
    if(campoClaveNueva != campoClaveNuevaConfirmar){
      elementos.errorPModal.textContent = "Las claves nuevas no coinciden. Por favor, verifícalas.";
      return;
    }

    elementos.errorPModal.textContent = "";

    usuario.temporal.name = elementos.nombreModificado.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;");
    usuario.temporal.lastName = elementos.apellidoModificado.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;");
    usuario.temporal.age = elementos.edadModificado.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;");
    usuario.temporal.correo = campoCorreo;
    usuario.temporal.password = campoClaveNueva;
  
    elementos.userName.textContent = usuario.temporal.name.replaceAll("<", "&#60;").replaceAll(">", "&#62;");
    elementos.modalEditarDatos.classList.add("modal-hidden");
  
    alert("Se ha modificado el usuario correctamente. Presione 'Guardar' para confirmar cambios");
    setTimeout(() => {
      elementos.formModalDatos.reset();
    }, 300);
  }

export function cancelarModificacion(){
    usuario.temporal = {};
    elementos.imgPhoto.src = usuario.actual.foto;
    vista.actualizar_vista(3);
    elementos.userNameHeader.textContent = usuario.actual.name.replaceAll("&#60;", "<").replaceAll("&#62;", ">");

    elementos.modalEditarDatos.classList.add("modal-hidden");
    setTimeout(() => {
      elementos.formModalDatos.reset();
      traerNota(usuario.actual.correo);
    }, 300);
}

export function guardarDatos() {
    const baseUsuariosExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];
    if (!baseUsuariosExiste) {
      alert("Error al acceder a la base de datos");
      return;
    }
  
    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));
  
    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];
    if (baseNotasExiste) {
      baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));
    }
  
    const indiceUsuarioExiste = baseUsuarios.findIndex((usuarioBuscar) => usuarioBuscar.correo === usuario.actual.correo);
  
    if (indiceUsuarioExiste === -1) {
      alert("Error al guardar cambios en la base de datos");
      return;
    }
  
    /* 
    antes de modificar
    usuario actual = anterior@gamil.com
    usuario temporal = anterior@gmail.com

    despues de modificar (sin guardar)
    usuario actual = anterior@gmail.com
    usuario temporal = nuevo@gmail.com

    guardo el correo anterior para usuarlo despues (el bucle no me afecta) <- correoTemporal

    despues de guardar
    usuario actual = nuevo@gmail.com
    usuario temporal = nuevo@gmail.com

    las notas en plan no se modifican, entonces las notas se mantienen asociadas al correo anterior

    */

    const correoTemporal = usuario.actual.correo;
  
    for (const clave in usuario.temporal) {
      usuario.actual[clave] = usuario.temporal[clave];
      baseUsuarios[indiceUsuarioExiste][clave] = usuario.temporal[clave];
    }
  
    baseNotas.forEach((nota) => {
      if (nota.correo === correoTemporal) {
        nota.correo = usuario.actual.correo;
      }
    });
  
    elementos.imgPhoto.src = usuario.actual.foto;
    elementos.userNameHeader.textContent = usuario.actual.name.replaceAll("&#60;", "<").replaceAll("&#62;", ">");
  
    localStorage.setItem("Usuarios", JSON.stringify(baseUsuarios));
    localStorage.setItem("Notas", JSON.stringify(baseNotas));
  
    vista.actualizar_vista(3);
    setTimeout(() => {
      traerNota(usuario.actual.correo);
    }, 500);
  
    usuario.temporal = {};
  }

  export function cancelarCambios() {
    if (elementos.modalEditarDatos) {
        elementos.modalEditarDatos.classList.add("modal-hidden");
    } else {
        console.warn("modalDatos no está definido.");
    }
}
