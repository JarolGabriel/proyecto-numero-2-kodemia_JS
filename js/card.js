import {
  getAllPosts,
  buttomImport,
  buttomUltimo,
  buttomTop,
  renderCards,
} from "./module.js";

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await getAllPosts();
  renderCards(posts); // Renderiza las tarjetas al cargar la página
});

let ObjetoUser = {};
let userArray = [];

const cargarCardsDesdeFirebase = async () => {
  const posts = await getAllPosts();
  posts.forEach((post) => {
    // Convertir la propiedad tag en un array
    const tagsArray = post.tag.split(",").map((tag) => tag.trim());
    //console.log("esto es un tag", tagsArray);
    // Crear un nuevo objeto para cada post
    ObjetoUser = {
      name: post.name,
      abstract: post.abstract,
      content: post.content,
      date: post.date,
      importance: post.importance,
      picture: post.picture,
      reacciones: post.reacciones,
      tags: tagsArray,
      title: post.title,
    };

    // Agregar el objeto al array
    userArray.push(ObjetoUser);
  });

  // Aquí puedes ver los datos almacenados en userArray
  //console.log(userArray);

  // Ahora puedes utilizar los datos almacenados en userArray
  userArray.forEach((user) => {
    crearCard(user);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  cargarCardsDesdeFirebase();
});

//======================

const crearCard = (post) => {
  const cardContainer = document.getElementById("card-container");

  const cardPrincipal = document.createElement("div");
  cardPrincipal.classList.add("card", "mb-3");
  cardPrincipal.id = "car-principal";

  const cardInfoPerfil = document.createElement("div");
  cardInfoPerfil.classList.add(
    "p-4",
    "pb-0",
    "d-flex",
    "justify-content-start",
    "align-items-center",
    "her-3-foto-name-date"
  );
  cardInfoPerfil.id = "card-infor-perfil";

  const imagenPerfil = document.createElement("img");
  imagenPerfil.classList.add(
    "hero-3-imagen-perfil",
    "card-img-top",
    "rounded-circle",
    "m-2"
  );
  imagenPerfil.src = post.picture;
  imagenPerfil.alt = "chica posando junto a una piedra";
  imagenPerfil.id = "card-img";
  cardInfoPerfil.appendChild(imagenPerfil);

  const divNameDate = document.createElement("div");
  divNameDate.classList.add(
    "hero-3-info-hover",
    "d-flex",
    "flex-column",
    "gap-0"
  );
  divNameDate.id = "div-name-date";

  const nombre = document.createElement("h6");
  nombre.classList.add("hero-3-title-perfil");
  nombre.id = "card-name";
  nombre.textContent = post.name;
  divNameDate.appendChild(nombre);

  const fechaPublicacion = document.createElement("p");
  fechaPublicacion.classList.add("hero-3-date-perfil");
  fechaPublicacion.id = "date";
  fechaPublicacion.textContent = post.date;
  divNameDate.appendChild(fechaPublicacion);

  cardInfoPerfil.appendChild(divNameDate);
  //===============

  const cardOpinionReaccion = document.createElement("div");
  cardOpinionReaccion.classList.add("card-body", "her-3-foto-name-date");
  cardOpinionReaccion.id = "card-opinion-reaccion";

  //======title=====
  const textoPost2 = document.createElement("p");
  textoPost2.classList.add("card-text");
  textoPost2.id = "card-title";
  textoPost2.textContent = post.title;
  cardOpinionReaccion.appendChild(textoPost2);

  const textoPost = document.createElement("p");
  textoPost.classList.add("card-text");
  textoPost.id = "card-title";
  textoPost.textContent = post.content;
  cardOpinionReaccion.appendChild(textoPost);

  //===================

  const divHastags = document.createElement("div");
  divHastags.classList.add("hero-hastah");
  divHastags.id = "card-hastag";

  const boton1 = document.createElement("button");
  boton1.type = "button";
  boton1.classList.add("btn", "btn-custom", "mt-2");

  const spanAzul = document.createElement("span");
  spanAzul.classList.add("azul");
  spanAzul.textContent = "#";

  const textoHastag1 = document.createTextNode("principiante");

  boton1.appendChild(spanAzul);
  boton1.appendChild(textoHastag1);
  divHastags.appendChild(boton1);

  // Para el botón 2
  const boton2 = document.createElement("button");
  boton2.type = "button";
  boton2.classList.add("btn", "btn-custom", "mt-2");

  const spanVerde = document.createElement("span");
  spanVerde.classList.add("verde");
  spanVerde.textContent = "#";

  const textoHastag2 = document.createTextNode("devops");

  boton2.appendChild(spanVerde);
  boton2.appendChild(textoHastag2);
  divHastags.appendChild(boton2);

  // Para el botón 3

  const boton3 = document.createElement("button");
  boton3.type = "button";
  boton3.classList.add("btn", "btn-custom", "mt-2");

  const spanRosado = document.createElement("span");
  spanRosado.classList.add("rosado");
  spanRosado.textContent = "#";

  const textoHastag3 = document.createTextNode("desarrollador");

  boton3.appendChild(spanRosado);
  boton3.appendChild(textoHastag3);
  divHastags.appendChild(boton3);

  // Para el botón 4
  const boton4 = document.createElement("button");
  boton4.type = "button";
  boton4.classList.add("btn", "btn-custom", "mt-2");

  const spanDesarrollo = document.createElement("span");
  spanDesarrollo.classList.add("rosado");
  spanDesarrollo.textContent = "#";

  const textoHastag4 = document.createTextNode("desarrollador");

  boton4.appendChild(spanDesarrollo);
  boton4.appendChild(textoHastag4);
  divHastags.appendChild(boton4);
  cardOpinionReaccion.appendChild(divHastags);

  const divReaccionesComentarios = document.createElement("div");
  divReaccionesComentarios.classList.add(
    "hero-caras-animaciones",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  divReaccionesComentarios.id = "div-reacciones-comentaior";

  const botonReacciones = document.createElement("button");
  botonReacciones.type = "button";
  botonReacciones.classList.add("btn", "btn-secondary", "btn-lg", "boton-2");

  const divEmogi = document.createElement("div");
  divEmogi.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "div-emogi"
  );

  const spanEmoji = document.createElement("span");
  spanEmoji.classList.add("hero-emogi", "mb-0");
  spanEmoji.innerHTML = "&#129505;";

  const spanReacciones = document.createElement("span");
  spanReacciones.textContent = `${post.reacciones} reacciones`;

  divEmogi.appendChild(spanEmoji);
  divEmogi.appendChild(document.createTextNode(" "));
  divEmogi.appendChild(spanReacciones);

  botonReacciones.appendChild(divEmogi);

  divReaccionesComentarios.appendChild(botonReacciones);

  const botonComentarios = document.createElement("button");
  botonComentarios.type = "button";
  botonComentarios.classList.add(
    "btn",
    "btn-secondary",
    "btn-lg",
    "d-flex",
    "boton-2"
  );

  const iconoChat = document.createElement("i");
  iconoChat.classList.add("bi", "bi-chat", "me-1");
  botonComentarios.appendChild(iconoChat);

  const textoComentarios = document.createTextNode(" add comentarios");
  botonComentarios.appendChild(textoComentarios);
  divReaccionesComentarios.appendChild(botonComentarios);

  const divMinutos = document.createElement("div");
  divMinutos.classList.add(
    "hero-minute",
    "d-flex",
    "justify-content-center",
    "ms-auto",
    "div-min-icon"
  );

  const pMinutos = document.createElement("p");
  pMinutos.classList.add("hero-11");
  pMinutos.textContent = "4 min read";
  divMinutos.appendChild(pMinutos);

  divReaccionesComentarios.appendChild(divMinutos);
  cardOpinionReaccion.appendChild(divReaccionesComentarios);

  const iconoBookmark = document.createElement("i");
  iconoBookmark.classList.add("icon-book", "bi", "bi-bookmark");
  divMinutos.appendChild(iconoBookmark);

  cardPrincipal.appendChild(cardInfoPerfil);
  cardPrincipal.appendChild(cardOpinionReaccion);
  cardContainer.appendChild(cardPrincipal);
};

document.addEventListener("DOMContentLoaded", function () {
  crearCard();
  crearList();
});

export { crearCard, cargarCardsDesdeFirebase };

/**
 <ul class="list-group ">
          <li class="list-group-item disabled" aria-disabled="true">
            <p class="list-gruop-hover fw-bold fs-5 ">#conversar</p>
            <p class="fs-12 mb-0">Hilos de discucion dirigidos a toda la comunidad</p>
          </li>

          <li class="list-group-item"><span class="list-gruop-hover fs-6">meme lunes</span>
            <p class="fs-12 mb-0">40 comentarios</p>
          </li>
          <li class="list-group-item"><span class="list-gruop-hover fs-6">Cual es la mejor manera de aprender
              a pensar como
              programador?</span>
            <p class="fs-12 mb-0">2 comentarios</p>
          </li>
          <li class="list-group-item ">
            <div class="row d-flex justify-content-center flex-column ">
              <p class="fs-6"><span class="azul">#</span>Kubernete</p>
              <div class="col-md-4">
                <button type="button" class="btn btn-warning btn-extra-sm mt-2">Nuevo</button>
              </div>
            </div>
          </li>
          <li class="list-group-item ">
            <div class="row d-flex justify-content-center flex-column">
              <p class="fs-6"><span class="azul">#</span>devop</p>
              <div class="col-md-4">
                <button type="button" class="btn btn-warning btn-extra-sm mt-2">Nuevo</button>
              </div>
            </div>
          </li>
          <li class="list-group-item ">
            <div class="row d-flex justify-content-center flex-column ">
              <p class="fs-6"><span class="azul">#</span>opensource</p>
              <div class="col-md-4">
                <button type="button" class="btn btn-warning btn-extra-sm mt-2">Nuevo</button>
              </div>
            </div>
          </li>
          <li class="list-group-item ">
            <div class="row d-flex justify-content-center flex-column ">
              <p class="fs-6"><span class="azul">#</span>learning</p>
              <div class="col-md-4">
                <button type="button" class="btn btn-warning btn-extra-sm mt-2">Nuevo</button>
              </div>
            </div>
          </li>

        </ul>
 */

const crearList = (hastag) => {
  const listGroup = document.getElementsByClassName("list-group");

  const liOne = document.createElement("li");
  liOne.classList.add("list-group-item", "disabled");

  const liParrafo1 = document.createElement("p");
  liParrafo1.classList.add("list-gruop-hover", "fw-bold fs-5");
  liParrafo1.textContent = "#conversar";

  liOne.appendChild(liParrafo1);

  const liParrafo2 = document.createElement("p");
  liParrafo2.classList.add("list-gruop-hover", "fw-bold fs-5");
  liParrafo2.textContent = "#Hastag de discucion dirigidos a toda la comunidad";

  liOne.appendChild(liParrafo2);

  listGroup.appendChild(liOne);

  const liTwo = document.createElement("li");
  liTwo.classList.add("list-group-item");

  const divliTwo = createElement("div");
  divliTwo.classList.add("row d-flex", "justify-content-center", "flex-column");

  //=========parrafo li
  const liParrafo3 = document.createElement("p");
  liParrafo3.classList.add("fs-6");
  const span1 = document.createElement("span");
  span1.classList.add("azul");

  liParrafo3.appendChild(span1);

  const span2 = document.createElement("span");
  span2.textContent = "Kubernete";

  liParrafo3.appendChild(span2);

  const divliTree = createElement("div");
  divliTree.classList.add("col-md-4");

  const boton1 = document.createElement("button");
  boton1.type = "button";
  boton1.classList.add("btn", "btn-warning", "btn-extra-sm mt-2");
  boton1.textContent = "nuevo";
  divliTree.appendChild(boton1);

  //==========
  const liParrafo4 = document.createElement("p");
  liParrafo4.classList.add("fs-6");
  const span3 = document.createElement("span");
  span1.classList.add("azul");

  liParrafo4.appendChild(span3);

  const span4 = document.createElement("span");
  span2.textContent = "Kubernete";

  liParrafo4.appendChild(span4);

  const divliFour = createElement("div");
  divliTree.classList.add("col-md-4");

  const boton2 = document.createElement("button");
  boton2.type = "button";
  boton2.classList.add("btn btn-warning btn-extra-sm mt-2");
  boton2.textContent = "nuevo";
  divliFour.appendChild(boton2);

  //============parrafo li 3

  const liParrafo5 = document.createElement("p");
  liParrafo5.classList.add("fs-6");
  const span5 = document.createElement("span");
  span1.classList.add("azul");

  liParrafo4.appendChild(span5);

  const span6 = document.createElement("span");
  span2.textContent = "Kubernete";

  liParrafo4.appendChild(span6);

  const divliFive = createElement("div");
  divliTree.classList.add("col-md-4");

  const boton3 = document.createElement("button");
  boton3.type = "button";
  boton3.classList.add("btn btn-warning btn-extra-sm mt-2");
  boton3.textContent = "nuevo";
  divliFive.appendChild(boton3);

  liTwo.appendChild(divliTree);
  liTwo.appendChild(liParrafo3);
  liTwo.appendChild(divliFour);
  liTwo.appendChild(liParrafo4);
  liTwo.appendChild(divliFive);
  liTwo.appendChild(liParrafo5);

  listGroup.appendChild(liTwo);

  return listGroup;
};

//crearList();
