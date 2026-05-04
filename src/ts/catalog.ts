const PAGE_LIMIT = 12;
let currentStart = 0;
let results_total = 0;
let pages = 0;
let current_page = 0;
initialization();

const PAGES = document.getElementById("PAGES");
const RESULTS = document.getElementById("RESULTS") as HTMLParagraphElement;
const SORT = document.getElementById("SORT") as HTMLSelectElement;
SORT.addEventListener("change", (e: Event) => {
  currentStart = 0;
  current_page = 0;
  console.log(SORT.value);
  displayProducts("next", (e.target as HTMLOptionElement).value as Sort);
});

const NEXT = document.getElementById("NEXT") as HTMLButtonElement;
NEXT.addEventListener("click", () => displayProducts("next"));

const PREVIOUS = document.getElementById("PREVIOUS") as HTMLButtonElement;
PREVIOUS.addEventListener("click", () => displayProducts("previous"));

function filterProducts(products: Product[], filters: Filter = filtersObject) {
  return products.filter((product: Product) =>
    filters.size === ""
      ? true
      : product.size === filters.size && filters.color === ""
        ? true
        : product.color === filters.color && filters.category === ""
          ? true
          : product.category === filters.category &&
              filters.salesStatus === false
            ? true
            : product.salesStatus === filters.salesStatus,
  );
}
const filtersObject = { size: "", color: "", category: "", salesStatus: false };

async function getProducts() {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  const products = data.data;

  return products;
}

async function initialization() {
  const products = await getProducts();
  results_total = products.length;
  pages = Math.ceil(results_total / PAGE_LIMIT);

  for (let i = 1; i <= pages; i++) {
    const LI = document.createElement("li");
    LI.innerHTML = `${i}`;
    PAGES?.appendChild(LI);
  }

  displayProducts("next");
}

async function displayProducts(direction: Direction, sortBy: Sort = "default") {
  const products = await getProducts();
  pagination(sort(products, sortBy), direction);
  updateUI(direction);
}

function pagination(products: Product[], direction: Direction) {
  if (direction === "next") {
    currentStart + PAGE_LIMIT > products.length
      ? populateElement(products.slice(currentStart, products.length))
      : populateElement(
          products.slice(currentStart, currentStart + PAGE_LIMIT),
        );
    currentStart += PAGE_LIMIT;
    current_page += 1;
  } else if (direction === "previous") {
    populateElement(products.slice(currentStart - 2 * PAGE_LIMIT, PAGE_LIMIT));
    currentStart -= PAGE_LIMIT;
    current_page -= 1;
  }
}

function sort(products: Product[], sortBy: Sort) {
  switch (sortBy) {
    case "default":
      break;
    case "priceAsc":
      products.sort((a: Product, b: Product) => a.price - b.price);
      break;
    case "priceDes":
      products.sort((a: Product, b: Product) => b.price - a.price);
      break;
    case "popularity":
      products.sort((a: Product, b: Product) => a.popularity - b.popularity);
      break;
    case "rating":
      products.sort((a: Product, b: Product) => a.rating - b.rating);
      break;
  }
  return products;
}

function updateUI(direction: Direction) {
  RESULTS.innerHTML = `Showing ${currentStart - PAGE_LIMIT + 1} - ${currentStart > results_total ? results_total : currentStart} Of ${results_total} results `;
  PAGES?.children[current_page - 1].classList.add("active");

  current_page === 1
    ? (PREVIOUS.style.visibility = "hidden")
    : (PREVIOUS.style.visibility = "visible");
  current_page === pages
    ? (NEXT.style.visibility = "hidden")
    : (NEXT.style.visibility = "visible");

  direction === "next"
    ? PAGES?.children[current_page - 2].classList.remove("active")
    : PAGES?.children[current_page].classList.remove("active");
}

function populateElement(data: Product[]) {
  const element = document.getElementById("Product Catalog");
  while (element?.hasChildNodes()) {
    element.removeChild(element.firstChild as ChildNode);
  }
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

type Sort = "default" | "priceAsc" | "priceDes" | "popularity" | "rating";
type Direction = "next" | "previous";
interface Product {
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
interface Filter {
  size: string;
  color: string;
  category: string;
  salesStatus: boolean;
}
