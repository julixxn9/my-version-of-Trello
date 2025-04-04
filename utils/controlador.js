import elementos from "./elementos.js";

const vista = {
/*    asignarElementos({ login, register, editarFoto, header, divMain, divNotes, formNotas, grupoNotas}) {
        this.login = login;
        this.register = register;
        this.editarFoto = editarFoto;
        this.header = header;
        this.divMain = divMain;
        this.divNotes = divNotes;
        this.formNotas = formNotas;
        this.grupoNotas = grupoNotas;
    },*/
    actualizar_vista(cual_es) {
        this.vista_actual = cual_es;
        this.animar("hide-card", "hide-note");
        setTimeout(() => {
            
            elementos.login.style.display = cual_es == 0 ? "flex" : "none";
            elementos.register.style.display = cual_es == 1 ? "flex" : "none";
            elementos.editarFoto.style.display = cual_es == 2 ? "flex" : "none";

            elementos.header.style.top = cual_es == 3 ? "0vh" : "-10vh";
            elementos.divNotes.style.display = cual_es == 3 ? "flex" : "none";
            elementos.divMain.style.display = cual_es == 3 ? "none" : "flex";

            this.animar("show-card", "show-note");
        }, 500);
    },

    animar(mostar_ocultar, mostar_ocultar_notas) {
        elementos.divMain.className = `contenedor ${mostar_ocultar}`;
        // elementos.grupoNotas.className = `contenedorDeNotas ${mostar_ocultar_notas}`;
        elementos.formNotas.className = `formNotas ${mostar_ocultar}`
    },
};

export default vista;
