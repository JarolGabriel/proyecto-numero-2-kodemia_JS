/* dont' touch   */
const BASE_URL = "https://proyectokode-default-rtdb.firebaseio.com/posts";

// Obtener datos de firebase
const getAllPosts = async () => {
  let response = await fetch(`${BASE_URL}/.json`);
  let data = await response.json();
  let dataKeys = Object.keys(data);
  let postsArray = dataKeys.map((key) => ({ ...data[key], key }));
  return postsArray;
};

/*create*/
const createPost = async (postObject) => {
  let response = await fetch(`${BASE_URL}/.json`, {
    method: "POST",
    body: JSON.stringify(postObject),
  });
  let data = await response.json();
  console.log(data);
  return data;
};

/* dont' touch */

export { getAllPosts, createPost };

/**
 ==========codigo de jarol Gabriel==========
 */

const buttomImport = document.getElementById("importante");
const buttomUltimo = document.getElementById("el-ultimo");
const buttomTop = document.getElementById("top");

import { crearCard } from "./card.js";

const getAllPosts2 = async () => {
  const response = await fetch(`${BASE_URL}/.json`);
  const data = await response.json();
  //mofigicaciones
  const postsArray = Object.values(data);
  const updatedDat = addDateAndImportance(postsArray);
  //console.log("esto es dat", data);
  return updatedDat;
};

function formatDate(date) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("es-ES", options).format(date);
}

function addDateAndImportance(data) {
  return data.map((item, index) => {
    const baseDate = new Date(2023, 0, 1);
    const date = new Date(baseDate);
    date.setDate(date.getDate() + index);
    const importance = Math.floor(Math.random() * 10) + 1;
    return {
      ...item,
      date: formatDate(date),
      importance: importance,
    };
  });
}

// crear funcion para ordenar datos por importancia y por fecha y pot top

function sortByImportance(data) {
  return data.sort((a, b) => b.importance - a.importance);
}

function sortByDate(data) {
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortByTop(data) {
  return data.sort((a, b) => b.reacciones - a.reacciones);
}

function renderCards(posts) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

  posts.forEach((post) => {
    crearCard(post); // Llama a crearCard para cada post
  });
}

// Función de filtrado por título
function filterByTitle(data, keyword) {
  return data.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

// funciones de los botenes Import top y last
// Event listener para el botón de "Importante" o "Pertinente"
buttomImport.addEventListener("click", async () => {
  const posts = await getAllPosts2();
  const sortedPosts = sortByImportance([...posts]);
  renderCards(sortedPosts);
  console.log("Post ordenado por importancia:", sortedPosts);
});

// Event listener para el botón de "El último"

buttomUltimo.addEventListener("click", async () => {
  const posts = await getAllPosts2();
  const sortedPosts = sortByDate([...posts]);
  renderCards(sortedPosts);
  console.log("ordenado por el mas ultimo", sortedPosts);
});

// Event listener para el botón de "Top"

buttomTop.addEventListener("click", async () => {
  const posts = await getAllPosts2();
  const sortedPosts = sortByTop([...posts]);
  renderCards(sortedPosts);
  console.log("ordenado por el mas top", sortedPosts);
});

// Event listener para el campo de búsqueda
document.getElementById("searchInput").addEventListener("input", async () => {
  const keyword = document.getElementById("searcput").valuehIn;
  const posts = await getAllPosts2();
  const filteredPosts = filterByTitle(posts, keyword);
  renderCards(filteredPosts);
  console.log("Posts filtrados por título:", filteredPosts);
});

// exporta funciones
export { getAllPosts2, buttomImport, buttomUltimo, buttomTop, renderCards };

//==============tags =====

// Función para crear y renderizar una tarjeta (card)
const crearListTags = (post) => {
  const cardContainer = document.getElementById("list-container");

  const ul = document.createElement("ul");
  ul.className = "list-group";

  // Título principal de la tarjeta
  const liTitulo = document.createElement("li");
  liTitulo.className = "list-group-item disabled";
  liTitulo.setAttribute("aria-disabled", "true");
  const titulo = document.createElement("p");
  titulo.className = "list-group-hover fw-bold fs-5";
  titulo.textContent = "#conversar";
  const descripcion = document.createElement("p");
  descripcion.className = "fs-12 mb-0";
  descripcion.textContent = "Hilos de discusión dirigidos a toda la comunidad";
  liTitulo.appendChild(titulo);
  liTitulo.appendChild(descripcion);
  ul.appendChild(liTitulo);

  // Crear lista de tags
  post.tags.slice(0, 4).forEach((tag) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    const span = document.createElement("span");
    span.className = "list-group-hover fs-6";
    span.textContent = `#${tag}`;
    const p = document.createElement("p");
    p.className = "fs-12 mb-0";
    p.textContent = "sjd"; // Aquí puedes reemplazar con otro dato de tu post si es necesario
    li.appendChild(span);
    li.appendChild(p);
    ul.appendChild(li);
  });

  cardContainer.appendChild(ul);
};

// Función para obtener y renderizar los datos de Firebase
const printAllPostsTags = async () => {
  const posts = await getAllPosts2();
  posts.forEach((post) => crearListTags(post));
};

// Llamar a la función principal que inicia todo
printAllPostsTags();
