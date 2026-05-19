import { getItems, populateElement } from "./functions.js";
import { createTableHeader, createTableRow } from "./htmlElements.js";
const summary = document.querySelector(".summary");
const clearButton = document.getElementById("Clear");
getItems().length === 0 ? renderEmptyCart() : renderTable();
function renderTable() {
    const table = document.getElementById("cart-table");
    populateElement(table, getItems(), createTableRow);
    table.prepend(createTableHeader());
}
function renderEmptyCart() {
    const para = document.createElement("p");
    para.innerHTML = "Your cart is empty";
    summary.appendChild(para);
}
clearButton.onclick = () => {
    localStorage.removeItem("productsInCart");
    summary.removeChild(summary.firstChild);
    renderEmptyCart();
};
