import Plantilla from "./plantilla.js";

class Nota extends Plantilla {
    constructor(titulo = String, descripcion = String, correo = String) {
        super();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = 1;
        this.correo = correo;
        this.eliminar = false;
    }
    cambiarEstado(nuevo_estado){
        switch (nuevo_estado) {
            case "Earring":
                this.estado = 1;
                break;
            case "Incomplete":
                this.estado = 2;  
                break;
            case "Complete":
                this.estado = 3;
                break;
            default:
                throw new Error(`ERROR: Estado de la nota no válido '${nuevo_estado}', debe ser 'Pendiente', 'Incompleta' o 'Completa'`);
        }
    }
    colocarValores(object){
        for (const clave in this) {
            // this en este caso hace referencia a la clase Nota
            // clave hace referencia a cada propiedad de la clase Nota, ejemplo : id, titulo, descripcion, correo, estado
            // object hace referencia a la nota que se está creando y que se está pasando por parámetro
            this[clave] = object[clave];
        }
    }
}

export default Nota;