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
const RESULTS = document.getElementById("RESULTS");
const COUNT = document.getElementById("itemsInCart");
const SORT = document.getElementById("SORT");
const NEXT = document.getElementById("NEXT");
const PREVIOUS = document.getElementById("PREVIOUS");
const CATALOG = document.getElementById("Product Catalog");
catalog();
function updateCartCounter() {
    let itemsInCart;
    for (let item in localStorage) {
        console.log(item.valueOf());
    }
}
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
function updateItemCount(id) {
    let amount = 1;
    return function () {
        localStorage.setItem(`${id}`, `${amount++}`);
    };
}
function catalog() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield getProducts();
        let page = new PageUI(products, 12);
        page.renderPageNumbers();
        populateElement(CATALOG, page.paginateProducts());
        NEXT.onclick = () => {
            populateElement(CATALOG, page.nextPage());
        };
        PREVIOUS.onclick = () => {
            populateElement(CATALOG, page.previousPage());
        };
        SORT.onclick = () => {
            sort(products, SORT.value);
            page = new PageUI(products, 12);
            populateElement(CATALOG, page.paginateProducts());
        };
    });
}
function populateElement(elementToPopulate, data) {
    const element = elementToPopulate;
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
    let updateAmount = updateItemCount(data.id);
    addButton.onclick = () => {
        updateAmount();
        updateCartCounter();
    };
    card.appendChild(addButton);
    return card;
}
function sort(products, sortBy) {
    switch (sortBy) {
        case "":
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
class Products {
    constructor(products) {
        this._products = products;
    }
    get products() {
        return this._products;
    }
    getProductByName(name) {
        return this._products.find((i) => i.name === name);
    }
    getProductById(id) {
        return this._products.find((i) => i.id === id);
    }
}
class PageUI extends Products {
    constructor(_products, productsPerPage) {
        super(_products);
        this._productsPerPage = productsPerPage;
        this._totalPages = Math.ceil(super.products.length / this._productsPerPage);
        PageUI._pageNumber = 1;
    }
    paginateProducts() {
        this.highlightNavigation();
        let start = (PageUI._pageNumber - 1) * this._productsPerPage;
        let products = super.products;
        if (products.length - start > this._productsPerPage)
            return products.slice(start, start + this._productsPerPage);
        else
            return products.slice(start, products.length);
    }
    nextPage() {
        PageUI._pageNumber++;
        return this.paginateProducts();
    }
    previousPage() {
        PageUI._pageNumber--;
        return this.paginateProducts();
    }
    renderPageNumbers() {
        let pageNumbers = document.getElementById("PAGES");
        for (let i = 1; i <= this._totalPages; i++) {
            let li = document.createElement("li");
            li.innerHTML = i.toString();
            pageNumbers === null || pageNumbers === void 0 ? void 0 : pageNumbers.appendChild(li);
        }
        return pageNumbers;
    }
    highlightNavigation() {
        let pageNumbers = document.getElementById("PAGES");
        for (let i = 0; i < this._totalPages; i++) {
            (pageNumbers === null || pageNumbers === void 0 ? void 0 : pageNumbers.children[i].innerHTML) === PageUI._pageNumber.toString()
                ? pageNumbers === null || pageNumbers === void 0 ? void 0 : pageNumbers.children[i].classList.add("active")
                : pageNumbers === null || pageNumbers === void 0 ? void 0 : pageNumbers.children[i].classList.remove("active");
        }
        let nextButton = document.getElementById("NEXT");
        let previousButton = document.getElementById("PREVIOUS");
        if (PageUI._pageNumber === this._totalPages) {
            nextButton.style = "visibility:hidden";
            previousButton.style = "visibility:visible";
        }
        else if (PageUI._pageNumber === 1) {
            previousButton.style = "visibility:hidden";
            nextButton.style = "visibility:visible";
        }
        else {
            nextButton.style = "visibility:visible";
            previousButton.style = "visibility:visible";
        }
    }
}
