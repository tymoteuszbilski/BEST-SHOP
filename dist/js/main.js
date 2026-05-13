var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getProductsFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/src/assets/data.json");
        const data = yield response.json();
        const products = data.data;
        return products;
    });
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
    addButton.onclick = () => product.addToCart();
    // let updateAmount = updateItemCount(data.id); // inicjalizacja funkcji dla konkretnego id
    //   addButton.onclick = () => {
    //     //  updateAmount();                             // update ilości dla konkretnego id
    //     addProductToCart(product);
    //   };
    card.appendChild(addButton);
    return card;
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
export class CProduct {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.imageUrl = product.imageUrl;
        this.category = product.category;
        this.color = product.color;
        this.size = product.size;
        this.salesStatus = product.salesStatus;
        this.rating = product.rating;
        this.popularity = product.popularity;
        this.blocks = product.blocks;
    }
    addToCart() {
        let items = getCartContents();
        let item = items.find((i) => i.id === this.id &&
            i.name === this.name &&
            i.color === this.color &&
            i.size === this.size);
        item ? item.quantity++ : items.push(new ItemInCart(this.toJSON()));
        localStorage.setItem("productsInCart", JSON.stringify(items));
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            imageUrl: this.imageUrl,
            price: this.price,
            color: this.color,
            size: this.size,
            quantity: 1,
        };
    }
}
export class ItemInCart {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.price = item.price;
        this.imageUrl = item.imageUrl;
        this.color = item.color;
        this.size = item.size;
        this.quantity = item.quantity;
    }
    get total() {
        return this.quantity * this.price;
    }
    add() {
        let items = getCartContents();
        let item = items.find((i) => i.id === this.id &&
            i.name === this.name &&
            i.color === this.color &&
            i.size === this.size);
        item && item.quantity++;
        localStorage.setItem("productsInCart", JSON.stringify(items));
    }
    subtract() {
        let items = getCartContents();
        let item = items.find((i) => i.id === this.id &&
            i.name === this.name &&
            i.color === this.color &&
            i.size === this.size);
        if (item && item.quantity > 1)
            item.quantity--;
        localStorage.setItem("productsInCart", JSON.stringify(items));
    }
    remove() {
        let items = getCartContents();
        items = items.filter((i) => i.id !== this.id &&
            i.name !== this.name &&
            i.size !== this.size &&
            i.color !== this.color);
        console.log(items);
        localStorage.setItem("productsInCart", JSON.stringify(items));
    }
}
function getCartContents() {
    let items;
    let products = localStorage.getItem("productsInCart");
    products === null ? (items = []) : (items = JSON.parse(products));
    return items;
}
