export async function getProducts(): Promise<Product[]> {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  const products = data.data;

  return products;
}

export function populateElement(
  elementToPopulate: HTMLElement,
  products: Product[],
) {
  const element = elementToPopulate;
  while (element?.hasChildNodes()) {
    element.removeChild(element.firstChild as ChildNode);
  }

  for (let i = 0; i < products.length; i++) {
    let card = createProductCard(products[i]);
    element?.appendChild(card);
  }
}

function createProductCard(product: Product): HTMLElement {
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

function addProductToCart(product: Product) {
  let productArray;

  if (localStorage.getItem("productsInCart") === null) {
    productArray = [];
  } else {
    let storedProducts = localStorage.getItem("productsInCart") as string;
    productArray = JSON.parse(storedProducts);
  }
  productArray.push(product);
  localStorage.setItem("productsInCart", JSON.stringify(productArray));

  updateCart(productArray.length);
}

function updateCart(amount: number) {
  const badge = document.getElementById("BADGE") as HTMLDivElement;
  badge.innerHTML = amount.toString();
}

export interface Product {
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
