const elementos = {
    nombre: document.getElementById("nombreRegister"),
    apellido : document.getElementById("apellidoRegister"),
    edad : document.getElementById("edadRegister"),
    email : document.getElementById("emailRegister"),
    contra  :document.getElementById("contraRegister"),
    confirContra : document.getElementById("confirContraRegister"),
    imgPhoto : document.querySelector("header .perfil div .imgPerfil"),
    imgCambiaPerfil : document.querySelector("#editarPerfil .imgPerfil"),
    errorPRegistro : document.querySelector("#registro .errorP"),
    errorPSesion : document.querySelector("#login .errorP"),
    header: document.querySelector("header"),
    register: document.getElementById("registro"),
    login: document.getElementById("login"),
    editarFoto: document.getElementById("editarPerfil"),
    divMain: document.getElementById("contenedor"),    
    grupoNotas: document.getElementById("contenedorDeNotas"),
    formNotas: document.getElementById("formularioNotas"),
    linkSesion: document.getElementById("linkForRegister"),
    linkRegister :document.getElementById("linkForLogin"),
    enviarLogin:  document.getElementById("enviarLogin"),
    enviarRegistro:  document.getElementById("enviarRegistro"),
    emailInicio:  document.getElementById("emailSesion"),
    contraInicio : document.getElementById("contraSesion"),
    BtnCambiarDatos:  document.getElementById("btnCambiarDatos"),
    BtnGuardarFoto:  document.getElementById("guardarFoto"),
    BtnCancelarFoto: document.getElementById("cancelarFoto"),
    headerConfing: document.getElementById("headerConfiguration"),
    headerExit: document.getElementById("headerExit"),
    divNotes: document.getElementById("contenNotas"),
    textArea: document.getElementById("descripcionNota"),
    inputTitulo: document.getElementById("tituloNota"),
    userName: document.querySelector("#editarPerfil .nombreUser"),
    userNameHeader: document.querySelector("header .perfil .nombreUser"),
    headerInputCheck: document.querySelector("header .perfil > label > input"),
    selectGrupNotes: document.getElementById("selectGrupNotes"),
}

export default elementos;




