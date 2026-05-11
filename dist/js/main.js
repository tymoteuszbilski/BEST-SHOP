var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/src/assets/data.json");
        const data = yield response.json();
        const products = data.data;
        return products;
    });
}
export function populateElement(elementToPopulate, products) {
    const element = elementToPopulate;
    while (element === null || element === void 0 ? void 0 : element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
    for (let i = 0; i < products.length; i++) {
        let card = createProductCard(products[i]);
        element === null || element === void 0 ? void 0 : element.appendChild(card);
    }
}
function createProductCard(product) {
    const card = document.createElement("card");
    card.classList.add("product-card");
    const productImage = document.createElement("div");
    productImage.classList.add("product-image");
    if (product.salesStatus) {
        const sale = document.createElement("div");
        sale.classList.add("sale");
        sale.innerHTML = "SALE";
        productImage.appendChild(sale);
    }
    const img = document.createElement("img");
    img.src = product.imageUrl;
    productImage.appendChild(img);
    card.appendChild(productImage);
    const name = document.createElement("p");
    name.innerHTML = product.name;
    card.appendChild(name);
    const price = document.createElement("p");
    price.innerHTML = `$${product.price}`;
    card.appendChild(price);
    const addButton = document.createElement("button");
    addButton.innerHTML = "Add To Cart";
    // let updateAmount = updateItemCount(data.id); // inicjalizacja funkcji dla konkretnego id
    addButton.onclick = () => {
        //  updateAmount();                             // update ilości dla konkretnego id
        addProductToCart(product);
    };
    card.appendChild(addButton);
    return card;
}
function addProductToCart(product) {
    let productArray;
    if (localStorage.getItem("productsInCart") === null) {
        productArray = [];
    }
    else {
        let storedProducts = localStorage.getItem("productsInCart");
        productArray = JSON.parse(storedProducts);
    }
    productArray.push(product);
    localStorage.setItem("productsInCart", JSON.stringify(productArray));
    updateCart(productArray.length);
}
function updateCart(amount) {
    const badge = document.getElementById("BADGE");
    badge.innerHTML = amount.toString();
}
