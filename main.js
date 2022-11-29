// TODO import pickRandomName from "./data";
// TODO import NetworkError from "./util";
let ul = document.querySelector(".content-grid");
const selector = document.querySelector("#category");
const keyAPI = `live_B3MS8jrg6WiRwgWSEfC8seqWmvYtectC7NczZGtuBtmwBN5c0qahR9KVNz6QuDuk`;
let url = `https://api.thecatapi.com/v1/categories`;

document.addEventListener("DOMContentLoaded", () => {
  catCategories(url);
  selector.addEventListener("change", getImgCats);
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
        option.setAttribute("value", `${item.id}`);
        selector.append(option);
      });
    });
}

function getImgCats(ev) {
  url = `https://api.thecatapi.com/v1/images/search?limit=10&category_ids=${ev.target.value}&api_key${keyAPI}`;
  console.log(url);
  ul.innerHTML = ``;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      data.map((item) => {
        let li = document.createElement("li");
        li.innerHTML = `
        <figure>
            <img src='${item.url}'
                alt='cat img'>
                <figcaption>An elephant at sunset</figcaption>
        </figure>
        `;
        ul.append(li);
      });
    });
}
