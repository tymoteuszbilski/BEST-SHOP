import { getProducts, populateElement, Product } from "./main.js";
const RESULTS = document.getElementById("RESULTS") as HTMLParagraphElement;
const SORT = document.getElementById("SORT") as HTMLSelectElement;
const NEXT = document.getElementById("NEXT") as HTMLButtonElement;
const PREVIOUS = document.getElementById("PREVIOUS") as HTMLButtonElement;
const CATALOG = document.getElementById("Product Catalog") as HTMLElement;
catalog();

// funkcja inicjowana dla konkretnego id i licząca od 1 dla tego id
// function updateItemCount(id: string) {
//   let amount = 1;
//   return function () {
//     localStorage.setItem(`${id}`, `${amount++}`);
//   };
// }

async function catalog() {
  const products = await getProducts();
  let page = new PageUI(products, 12);
  page.renderPageNumbers();
  populateElement(CATALOG, page.paginateProducts());

  NEXT.onclick = () => {
    populateElement(CATALOG, page.nextPage());
  };
  PREVIOUS.onclick = () => {
    populateElement(CATALOG, page.previousPage());
  };
  SORT.onclick = () => {
    sort(products, SORT.value as Sort);
    page = new PageUI(products, 12);
    populateElement(CATALOG, page.paginateProducts());
  };
}

function sort(products: Product[], sortBy: Sort): Product[] {
  switch (sortBy) {
    case "":
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
type Sort = "" | "priceAsc" | "priceDes" | "popularity" | "rating";

class Products {
  private _products: Product[];

  constructor(products: Product[]) {
    this._products = products;
  }

  public get products() {
    return this._products;
  }

  public getProductByName(name: string) {
    return this._products.find((i: Product) => i.name === name);
  }

  public getProductById(id: string) {
    return this._products.find((i: Product) => i.id === id);
  }
}
//TODO: zrobić ten katalog ładniejszym i czytelniejszym
class PageUI extends Products {
  private _productsPerPage;
  private _totalPages;
  private static _pageNumber: number;

  constructor(_products: Product[], productsPerPage: number) {
    super(_products);
    this._productsPerPage = productsPerPage;
    this._totalPages = Math.ceil(super.products.length / this._productsPerPage);
    PageUI._pageNumber = 1;
  }

  public paginateProducts() {
    this.highlightPageNumbers();
    this.togglePageButtons();

    let start = (PageUI._pageNumber - 1) * this._productsPerPage;
    let products = super.products;

    if (products.length - start > this._productsPerPage)
      return products.slice(start, start + this._productsPerPage);
    else return products.slice(start, products.length);
  }

  public nextPage(): Product[] {
    PageUI._pageNumber++;
    return this.paginateProducts();
  }

  public previousPage(): Product[] {
    PageUI._pageNumber--;
    return this.paginateProducts();
  }

  public renderPageNumbers() {
    let pageNumbers = document.getElementById("PAGES");

    for (let i = 1; i <= this._totalPages; i++) {
      let li = document.createElement("li");
      li.innerHTML = i.toString();
      pageNumbers?.appendChild(li);
    }

    return pageNumbers;
  }

  private highlightPageNumbers() {
    let pageNumbers = document.getElementById("PAGES");
    for (let i = 0; i < this._totalPages; i++) {
      pageNumbers?.children[i].innerHTML === PageUI._pageNumber.toString()
        ? pageNumbers?.children[i].classList.add("active")
        : pageNumbers?.children[i].classList.remove("active");
    }
  }

  private togglePageButtons() {
    let nextButton = document.getElementById("NEXT") as HTMLButtonElement;
    let previousButton = document.getElementById(
      "PREVIOUS",
    ) as HTMLButtonElement;
    if (PageUI._pageNumber === this._totalPages) {
      nextButton.style = "visibility:hidden";
      previousButton.style = "visibility:visible";
    } else if (PageUI._pageNumber === 1) {
      previousButton.style = "visibility:hidden";
      nextButton.style = "visibility:visible";
    } else {
      nextButton.style = "visibility:visible";
      previousButton.style = "visibility:visible";
    }
  }
}
