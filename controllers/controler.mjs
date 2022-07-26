import { SantosService } from "/models/services/santos.service.mjs";
import { ViewHtml } from "/views/estructure.view.mjs";


class Controller{
    #apiFakeURL
    #view
    #servicio
    constructor(){
        this.#apiFakeURL="http://localhost:5555/santos";
        this.#view= new ViewHtml(); 
        this.#servicio=new SantosService();   
    }
    async init(){
        this.#servicio.setURL(this.#apiFakeURL)
        const santos = await this.#servicio.getSantos();
        this.#view.init(santos);
    }
    controlCreaOeditar(e){
        if (!e.target.id.value) {
            
            this.#servicio.saveSanto(e)
        }else{

            this.#servicio.editSanto(e)
        }
    }
    controlEliminar(e){
        this.#servicio.deleteSanto(e)
    }
}
export const controller = new Controller();
controller.init();