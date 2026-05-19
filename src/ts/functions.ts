import { CProduct, Sort } from "./classes.js";

export async function getProductsFromDB() {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  const products = data.data;

  return products;
}

export function getItems() {
  let items;
  let products = localStorage.getItem("productsInCart") as string;
  products === null ? (items = []) : (items = JSON.parse(products));
  return items;
}

export function sort(products: CProduct[], sortBy: Sort): CProduct[] {
  switch (sortBy) {
    case "":
      break;
    case "priceAsc":
      products.sort((a: CProduct, b: CProduct) => a.price - b.price);
      break;
    case "priceDes":
      products.sort((a: CProduct, b: CProduct) => b.price - a.price);
      break;
    case "popularity":
      products.sort((a: CProduct, b: CProduct) => a.popularity - b.popularity);
      break;
    case "rating":
      products.sort((a: CProduct, b: CProduct) => a.rating - b.rating);
      break;
  }
  return products;
}

export function populateElement(
  elementToPopulate: HTMLElement,
  instances: CProduct[],
  createChild: (i: CProduct) => HTMLElement,
) {
  const element = elementToPopulate;
  while (element?.hasChildNodes()) {
    element.removeChild(element.firstChild as ChildNode);
  }

  instances.forEach((instance) => {
    let child = createChild(new CProduct(instance));
    element?.appendChild(child);
    console.log(typeof instance);
  });
}
