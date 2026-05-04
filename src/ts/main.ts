async function getProducts() {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  const products = data.data;

  return products;
}

function getProductsForBlock(blockName: string) {
  getProducts().then((products) =>
    products.filter((item: Product) =>
      item.blocks.some((block) => block === blockName),
    ),
  );
}

export function displayProducts(id: string) {
  getProducts().then((data) => populateElement(data, id));
}

function populateElement(data: Product[], id: string) {
  const element = document.getElementById(id);
  for (let i = 0; i < data.length; i++) {
    let card = createProductCard(data[i]);
    element?.appendChild(card);
  }
}

function createProductCard(data: Product) {
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
