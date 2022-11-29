// TODO import pickRandomName from "./data";
// TODO import NetworkError from "./util";

const selector = document.querySelector("#category");

document.addEventListener("DOMContentLoaded", () => {
  const keyAPI = `live_B3MS8jrg6WiRwgWSEfC8seqWmvYtectC7NczZGtuBtmwBN5c0qahR9KVNz6QuDuk`;
  const url = `https://api.thecatapi.com/v1/categories`;
  catCategories(url);
  //   TODO selector.addEventListener("change");
});

function catCategories(url) {
  selector.innerHTML = `<option value="pick">Pick a category</option>`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      data.map((item) => {
        let option = document.createElement("option");
        option.innerHTML = `${item.name}`;
        option.setAttribute("value", `${item.name}`);
        selector.append(option);
      });
    });
}
