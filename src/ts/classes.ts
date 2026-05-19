import { getItems } from "./functions.js";
//TODO: zrobic tak zeby tworzyl obiekty zaleznie od typu object
//TODO: lepiej zorganizowac ten factory
//TODO: lepiej zorganizowac interfejsy i klasy Product i Item

export class PageUI {
  private _products: CProduct[];
  private _productsPerPage;
  private _totalPages;
  private static _pageNumber: number;

  constructor(_products: CProduct[], productsPerPage: number) {
    this._products = _products;
    this._productsPerPage = productsPerPage;
    this._totalPages = Math.ceil(this._products.length / this._productsPerPage);
    PageUI._pageNumber = 1;
  }

  public paginateProducts(): CProduct[] {
    this.highlightPageNumbers();
    this.togglePageButtons();

    let start = (PageUI._pageNumber - 1) * this._productsPerPage;
    let products = this._products;

    if (products.length - start > this._productsPerPage)
      return products.slice(start, start + this._productsPerPage);
    else return products.slice(start, products.length);
  }

  public nextPage(): CProduct[] {
    PageUI._pageNumber++;
    return this.paginateProducts();
  }

  public previousPage(): CProduct[] {
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
      nextButton.style = "visibility:visible";
      previousButton.style = "visibility:hidden";
    } else {
      nextButton.style = "visibility:visible";
      previousButton.style = "visibility:visible";
    }
  }
}

export class CProduct implements IProduct {
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
  quantity: number;

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
    this.quantity = product.quantity;
  }

  public add(): void {
    let items = getItems() as IProduct[];
    let item = items.find(
      (i) => i.id === this.id && i.color === this.color && i.size === this.size,
    );
    item ? item.quantity++ : items.push(JSON.parse(JSON.stringify(this)));
    localStorage.setItem("productsInCart", JSON.stringify(items));
  }

  public subtract(): void {
    let items = getItems() as IProduct[];
    let item = items.find(
      (i) => i.id === this.id && i.color === this.color && i.size === this.size,
    );
    if (item && item.quantity > 1) item.quantity--;
    localStorage.setItem("productsInCart", JSON.stringify(items));
  }

  public remove() {
    let items = getItems() as IProduct[];
    items = items.filter(
      (i) => i.id !== this.id && i.size !== this.size && i.color !== this.color,
    );
    localStorage.setItem("productsInCart", JSON.stringify(items));
  }
}

interface IProduct {
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
  quantity: number;
}

export type Sort = "" | "priceAsc" | "priceDes" | "popularity" | "rating";
