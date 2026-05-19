import { getItems, populateElement } from "./functions.js";
import { CProduct } from "./classes.js";
import { createTableHeader, createTableRow } from "./htmlElements.js";
const summary = document.querySelector(".summary") as HTMLElement;
const clearButton = document.getElementById("Clear") as HTMLButtonElement;

getItems().length === 0 ? renderEmptyCart() : renderTable();

function renderTable() {
  const table = document.getElementById("cart-table") as HTMLTableElement;
  populateElement(table, getItems() as CProduct[], createTableRow);
  table.prepend(createTableHeader());
}

function renderEmptyCart() {
  const para = document.createElement("p");
  para.innerHTML = "Your cart is empty";
  summary.appendChild(para);
}

clearButton.onclick = () => {
  localStorage.removeItem("productsInCart");
  summary.removeChild(summary.firstChild as ChildNode);
  renderEmptyCart();
};
