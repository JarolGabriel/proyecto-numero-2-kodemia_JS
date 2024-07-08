// Configuración de Firebase
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  databaseURL: "https://proyectokode-default-rtdb.firebaseio.com/",
  projectId: "proyectokode",
  storageBucket: "proyectokode.appspot.com",
  messagingSenderId: "884908296506",
  appId: "1:884908296506:web:5f9ba59ab34cade1682803",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
const database = firebase.database();

// Event listeners para los botones de publicar y guardar borrador
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".header .publish-btn")
    .addEventListener("click", publishPost);
  document
    .querySelector(".header .header-edit-btn")
    .addEventListener("click", saveDraft);
  document
    .querySelector(".footer .publish-btn")
    .addEventListener("click", publishPost);
  document
    .querySelector(".footer .save-draft-btn")
    .addEventListener("click", saveDraft);
});
// tags//
const tagInput = document.querySelector(".post-tags");
const tagContainer = document.querySelector(".tag-container");
let tags = [];

tagInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && tagInput.value.trim() !== "") {
    e.preventDefault();
    if (tags.length < 4) {
      addTag(tagInput.value.trim());
      tagInput.value = "";
    } else {
      alert("Puedes agregar hasta 4 etiquetas.");
    }
  }
});

function addTag(tag) {
  if (!tags.includes(tag)) {
    tags.push(tag);
    const tagElement = document.createElement("span");
    tagElement.classList.add("tag");
    tagElement.textContent = tag;

    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", function () {
      removeTag(tag);
    });

    tagElement.appendChild(removeButton);
    tagContainer.insertBefore(tagElement, tagInput);
  }
}

function removeTag(tag) {
  tags = tags.filter((t) => t !== tag);
  updateTagElements();
}

function updateTagElements() {
  tagContainer
    .querySelectorAll(".tag")
    .forEach((tagElement) => tagElement.remove());
  tags.forEach((tag) => addTag(tag));
}

// Función para publicar una nueva publicación
function publishPost() {
  const title = document.querySelector(".post-title").value;
  const tags = document.querySelector(".post-tags").value;
  const content = document.querySelector(".post-content").value;
  const date = document.querySelector(".post-date").value; // Obtener la fecha de creación
  const picture = document.querySelector(".post-picture").value;

  // Validar entradas
  if (!title || !tags || !content || !date || !picture) {
    // Validar también los campos adicionales
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Añadir una nueva publicación
  const newPostKey = database.ref().child("posts").push().key;
  const postData = {
    title: title,
    tags: tags,
    content: content,
    createdAt: date, // Guardar la fecha de creación
    name: content,
    picture: picture,
    reacciones: 0,
  };

  const updates = {};
  updates["/posts/" + newPostKey] = postData;

  database
    .ref()
    .update(updates)
    .then(() => {
      console.log("Publicación creada exitosamente!");
      alert("Publicación creada exitosamente!");
      // Redirigir a la página principal después de publicar
      window.location.href = "/loged.html"; // Reemplaza con la ruta correcta de tu página principal
    })
    .catch((error) => {
      console.error("Error al crear la publicación: ", error);
      alert("Error al crear la publicación.");
    });
}

// Función para guardar un borrador de la publicación
function saveDraft() {
  const title = document.querySelector(".post-title").value;
  const tags = document.querySelector(".post-tags").value;
  const content = document.querySelector(".post-content").value;

  // Validar entradas
  if (!title || !tags || !content) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Lógica para guardar un borrador
  // ...

  alert("Borrador guardado.");

  // Limpiar formulario si es necesario
  document.querySelector(".post-title").value = "";
  document.querySelector(".post-tags").value = "";
  document.querySelector(".post-content").value = "";
}
