// any jest do zmiany :DD
import { CProduct } from "./classes";

export function createProductCard(product: CProduct): HTMLElement {
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
  addButton.onclick = () => product.add();
  // let updateAmount = updateItemCount(data.id); // inicjalizacja funkcji dla konkretnego id
  //   addButton.onclick = () => {
  //     //  updateAmount();                             // update ilości dla konkretnego id
  //     addProductToCart(product);
  //   };
  card.appendChild(addButton);
  return card;
}

export function createTableHeader() {
  const header = document.createElement("tr");
  header.innerHTML =
    "<th>IMAGE</th><th>PRODUCT NAME</th><th>PRICE</th><th>QUANTITY</th><th>TOTAL</th><th>DELETE</th>";
  return header;
}

export function createTableRow(item: CProduct) {
  let row = document.createElement("tr");

  let img = document.createElement("td");
  img.innerHTML = `<img src="${item.imageUrl}" >`;
  row.appendChild(img);

  let name = document.createElement("td");
  name.innerHTML = item.name;
  row.appendChild(name);

  let price = document.createElement("td");
  price.innerHTML = `$${item.price.toString()}`;
  row.appendChild(price);

  let amount = document.createElement("td");
  amount.appendChild(createAmountChangeDiv(item));
  amount.onclick = () => (total.innerHTML = `$${item.quantity * item.price}`);

  row.appendChild(amount);

  let total = document.createElement("td");
  total.innerHTML = `$${item.quantity * item.price}`;
  row.appendChild(total);

  let remove = document.createElement("td");
  remove.appendChild(createRemoveButton(item, row));
  row.appendChild(remove);

  return row;
}

function createAmountChangeDiv(item: CProduct) {
  let amountChange = document.createElement("div");
  amountChange.classList.add("amountChange");

  let quan = document.createElement("p");
  let sub = document.createElement("button");
  let add = document.createElement("button");
  quan.innerHTML = item.quantity.toString();
  add.innerHTML = "+";
  sub.innerHTML = "-";

  sub.onclick = () => {
    item.subtract();
    item.quantity > 1 && item.quantity--;
    quan.innerHTML = item.quantity.toString();
  };

  add.onclick = () => {
    item.add();
    item.quantity++;
    quan.innerHTML = item.quantity.toString();
  };

  amountChange.appendChild(sub);
  amountChange.appendChild(quan);
  amountChange.appendChild(add);

  return amountChange;
}

function createRemoveButton(item: CProduct, row: HTMLElement) {
  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = `<img src="/public/icons/iconTrash.svg" >`;
  removeBtn.onclick = () => {
    item.remove();
    row.parentNode?.removeChild(row);
  };

  return removeBtn;
}
