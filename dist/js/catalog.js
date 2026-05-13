var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProductsFromDB, populateElement } from "./main.js";
const RESULTS = document.getElementById("RESULTS");
const SORT = document.getElementById("SORT");
const NEXT = document.getElementById("NEXT");
const PREVIOUS = document.getElementById("PREVIOUS");
const CATALOG = document.getElementById("Product Catalog");
catalog();
// funkcja inicjowana dla konkretnego id i licząca od 1 dla tego id
// function updateItemCount(id: string) {
//   let amount = 1;
//   return function () {
//     localStorage.setItem(`${id}`, `${amount++}`);
//   };
// }
function catalog() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield getProductsFromDB();
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
//TODO: zrobić ten katalog ładniejszym i czytelniejszym
class PageUI extends Products {
    constructor(_products, productsPerPage) {
        super(_products);
        this._productsPerPage = productsPerPage;
        this._totalPages = Math.ceil(super.products.length / this._productsPerPage);
        PageUI._pageNumber = 1;
    }
    paginateProducts() {
        this.highlightPageNumbers();
        this.togglePageButtons();
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
    highlightPageNumbers() {
        let pageNumbers = document.getElementById("PAGES");
        for (let i = 0; i < this._totalPages; i++) {
            (pageNumbers === null || pageNumbers === void 0 ? void 0 : pageNumbers.children[i].innerHTML) === PageUI._pageNumber.toString()
                ? pageNumbers === null || pageNumbers === void 0 ? void 0 : pageNumbers.children[i].classList.add("active")
                : pageNumbers === null || pageNumbers === void 0 ? void 0 : pageNumbers.children[i].classList.remove("active");
        }
    }
    togglePageButtons() {
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
