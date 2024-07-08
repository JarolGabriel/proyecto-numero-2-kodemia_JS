const BASE_URL = "https://proyectokode-default-rtdb.firebaseio.com/posts";
const getAllUsers = async () => {
  let response = await fetch(`${BASE_URL}.json`);
  let data = await response.json();
};
