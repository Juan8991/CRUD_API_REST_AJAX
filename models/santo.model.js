export class SantoModel{
    #id;
    #nombre;
    #constelacion;
    constructor(id,nombre,constelecion){
        this.#id=id;
        this.#nombre=nombre;
        this.#constelacion=constelecion;
    }
    get Id(){
        return this.#id;
    }
    get Nombre(){
        return this.#nombre;
    }
    get Constelacion(){
        return this.#constelacion;
    }
}