export async function getProductsFromDB() {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  const products = data.data;

  return products;
}
function createProductCard(product: CProduct): HTMLElement {
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

export function populateElement(
  elementToPopulate: HTMLElement,
  products: IProduct[],
) {
  const element = elementToPopulate;
  while (element?.hasChildNodes()) {
    element.removeChild(element.firstChild as ChildNode);
  }

  for (let i = 0; i < products.length; i++) {
    let product = new CProduct(products[i]);
    let card = createProductCard(product);
    element?.appendChild(card);
  }
}

function updateCart(amount: number) {
  const badge = document.getElementById("BADGE") as HTMLDivElement;
  badge.innerHTML = amount.toString();
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  color: string;
  size: string;
  salesStatus: boolean;
  rating: number;
  popularity: number;
  blocks: string[];
}

export class CProduct implements IProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly category: string;
  color: string;
  size: string;
  readonly salesStatus: boolean;
  readonly rating: number;
  readonly popularity: number;
  readonly blocks: string[];
  constructor(product: IProduct) {
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

  public addToCart(): void {
    let items = getCartContents();
    let item = items.find(
      (i) =>
        i.id === this.id &&
        i.name === this.name &&
        i.color === this.color &&
        i.size === this.size,
    );
    item ? item.quantity++ : items.push(new ItemInCart(this.toJSON()));
    localStorage.setItem("productsInCart", JSON.stringify(items));
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      imageUrl: this.imageUrl,
      price: this.price,
      color: this.color,
      size: this.size,
      quantity: 1,
    } as ItemInCart;
  }
}

export class ItemInCart {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly imageUrl: string;
  color: string;
  size: string;
  quantity: number;
  constructor(item: ItemInCart) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.imageUrl = item.imageUrl;
    this.color = item.color;
    this.size = item.size;
    this.quantity = item.quantity;
  }
  public get total() {
    return this.quantity * this.price;
  }

  public add(): void {
    let items = getCartContents();
    let item = items.find(
      (i) =>
        i.id === this.id &&
        i.name === this.name &&
        i.color === this.color &&
        i.size === this.size,
    );
    item && item.quantity++;
    localStorage.setItem("productsInCart", JSON.stringify(items));
  }

  public subtract(): void {
    let items = getCartContents();
    let item = items.find(
      (i) =>
        i.id === this.id &&
        i.name === this.name &&
        i.color === this.color &&
        i.size === this.size,
    );
    if (item && item.quantity > 1) item.quantity--;
    localStorage.setItem("productsInCart", JSON.stringify(items));
  }

  public remove() {
    let items = getCartContents();
    items = items.filter(
      (i) =>
        i.id !== this.id &&
        i.name !== this.name &&
        i.size !== this.size &&
        i.color !== this.color,
    );
    console.log(items);
    localStorage.setItem("productsInCart", JSON.stringify(items));
  }
}

function getCartContents() {
  let items: ItemInCart[];
  let products = localStorage.getItem("productsInCart") as string;
  products === null ? (items = []) : (items = JSON.parse(products));
  return items;
}
