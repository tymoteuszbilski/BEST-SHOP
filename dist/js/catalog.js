"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const PAGE_LIMIT = 12;
let currentStart = 0;
let results_total = 0;
let pages = 0;
let current_page = 0;
initialization();
const PAGES = document.getElementById("PAGES");
const RESULTS = document.getElementById("RESULTS");
const SORT = document.getElementById("SORT");
SORT.addEventListener("change", (e) => {
    currentStart = 0;
    current_page = 0;
    console.log(SORT.value);
    displayProducts("next", e.target.value);
});
const NEXT = document.getElementById("NEXT");
NEXT.addEventListener("click", () => displayProducts("next"));
const PREVIOUS = document.getElementById("PREVIOUS");
PREVIOUS.addEventListener("click", () => displayProducts("previous"));
function filterProducts(products, filters = filtersObject) {
    return products.filter((product) => filters.size === ""
        ? true
        : product.size === filters.size && filters.color === ""
            ? true
            : product.color === filters.color && filters.category === ""
                ? true
                : product.category === filters.category &&
                    filters.salesStatus === false
                    ? true
                    : product.salesStatus === filters.salesStatus);
}
const filtersObject = { size: "", color: "", category: "", salesStatus: false };
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/src/assets/data.json");
        const data = yield response.json();
        const products = data.data;
        return products;
    });
}
function initialization() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield getProducts();
        results_total = products.length;
        pages = Math.ceil(results_total / PAGE_LIMIT);
        for (let i = 1; i <= pages; i++) {
            const LI = document.createElement("li");
            LI.innerHTML = `${i}`;
            PAGES === null || PAGES === void 0 ? void 0 : PAGES.appendChild(LI);
        }
        displayProducts("next");
    });
}
function displayProducts(direction_1) {
    return __awaiter(this, arguments, void 0, function* (direction, sortBy = "default") {
        const products = yield getProducts();
        pagination(sort(products, sortBy), direction);
        updateUI(direction);
    });
}
function pagination(products, direction) {
    if (direction === "next") {
        currentStart + PAGE_LIMIT > products.length
            ? populateElement(products.slice(currentStart, products.length))
            : populateElement(products.slice(currentStart, currentStart + PAGE_LIMIT));
        currentStart += PAGE_LIMIT;
        current_page += 1;
    }
    else if (direction === "previous") {
        populateElement(products.slice(currentStart - 2 * PAGE_LIMIT, PAGE_LIMIT));
        currentStart -= PAGE_LIMIT;
        current_page -= 1;
    }
}
function sort(products, sortBy) {
    switch (sortBy) {
        case "default":
            break;
        case "priceAsc":
            products.sort((a, b) => a.price - b.price);
            break;
        case "priceDes":
            products.sort((a, b) => b.price - a.price);
            break;
        case "popularity":
            products.sort((a, b) => a.popularity - b.popularity);
            break;
        case "rating":
            products.sort((a, b) => a.rating - b.rating);
            break;
    }
    return products;
}
function updateUI(direction) {
    RESULTS.innerHTML = `Showing ${currentStart - PAGE_LIMIT + 1} - ${currentStart > results_total ? results_total : currentStart} Of ${results_total} results `;
    PAGES === null || PAGES === void 0 ? void 0 : PAGES.children[current_page - 1].classList.add("active");
    current_page === 1
        ? (PREVIOUS.style.visibility = "hidden")
        : (PREVIOUS.style.visibility = "visible");
    current_page === pages
        ? (NEXT.style.visibility = "hidden")
        : (NEXT.style.visibility = "visible");
    direction === "next"
        ? PAGES === null || PAGES === void 0 ? void 0 : PAGES.children[current_page - 2].classList.remove("active")
        : PAGES === null || PAGES === void 0 ? void 0 : PAGES.children[current_page].classList.remove("active");
}
function populateElement(data) {
    const element = document.getElementById("Product Catalog");
    while (element === null || element === void 0 ? void 0 : element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
    for (let i = 0; i < data.length; i++) {
        let card = createProductCard(data[i]);
        element === null || element === void 0 ? void 0 : element.appendChild(card);
    }
}
function createProductCard(data) {
    const card = document.createElement("card");
    card.classList.add("product-card");
    const productImage = document.createElement("div");
    productImage.classList.add("product-image");
    if (data.salesStatus) {
        const sale = document.createElement("div");
        sale.classList.add("sale");
        sale.innerHTML = "SALE";
        productImage.appendChild(sale);
    }
    const img = document.createElement("img");
    img.src = data.imageUrl;
    productImage.appendChild(img);
    card.appendChild(productImage);
    const name = document.createElement("p");
    name.innerHTML = data.name;
    card.appendChild(name);
    const price = document.createElement("p");
    price.innerHTML = `$${data.price}`;
    card.appendChild(price);
    const addButton = document.createElement("button");
    addButton.innerHTML = "Add To Cart";
    card.appendChild(addButton);
    return card;
}
