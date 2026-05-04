var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/src/assets/data.json");
        const data = yield response.json();
        const products = data.data;
        return products;
    });
}
function getProductsForBlock(blockName) {
    getProducts().then((products) => products.filter((item) => item.blocks.some((block) => block === blockName)));
}
export function displayProducts(id) {
    getProducts().then((data) => populateElement(data, id));
}
function populateElement(data, id) {
    const element = document.getElementById(id);
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
