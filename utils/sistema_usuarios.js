import elementos from "./elementos.js";
import vista from "./controlador.js";
import Usuario from "../classes/Usuario.js";

export const usuario = { actual: {}, temporal: {} }

export function mostrarError(input, mensaje, errorP) {
    input.style.border = "2px solid red";
    errorP.textContent = mensaje;
    errorP.style.visibility = "visible";
}
// Función para limpiar errores visuales 
export function limpiarError(input, errorP) {
    input.style.border = "";
    errorP.textContent = "";
    errorP.style.visibility = "hidden";
}
export function registrarUsuario(event) {
    event.preventDefault();

    // Limpiar errores previos
    limpiarError(elementos.email, elementos.errorPRegistro);
    limpiarError(elementos.contra, elementos.errorPRegistro);
    limpiarError(elementos.confirContra, elementos.errorPRegistro);

    // verificar si el usuario ya existe (array)
    const baseUsuarioExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];

    // si el arreglo existe , quiere decir que ya hay usuarios
    if (baseUsuarioExiste) {
        // fusionamos el arreglo existente con el nuevo de registro 
        baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));
        // buscamos en dicho arreglo si el usuario ya existe
        const usuarioExistente = baseUsuarios.find((user) => user.correo.toLowerCase() == elementos.email.value.toLowerCase());

        // verificar si el correo ya existe
        if (usuarioExistente) {
            mostrarError(elementos.email, "Este correo ya está registrado.", elementos.errorPRegistro);
            return;
        }

    }
    // Validar que las contraseñas coincidan
    if (elementos.contra.value !== elementos.confirContra.value) {
        mostrarError(elementos.confirContra, "Las contraseñas no coinciden.", elementos.errorPRegistro);
        return;
    }

    // Crear objeto del usuario
    const usuarioGuardar = new Usuario(
        // baseUsuarios.length,ID único basado en la posicion
        elementos.nombre.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        elementos.apellido.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        elementos.edad.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        elementos.email.value.toLowerCase().replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        elementos.contra.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        "https://placehold.co/400"
    );
    //sin importar si el arreglo existe o no, lo guardamos
    baseUsuarios.push(usuarioGuardar);

    // Guardar el arreglo en el localStorage
    const stringBaseUserConUserSave = JSON.stringify(baseUsuarios);

    // guardamos el JSON bajo la clave "Usuarios", ya que no queremos mezclar los usuarios con las otras notas 
    localStorage.setItem("Usuarios", stringBaseUserConUserSave);

    // felicitamos al user por su registro exitoso
    alert(`Registro exitoso, Bienvenido ${elementos.nombre.value}!`);

    // ayudamos al usuario a que se loguee
    elementos.emailInicio.value = elementos.email.value;
    // limpiamos los campos para que el usuario pueda volver a registrarse y lo dejamos en el campo de inicio de sesión

    setTimeout(() => {
        elementos.register.reset();
        vista.actualizar_vista(0);
    }, 500);
}
export function ingresarUsuario(event) {
    event.preventDefault();
    const baseUsuarioExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];
    // Verificar si el usuario existe
    if (!baseUsuarioExiste) {
        mostrarError(elementos.emailInicio, "Usuario no encontrado", elementos.errorPSesion);
        return;
    }
    limpiarError(elementos.emailInicio, elementos.errorPSesion);

    let campoCorreo = elementos.emailInicio.value.toLowerCase().replaceAll("<", "&#60;").replaceAll(">", "&#62;");

    // Convertir la cadena de JSON a un arreglo de objetos
    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

    const usuarioExistente = baseUsuarios.find((user) => user.correo.toLowerCase() == campoCorreo.toLowerCase());

    let campoContra = elementos.contraInicio.value.replaceAll("<", "&#60;").replaceAll(">", "&#62;");

    // verificar si el usuario ya existe
    if (!usuarioExistente) {
        mostrarError(elementos.emailInicio, "Usuario no encontrado.", elementos.errorPSesion);
        return;
    }

    if (usuarioExistente.password != campoContra) {
        mostrarError(elementos.contraInicio, "Contraseña incorrecta.", elementos.errorPSesion);
        return;
    }
    limpiarError(elementos.emailInicio, elementos.contraInicio);

    alert("Inicio de sesión exitoso, bienvenido/a " + usuarioExistente.name.replaceAll("&#60", "<").replaceAll("&#62", ">"));
    usuario.actual = usuarioExistente;
    elementos.imgCambiaPerfil.src = usuario.actual.foto;
    
    elementos.userName.textContent = usuario.actual.name.replaceAll("&#60", "<").replaceAll("&#62", ">") + " " + usuario.actual.lastName.replaceAll("&#60", "<").replaceAll("&#62", ">");
    
    // ayudamos al usuario a que se loguee
    setTimeout(() => {
        elementos.login.reset();
        vista.actualizar_vista(2);
    }, 500);
    
        for (const clave in usuario.actual) {
            usuario.temporal[clave] = usuario.actual[clave];
          }      
}

