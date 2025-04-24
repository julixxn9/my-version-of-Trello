const elementos = {
    // -----------------------------
    // Inputs del formulario de registro
    // -----------------------------
    nombre: document.getElementById("nombreRegister"),
    apellido: document.getElementById("apellidoRegister"),
    edad: document.getElementById("edadRegister"),
    email: document.getElementById("emailRegister"),
    contra: document.getElementById("contraRegister"),
    confirContra: document.getElementById("confirContraRegister"),

    // -----------------------------
    // Inputs del formulario de inicio de sesión
    // -----------------------------
    emailInicio: document.getElementById("emailSesion"),
    contraInicio: document.getElementById("contraSesion"),

    // -----------------------------
    // Botones del login y registro
    // -----------------------------
    enviarLogin: document.getElementById("enviarLogin"),
    enviarRegistro: document.getElementById("enviarRegistro"),
    linkSesion: document.getElementById("linkForRegister"),
    linkRegister: document.getElementById("linkForLogin"),

    // -----------------------------
    // Secciones principales de la app
    // -----------------------------
    header: document.querySelector("header"),
    register: document.getElementById("registro"),
    login: document.getElementById("login"),
    editarFoto: document.getElementById("editarPerfil"),
    divMain: document.getElementById("contenedor"),
    grupoNotas: document.getElementById("contenedorDeNotas"),
    formNotas: document.getElementById("formularioNotas"),
    divNotes: document.getElementById("contenNotas"),

    // -----------------------------
    // Campos del formulario de notas
    // -----------------------------
    textArea: document.getElementById("descripcionNota"),
    inputTitulo: document.getElementById("tituloNota"),
    selectGrupNotes: document.getElementById("selectGrupNotes"),

    // -----------------------------
    // Imágenes de perfil
    // -----------------------------
    imgPhoto: document.querySelector("header .perfil div .imgPerfil"),
    imgCambiaPerfil: document.querySelector("#editarPerfil .imgPerfil"),

    // -----------------------------
    // Errores visuales
    // -----------------------------
    errorPRegistro: document.querySelector("#registro .errorP"),
    errorPSesion: document.querySelector("#login .errorP"),
    errorPEditarPerfil: document.querySelector("#editarPerfil .errorP"),
    errorPModal: document.querySelector(".modalDatos .errorP"),

    // -----------------------------
    // Nombre de usuario mostrado
    // -----------------------------
    userName: document.querySelector("#editarPerfil .nombreUser"),
    userNameHeader: document.querySelector("header .perfil .nombreUser"),

    // -----------------------------
    // Botones de edición de perfil
    // -----------------------------
    BtnCambiarDatos: document.getElementById("btnCambiarDatos"),
    BtnGuardarDatos: document.getElementById("guardarDatos"),
    BtnCancelarDatos: document.getElementById("cancelarDatos"),

    // -----------------------------
    // Configuración del header
    // -----------------------------
    headerConfing: document.getElementById("headerConfiguration"),
    headerExit: document.getElementById("headerExit"),
    headerInputCheck: document.querySelector("header .perfil > label > input"),

    // -----------------------------
    // Modal de edición de datos del usuario
    // -----------------------------
    modalEditarDatos: document.querySelector(".modalDatos"),
    formModalDatos: document.querySelector(".editarForm"),
    nombreModificado: document.getElementById("nombreEditarUser"),
    apellidoModificado: document.getElementById("apellidoEditarUser"),
    edadModificado: document.getElementById("edadEditarUser"),
    emailModificado: document.getElementById("emailEditarUser"),
    contraOldModificado: document.getElementById("contraOldEditarUser"),
    contraNewModificado: document.getElementById("contraNewEditarUser"),
    contraConfirmarModificado: document.getElementById("confirNeWEditarUser"),
    cancelarModificar: document.querySelector(".cancelarEditarUser"),
}

export default elementos;