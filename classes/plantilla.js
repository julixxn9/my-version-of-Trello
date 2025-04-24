

class Plantilla {
    constructor() {
        this.id = this.generadorDeID(8);
    }
    generadorDeID(cantidad) {
        let id = '';
            for (let i = 0; i < cantidad; i++){
                id += parseInt(Math.random() * 36).toString(36);
            }
            return id; 
    }
}

export default Plantilla;