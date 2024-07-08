const importBtn = document.getElementById("importante");
const lastestBtn = document.getElementById("el-ultimo");
const topBtn = document.getElementById("top");
const cardOcultar = document.getElementById("card-ocultar");

const imageImportante = document.getElementById("image-importante");
const imageElUltimo = document.getElementById("image-el-ultimo");

//imageElUltimo.classList.add("hidden");

const handleClick = (event) => {
  importBtn.classList.remove("hover-palabra-active");
  lastestBtn.classList.remove("hover-palabra-active");
  topBtn.classList.remove("hover-palabra-active");

  event.target.classList.add("hover-palabra-active");

  switch (event.target.id) {
    case "importante":
      imageImportante.classList.remove("hidden");
      imageElUltimo.classList.add("hidden");
      cardOcultar.style.display = "block";
      break;
    case "el-ultimo":
      imageImportante.classList.add("hidden");
      imageElUltimo.classList.remove("hidden");
      cardOcultar.style.display = "block";
      break;
    case "top":
      cardOcultar.style.display = "none";
      break;
  }
};

importBtn.addEventListener("click", handleClick);
lastestBtn.addEventListener("click", handleClick);
topBtn.addEventListener("click", handleClick);
