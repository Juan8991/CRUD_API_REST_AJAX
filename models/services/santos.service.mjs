import { SantoModel } from "/models/santo.model.js";

export class SantosService {
  #privateUrl;

  constructor() {
    this.#privateUrl;
  }
  setURL(url) {
    this.#privateUrl = url;
  }

  async getSantos() {
    const santosData = await this.#getData();
    const arraySantos = new Array();
    santosData.forEach((santo) => {
      arraySantos.push(
        new SantoModel(santo.id, santo.nombre, santo.constelacion)
      );
    });
    return arraySantos;
  }
  async #getData() {
    return fetch(`${this.#privateUrl}`).then((response) => response.json());
  }

  async saveSanto(e) {
    console.log("Entro al metodo save santo");
    try {
      let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            nombre: e.target.nombre.value,
            constelacion: e.target.constelacion.value,
          }),
        },
        res = await fetch("http://localhost:5555/santos", options),
        json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      location.reload();
    } catch (err) {
      let message = "Ocurrió un error";
    }
  }
  async editSanto(e) {
    let isUpDate = confirm(
      `¿Estás seguro de editar el santo?`
    ); 
    e.target.dataset.id
    if (isUpDate) {
      try {
        let options = {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              constelacion: e.target.constelacion.value,
            }),
          },
          res = await fetch(
            `http://localhost:5555/santos/${e.target.id.value}`,
            options
          ),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = "Ocurrió un error";
      }
    }
  }
  async deleteSanto(e) {
    if (e.target.matches(".delete")) {
      let isDelete = confirm(
        `¿Estás seguro de eliminar el id ${e.target.dataset.id}?`
      );
      if (isDelete) {
        //Delete - DELETE
        try {
          let options = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=utf-8",
              },
            },
            res = await fetch(
              `http://localhost:5555/santos/${e.target.dataset.id}`,
              options
            ),
            json = await res.json();

          if (!res.ok) throw { status: res.status, statusText: res.statusText };

          location.reload();
        } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          alert(`Error ${err.status}: ${message}`);
        }
      }
    }
  }
}
