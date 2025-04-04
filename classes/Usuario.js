import Plantilla from "./plantilla.js";

class Usuario extends Plantilla{
    Id;
    constructor(name, lastName, edad, email , clave, urlFoto) {
        super();
        // super es para llamar a la clase padre y heredar sus propiedades y metodos en este caso la clase plantilla con sus metodos y propiedades
        this.name = name
        this.lastName = lastName
        this.age = edad
        this.correo = email
        this.password = clave
        this.foto = urlFoto        
    }
}

export default Usuario;