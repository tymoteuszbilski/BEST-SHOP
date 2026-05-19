var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CProduct } from "./classes.js";
import { createProductCard } from "./htmlElements.js";
export function getProductsFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/src/assets/data.json");
        const data = yield response.json();
        const products = data.data;
        return products;
    });
}
export function getItems() {
    let items;
    let products = localStorage.getItem("productsInCart");
    products === null ? (items = []) : (items = JSON.parse(products));
    return items;
}
export function populateElement(elementToPopulate, products) {
    const element = elementToPopulate;
    while (element === null || element === void 0 ? void 0 : element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
    for (let i = 0; i < products.length; i++) {
        let product = new CProduct(products[i]);
        let card = createProductCard(product);
        element === null || element === void 0 ? void 0 : element.appendChild(card);
    }
}
function updateCart(amount) {
    const badge = document.getElementById("BADGE");
    badge.innerHTML = amount.toString();
}
