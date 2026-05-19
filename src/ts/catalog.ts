import { getProductsFromDB, populateElement, sort } from "./functions.js";
import { Sort, PageUI } from "./classes.js";
import { createProductCard } from "./htmlElements.js";
const RESULTS = document.getElementById("RESULTS") as HTMLParagraphElement;
const SORT = document.getElementById("SORT") as HTMLSelectElement;
const NEXT = document.getElementById("NEXT") as HTMLButtonElement;
const PREVIOUS = document.getElementById("PREVIOUS") as HTMLButtonElement;
const CATALOG = document.getElementById("Product Catalog") as HTMLElement;

catalog();

async function catalog() {
  const products = await getProductsFromDB();
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
    sort(products, SORT.value as Sort);
    page = new PageUI(products, 12);
    populateElement(CATALOG, page.paginateProducts(), createProductCard);
  };
}

//TODO: zrobić ten katalog ładniejszym i czytelniejszym

// funkcja inicjowana dla konkretnego id i licząca od 1 dla tego id
// function updateItemCount(id: string) {
//   let amount = 1;
//   return function () {
//     localStorage.setItem(`${id}`, `${amount++}`);
//   };
// }
