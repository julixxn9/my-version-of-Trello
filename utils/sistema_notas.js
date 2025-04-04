import elementos from "./elementos.js";
import { usuario } from "./sistema_usuarios.js";
import Nota from "../classes/notas.js";
import vista from "./controlador.js";

export function formularioNotas(event) {
    event.preventDefault();

    let descrip = elementos.textArea.value;
    let titulo = elementos.inputTitulo.value;

    if (titulo.replaceAll(" ", "") == "" || descrip.replaceAll(" ", "") == "") {
        alert(`Por favor, complete todos los campos ${usuario.actual.nombre}`);
        return;
    }

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if (baseNotasExiste) {
        baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));
    }

    const nuevaNota = new Nota(
        // baseNotas.length,
        titulo.replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        descrip.replaceAll("<", "&#60;",).replaceAll(">", "&#62;"),
        usuario.actual.correo
    );
    baseNotas.push(nuevaNota);

    alert(`La nota ${titulo} ha sido creada con éxito ${usuario.actual.name}`);
    
    localStorage.setItem("Notas", JSON.stringify(baseNotas));
    
    vista.actualizar_vista(3);

    setTimeout(() => {
        elementos.formNotas.reset();
        agregarNotas(nuevaNota);
    }, 500);
}

export function limpiarNotas() {
    let notasEnGrupNotes = document.getElementsByClassName("note");
    if (notasEnGrupNotes.length == 0) {
        return;
    }
    // Array.from sirve para convertir un HTMLCollection en un array
    // notasEnGrupNotes = Array.from(notasEnGrupNotes);
    // notasEnGrupNotes.forEach((notaHTML) => {
    //     notaHTML.className = "note hide-note";
    // });

    for (const notaHTML of notasEnGrupNotes) {
        notaHTML.className = "note hide-note";
    }

}

export function traerNota(quien) {
    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if (!baseNotasExiste) {
        return;
    }

    // concat es una función que une dos arrays
    baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));

    // filter es un método que devuelve un nuevo arreglo con los elementos que cumplan con la condición
    let notasUsuarios = baseNotas.filter(note => note.correo == quien);

    if (notasUsuarios.length == 0) {
        return;
    }

    agregarNotas(...notasUsuarios);
}

function agregarNotas(...notas) {

    let textoHTML = "";

    for (const { id, titulo, descripcion, estado, eliminado } of notas) {
        let colorSelect = "";

        
        if (estado == 1) colorSelect = "orange";
        if (estado == 2) colorSelect = "red";
        if (estado == 3) colorSelect = "greenyellow";
    
        if(!eliminado){
            
            textoHTML += `
            <div class="note show-note" id="nota${id}">
                    <div>
                        <div class="headerNote">
                            <strong>${titulo}</strong>
                            <div class="menuNote">
                                <img src="./img/menuNota.svg" alt="">
                                <ul>
                                    <li class="btnModificate" >Modificate</li>
                                    <li class="btnDelete" >Detele</li>
                                </ul>
                            </div>
                        </div>
                        <p class="descripcionNote">${descripcion}</p>
                        <select style="color: ${colorSelect};" class = "opcion${estado}">
                            <option value="1" style="color: orange;" ${estado == 1 ? 'selected' : ''}>Earring</option>
                            <option value="2" style="color: red;" ${estado == 2 ? 'selected' : ''}>Incomplete</option>
                            <option value="3" style="color: greenyellow;" ${estado == 3 ? 'selected' : ''}>Complete</option>
                        </select>
                    </div>
                </div>
            `;
            setTimeout(() => {
                document.getElementById(`nota${id}`).className = "note";
            }, 1000);
        }
    }
    elementos.grupoNotas.innerHTML += textoHTML;

    const evento_falso = new Event("change");
    elementos.selectGrupNotes.dispatchEvent(evento_falso);
}

// nueva función para cambiar el estado de una nota
export function cambiarEstadoNota(event) {
    if (event.target.tagName != "SELECT") return;

    const selectDeLaNota = event.target;

    const idNota = event.target.closest(".note").id.replace("nota", "");
        // event.target.options: accede a todas las opciones dentro del select
        // devuelve el índice de la opción seleccionada. Por ejemplo, si el usuario elige "Pendiente", y esa es la primera opción, el índice será 0.
        // options[selectedIndex]: obtiene la opción seleccionada.
    const nuevoEstado = event.target.value;

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];
    
    if (!baseNotasExiste) {
        alert("No hay notas para actualizar");
        return;
    }
    
    baseNotas = JSON.parse(baseNotasExiste);
    // findIndex sirve para buscar el índice de un elemento en un array

    const notaObtenida = baseNotas.findIndex((nota) => nota.id == idNota);

    if (notaObtenida == -1) {
        alert("No se encontró la nota");
        return;
    }

    let estadoAnterior = selectDeLaNota.className.replace("opcion", "");

    selectDeLaNota.querySelector(`option:nth-child(${estadoAnterior})`).toggleAttribute("selected", false);
    
    const notaModificable = new Nota();

    notaModificable.colocarValores( baseNotas[notaObtenida] )
    
    let estadoPalabra = selectDeLaNota.options[selectDeLaNota.selectedIndex].text;
    
    notaModificable.cambiarEstado(estadoPalabra)

    baseNotas[notaObtenida] = notaModificable;
    localStorage.setItem("Notas", JSON.stringify(baseNotas));


    selectDeLaNota.style.color = selectDeLaNota.querySelector(`option:nth-child(${nuevoEstado})`).style.color;

    selectDeLaNota.className = `opcion${nuevoEstado}`

    selectDeLaNota.querySelector(`option:nth-child(${nuevoEstado})`).toggleAttribute("selected", true); 

    const evento_falso = new Event("change");
    elementos.selectGrupNotes.dispatchEvent(evento_falso);
}
// el código directamente en el módulo sistema_notas.js porque el cambio de estado de las notas es parte lógica del manejo de las notas. Crear un módulo separado solo para cambiar estados sería innecesario, ya que el estado es una propiedad de las notas y debe estar junto con las funciones que crean, listan y manipulan las notas.
// Esto mantiene el código más cohesionado y fácil de seguir. 

export function filtrarNotas(event) {
    const selectDeLaNota = event.target;
    const nuevoEstado = parseInt(selectDeLaNota.value)
    // el parseInt es para convertir el string a un número, ya que el valor de la opción seleccionada es un string y hacer una suma y no una concatenacion
    selectDeLaNota.style.color = selectDeLaNota.querySelector(`option:nth-child(${nuevoEstado + 1})`).style.color;

    const notasAgregadas = elementos.grupoNotas.getElementsByClassName("note");

    if(notasAgregadas.length == 0){
        return;
    }
    for(const nota of notasAgregadas){
        const selectNota = nota.querySelector("select");
        const estadoNota = selectNota.value;

        if(nuevoEstado == 0){
            animarNotaEspecifica(nota, "mostrar");
        }else{
            animarNotaEspecifica(nota, estadoNota == nuevoEstado);
        }
    }
}

export function cambiarNota(event){
    // el evento es el click en la nota
    const etiqueta = event.target;
    if( etiqueta.tagName != "LI")return;

    // obtener la nota
    const nota = etiqueta.closest(".note");
    const idNota = nota.id.replace("nota", "");
    // el replace es para eliminar la palabra "nota" de la cadena, ya que el id de la nota es "nota" seguido del número de la nota
    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = []
    // si no existe la base de datos de notas, crea una nueva
    if(!baseNotasExiste){
        alert("No hay notas guardadas, base de datos no existe");
        return;
    }
    // el JSON.parse es para convertir el string a un array de objetos
    baseNotas =  baseNotas.concat(JSON.parse(baseNotasExiste))
    // el concat es para agregar el objeto de la nota actual a la base de datos
    const indiceNotaExiste = baseNotas.findIndex(not => not.id == idNota);

    if(indiceNotaExiste == -1){
        alert("Nota no encontrada");
        return;
    }

    if(etiqueta.className == "btnModificate"){
        modificarNota();
    }
    if(etiqueta.className == "btnDelete"){
        borrarNota( nota, idNota, indiceNotaExiste, baseNotas );
    }
}

function modificarNota(){
    console.log("funciona sapo")
}

function borrarNota(elementoNota, idDeLaNota, posicionNota, baseNota){
    // el elementoNota es el elemento que se ha seleccionado para borrar
    // el idDeLaNota es el id de la nota que se ha seleccionado para borrar
    // el posicionNota es la posición de la nota en la base de datos
    // el baseNota es la base de datos de notas

    baseNota.splice(posicionNota, 1);
    // el splice es para eliminar la nota de la base de datos y guardamos
    localStorage.setItem("Notas", JSON.stringify(baseNota));

    // ahora borramos en dom
    animarNotaEspecifica(elementoNota, false);
    // el false es para que la nota se borre de la pantalla
    setTimeout(()=>{
        document.getElementById(`nota${idDeLaNota}`).remove();
    },1000)

}

function animarNotaEspecifica(cual, quiero_mostrar) {
    if(quiero_mostrar) {

        if(cual.className == "note mostrada")return;

        cual.className = "note show-note";
      
        //si ya se animo, le quito la clase
        setTimeout(() => {
            cual.className = "note mostrada";
        }, 1000);
    }else{
        //le coloco la clase de animacion
        if(cual.className == "note ocultar") return;

        cual.className = "note hide-note";
        setTimeout(() => {
            cual.className = "note ocultar";
        }, 1000);
    }
}
