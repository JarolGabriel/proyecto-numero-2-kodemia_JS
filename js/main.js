//=======barbarito======

import { getAllPosts } from "./module.js";
getAllPosts();

const cardContainer = document.getElementById("card-container");
const ccsPosts = document.getElementById("ccsPosts");
const javascriptPosts = document.getElementById("javascriptPosts");
const reactPosts = document.getElementById("reactPosts");
let hashtagList = document.getElementById("hashtagList");
const cardList = document.getElementsByClassName("cardList");

const printAllPost = async () => {
  let posts = await getAllPosts();
  posts.forEach((post) => {
    const divContainer = document.createElement("div");
    divContainer.classList = "card mb-3 p-4";
    const imageContainer = document.createElement("img");
    imageContainer.setAttribute("src", post.picture);
    imageContainer.style.width = "10%";
    imageContainer.style.borderRadius = "50%";
    const h5 = document.createElement("h5");
    h5.classList.add("card-text");
    h5.textContent = post.title;
    divContainer.append(imageContainer, h5);
    cardContainer.append(divContainer);
  });
};
printAllPost();

// Mostrar datos

const printAllPostsTags = async () => {
  let posts = await getAllPosts();

  // Objeto para almacenar las listas de posts por hashtag
  const postsByHashtag = {
    "#css": [],
    "#javascript": [],
    "#react": [],
  };

  // Filtrar y agrupar los posts por los primeros 5 post con base en su hashtag
  posts.forEach((post) => {
    console.log(post);
    if (post.tags.includes("css") && postsByHashtag["#css"].length < 5) {
      postsByHashtag["#css"].push(post);
    }
    if (
      post.tags.includes("javascript") &&
      postsByHashtag["#javascript"].length < 5
    ) {
      postsByHashtag["#javascript"].push(post);
    }
    if (post.tags.includes("react") && postsByHashtag["#react"].length < 5) {
      postsByHashtag["#react"].push(post);
    }
  });

  console.log(postsByHashtag);
  // Llamar a la función para renderizar los posts después de obtener los datos
  renderPosts(postsByHashtag);
};

// Función para crear elementos DOM y agregarlos a las listas correspondientes
const renderPosts = (postsByHashtag) => {
  // Elementos donde se agregarán las listas de posts
  const ccsList = document.getElementById("ccsPosts").querySelector("ul");
  let javascriptList = document
    .getElementById("javascriptPosts")
    .querySelector("ul");
  let reactList = document.getElementById("reactPosts").querySelector("ul");

  // Renderizar posts de #css
  postsByHashtag["#css"].forEach((post) => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    let a = document.createElement("a");
    a.href = "#"; // URL del post
    a.textContent = post.abstract;
    let p = document.createElement("p");
    p.id = "commentsList";
    p.textContent = `${post.reacciones} comments`;
    li.appendChild(a);
    li.appendChild(p);
    ccsList.appendChild(li);
  });

  // Renderizar posts de #javascript
  postsByHashtag["#javascript"].forEach((post) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    const a = document.createElement("a");
    a.href = "#"; // URL para el post
    a.textContent = post.abstract;
    const p = document.createElement("p");
    p.className = "commentsList";
    p.textContent = `${post.reacciones} comments`;
    li.appendChild(a);
    li.appendChild(p);
    javascriptList.appendChild(li);
  });

  // Renderizar posts de #react
  postsByHashtag["#react"].forEach((post) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    const a = document.createElement("a");
    a.href = "#"; // URL para el post
    a.textContent = post.abstract;
    const p = document.createElement("p");
    p.id = "commentsList";
    p.textContent = `${post.reacciones} comments`;
    li.appendChild(a);
    li.appendChild(p);
    reactList.appendChild(li);
  });
};

// Llamar a la función principal que inicia todo
printAllPostsTags();
