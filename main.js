document.addEventListener("DOMContentLoaded", () => {
  catCategories(url);
  selector.addEventListener("change", getImgCats);
});

import pickRandomName from "./data.js";
import { NetworkError } from "./util.js";

const selector = document.querySelector("#category");
const keyAPI = `live_B3MS8jrg6WiRwgWSEfC8seqWmvYtectC7NczZGtuBtmwBN5c0qahR9KVNz6QuDuk`;
let url = `https://api.thecatapi.com/v1/categories`;
let ul = document.querySelector(".content-grid");
let divContainer = document.querySelector(".div_error");
let spinImg = document.querySelector(".loader_img");
let cache = getLocalStorage();

function catCategories(url) {
  selector.innerHTML = `<option>Categories</option>`;
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
    })
    .catch((err) => {
      return errorCategories(true, err);
    });
}

function getImgCats(ev) {
  if (ev.target.value === "Categories") {
    return;
  }
  url = `https://api.thecatapi.com/v1/images/search?limit=10&category_ids=${ev.target.value}&api_key${keyAPI}`;
  ul.innerHTML = ``;
  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        spin(false);
        throw new NetworkError("Failed API Call", response);
      } else {
        spin(true);
        return delay(2000).then(() => response.json());
      }
    })
    .then((data) => {
      spin(false);
      ul.innerHTML = data
        .map((item) => {
          if (item.id in cache) {
            return `
            <li>
            <figure>
            <img src='${item.url}'
            alt='cat img'>
            <figcaption>→ ${cache[item.id]} ←</figcaption>
            </figure>
            </li>
        `;
          } else {
            let catNames = pickRandomName();
            cache[item.id] = `${catNames}`;
            saveToLocalStorage();
            return `
            <li>
            <figure>
            <img src='${item.url}'
            alt='cat img'>
            <figcaption>→ ${catNames} ←</figcaption>
            </figure>
            </li>`;
          }
        })
        .join("");
    })
    .catch((err) => {
      return errorCategories(true, err);
    });
}

function saveToLocalStorage() {
  localStorage.setItem("cache-auza0002", JSON.stringify(cache));
}
function getLocalStorage() {
  let cache = localStorage.getItem("cache-auza0002");
  return cache ? JSON.parse(cache) : {};
}
function spin(show) {
  if (show === true) {
    spinImg.classList.add("active");
    errorCategories(false);
  } else {
    spinImg.classList.remove("active");
  }
}
function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
function errorCategories(show, err) {
  if (show) {
    console.log(err.status);
    let errorP = document.querySelector(".error_p");
    if (err.status === 404) {
      errorP.innerHTML = `Error ${err.status}, try again. no images found`;
      spin(false);
      console.warn(err);
      divContainer.classList.add("active");
    } else {
      spin(false);
      console.warn(err);
      divContainer.classList.add("active");
      return (errorP.innerHTML = `there is something wrong, try again. double check your connection`);
    }
  } else {
    divContainer.classList.remove("active");
  }
}
