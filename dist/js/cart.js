import { ItemInCart } from "./main.js";
//import { createTableRow } from "./htmlElements.js";
// TODO ogarnąć export{} na końcu pliku js
function createTableRow(item) {
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
        total.innerHTML = `$${item.quantity * item.price}`;
    };
    add.onclick = () => {
        item.add();
        item.quantity++;
        quan.innerHTML = item.quantity.toString();
        total.innerHTML = `$${item.quantity * item.price}`;
    };
    amountChange.appendChild(sub);
    amountChange.appendChild(quan);
    amountChange.appendChild(add);
    amount.appendChild(amountChange);
    row.appendChild(amount);
    let total = document.createElement("td");
    total.innerHTML = `$${item.quantity * item.price}`;
    row.appendChild(total);
    let remove = document.createElement("td");
    let removeBtn = document.createElement("button");
    removeBtn.innerHTML = `<img src="/public/icons/iconTrash.svg" >`;
    remove.appendChild(removeBtn);
    row.appendChild(remove);
    removeBtn.onclick = () => {
        var _a;
        item.remove();
        (_a = row.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(row);
    };
    return row;
}
function renderTable() {
    const table = document.getElementById("Cart Table");
    let items = getCartContents();
    items.forEach((item) => {
        let row = createTableRow(new ItemInCart(item));
        table.appendChild(row);
    });
    return table;
}
function getCartContents() {
    let items;
    let products = localStorage.getItem("productsInCart");
    products === null ? (items = []) : (items = JSON.parse(products));
    return items;
}
renderTable();
