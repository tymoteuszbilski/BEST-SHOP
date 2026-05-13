// any jest do zmiany :DD
export function createProductCard(product: any): HTMLElement {
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
  //   addButton.onclick = () => {
  //     //  updateAmount();                             // update ilości dla konkretnego id
  //     addProductToCart(product);
  //   };
  card.appendChild(addButton);

  return card;
}

export function createTableRow(item: any) {
  let row = document.createElement("tr");
  row.setAttribute("id", `${item.id + item.color + item.size}`);

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

  let amountChange = document.createElement("div");
  amountChange.classList.add("amountChange");
  amount.appendChild(amountChange);

  let sub = document.createElement("button");
  sub.onclick = item.subtract;
  amountChange.appendChild(sub);

  let quan = document.createElement("p");
  quan.innerHTML = item.quantity.toString();
  amountChange.appendChild(quan);

  let add = document.createElement("button");
  add.onclick = item.add;
  amountChange.appendChild(add);

  row.appendChild(amount);

  let total = document.createElement("td");
  total.innerHTML = `$${item.total.toString()}`;
  row.appendChild(total);

  let remove = document.createElement("td");
  remove.innerHTML = `<img src="/public/icons/iconTrash.svg" >`;
  row.appendChild(remove);

  return row;
}
