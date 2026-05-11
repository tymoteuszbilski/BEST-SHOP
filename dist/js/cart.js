// TODO ogarnąć export{} na końcu pliku js
function getProductsFromLocalStorage() {
    let products;
    if (localStorage.getItem("productsInCart") === null) {
        products = [];
    }
    else {
        let storedProducts = localStorage.getItem("productsInCart");
        products = JSON.parse(storedProducts);
    }
    return products;
}
function count() {
    const unique = getUniqueProducts();
    const all = getProductsFromLocalStorage();
    let amounts = new Array(unique.length);
    amounts.fill(0);
    for (let i = 0; i < unique.length; i++) {
        for (let j = 0; j < all.length; j++) {
            if (unique[i].id === all[j].id &&
                unique[i].color === all[j].color &&
                unique[i].size === all[j].size &&
                unique[i].name === all[j].name) {
                amounts[i]++;
            }
        }
    }
    return amounts;
}
function getUniqueProducts() {
    let products = getProductsFromLocalStorage();
    let productsStrings = [];
    for (let i = 0; i < products.length; i++) {
        productsStrings.push(JSON.stringify(products[i]));
    }
    let uniqueStrings = productsStrings.filter((product, index, products) => products.indexOf(product) === index);
    let uniqueProducts = [];
    for (let i = 0; i < uniqueStrings.length; i++) {
        uniqueProducts.push(JSON.parse(uniqueStrings[i]));
    }
    return uniqueProducts;
}
populateTable();
function populateTable() {
    const table = document.getElementById("Cart Table");
    // while (table?.hasChildNodes()) {
    //   table.removeChild(table.firstChild as ChildNode);
    // }
    const amount = count();
    let products = getUniqueProducts();
    for (let i = 0; i < products.length; i++) {
        let row = createTableRow(products[i], amount[i]);
        table === null || table === void 0 ? void 0 : table.appendChild(row);
    }
}
function createTableRow(product, amount) {
    let row = document.createElement("tr");
    let img = document.createElement("td");
    img.innerHTML = `<img src="${product.imageUrl}" >`;
    row.appendChild(img);
    let name = document.createElement("td");
    name.innerHTML = product.name;
    row.appendChild(name);
    let price = document.createElement("td");
    price.innerHTML = `$${product.price.toString()}`;
    row.appendChild(price);
    let amountE = document.createElement("td");
    amountE.innerHTML = `${amount.toString()}`;
    row.appendChild(amountE);
    let total = document.createElement("td");
    total.innerHTML = `$${(amount * product.price).toString()}`;
    row.appendChild(total);
    let remove = document.createElement("td");
    remove.innerHTML = `<img src="/public/icons/iconTrash.svg" >`;
    row.appendChild(remove);
    return row;
}
export {};
