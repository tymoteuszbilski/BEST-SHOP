var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProductsFromDB, populateElement, sort } from "./functions.js";
import { PageUI } from "./classes.js";
import { createProductCard } from "./htmlElements.js";
const RESULTS = document.getElementById("RESULTS");
const SORT = document.getElementById("SORT");
const NEXT = document.getElementById("NEXT");
const PREVIOUS = document.getElementById("PREVIOUS");
const CATALOG = document.getElementById("Product Catalog");
catalog();
function catalog() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield getProductsFromDB();
        let page = new PageUI(products, 12);
        page.renderPageNumbers();
        populateElement(CATALOG, page.paginateProducts(), createProductCard);
        NEXT.onclick = () => {
            populateElement(CATALOG, page.nextPage(), createProductCard);
        };
        PREVIOUS.onclick = () => {
            populateElement(CATALOG, page.previousPage(), createProductCard);
        };
        SORT.onclick = () => {
            sort(products, SORT.value);
            page = new PageUI(products, 12);
            populateElement(CATALOG, page.paginateProducts(), createProductCard);
        };
    });
}
//TODO: zrobić ten katalog ładniejszym i czytelniejszym
// funkcja inicjowana dla konkretnego id i licząca od 1 dla tego id
// function updateItemCount(id: string) {
//   let amount = 1;
//   return function () {
//     localStorage.setItem(`${id}`, `${amount++}`);
//   };
// }
