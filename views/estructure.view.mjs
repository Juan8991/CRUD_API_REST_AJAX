import { controller } from "../controllers/controler.mjs";

export class ViewHtml {
  #privateBody;
  #template;
  #table;
  #doc = document;
  #section;
  #form;
  constructor() {
    document.title = "Caballeros del zodiaco";
    this.#privateBody = document.querySelector("body");
    this.#template = this.createTemplate();
    this.#section = this.createSection();
    this.#privateBody.appendChild(this.#section, this.#template);
    this.#doc.addEventListener("click", async (e) => {
      if (e.target.matches(".edit")) this.editar(e);
      if (e.target.matches(".delete")) this.eliminar(e);
    });
    this.#doc.addEventListener("submit", (e) => {
      controller.controlCreaOeditar(e);
    });
  }
  init(data) {
    const $fragment = document.createDocumentFragment();
    data.forEach((el) => {
      this.#template.querySelector(".name").textContent = el.Nombre;
      this.#template.querySelector(".constellation").textContent =
        el.Constelacion;
      this.#template.querySelector(".edit").dataset.id = el.Id;
      this.#template.querySelector(".edit").dataset.name = el.Nombre;
      this.#template.querySelector(".edit").dataset.constellation =
        el.Constelacion;
      this.#template.querySelector(".delete").dataset.id = el.Id;
      let $clone = document.importNode(this.#template, true);
      $fragment.appendChild($clone);
    });
    this.#table.querySelector("tbody").appendChild($fragment);
    return this.#table.append(this.#table.querySelector("tbody"));
  }

  createSection() {
    const doc = document;
    const hUno = doc.createElement("h1");
    hUno.textContent = "CRUD API REST FETCH";
    const section = doc.createElement("section");
    section.classList.add("crud");
    const articulo1 = doc.createElement("article");
    const hDos = doc.createElement("h2");
    hDos.classList.add("crud-title");
    hDos.textContent = "Agregar Santo";
    this.#form = doc.createElement("form");
    this.#form.classList.add("crud-form");
    const inputNombre = doc.createElement("input");
    inputNombre.type = "text";
    inputNombre.name = "nombre";
    inputNombre.placeholder = "nombre";
    inputNombre.id = "nomb";
    const br1 = doc.createElement("br");
    const inputConstelacion = doc.createElement("input");
    inputConstelacion.type = "text";
    inputConstelacion.name = "constelacion";
    inputConstelacion.placeholder = "constelación";
    inputConstelacion.id = "const";
    inputConstelacion.classList.add("input-contelacion");
    const br2 = doc.createElement("br");
    const inputSubmit = doc.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.value = "Enviar";
    const inputHiden = doc.createElement("input");
    inputHiden.type = "hidden";
    inputHiden.name = "id";
    inputHiden.id = "id";
    inputHiden.classList.add("hiden");
    this.#form.append(inputNombre,br1,inputConstelacion,br2,inputSubmit,inputHiden);
    articulo1.append(hDos, this.#form);
    const articulo2 = doc.createElement("article");
    articulo2.classList.add("art2")
    const hDos2 = doc.createElement("h2");
    hDos2.textContent = "Ver Santos";
    this.#table = doc.createElement("table");
    this.#table.classList.add("crud-table");
    const thead = doc.createElement("thead");
    const th1 = doc.createElement("th");
    th1.textContent = "Nombre";
    const th2 = doc.createElement("th");
    th2.textContent = "Constelación";
    const th3 = doc.createElement("th");
    th3.textContent = "Acciones";
    const tbody = doc.createElement("tbody");
    const tr = doc.createElement("tr");
    tr.append(th1, th2, th3);
    thead.append(tr);
    this.#table.append(thead, tbody);
    articulo2.append(hDos2, this.#table);
    section.append(articulo1);
    section.append(articulo2);
    return section;
  }
  createTemplate() {
    const template = document.createElement("section");
    template.id = "crud-template";
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.classList.add("name");
    const td2 = document.createElement("td");
    td2.classList.add("constellation");
    const td3 = document.createElement("td");
    const botonEditar = document.createElement("button");
    botonEditar.classList.add("edit");
    botonEditar.textContent = "Editar";
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("delete");
    botonEliminar.textContent = "Eliminar";
    td3.append(botonEditar, botonEliminar);
    tr.append(td1, td2, td3);
    template.append(tr);
    return template;
  }
  
  editar(e) {
    console.log("Entro editar");
    this.#form.nombre.value = e.target.dataset.name;
    this.#form.constelacion.value = e.target.dataset.constellation;
    this.#form.id.value = e.target.dataset.id;
  }
  async eliminar(e) {
    controller.controlEliminar(e)
  }
}
