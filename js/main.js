const tableManager = new Manipulator('data');

const buttons = {
    clearBtn: document.getElementById('clearBtn'),
    confirmButton: document.getElementById('confirmButton'),
}
const fields = {
    nameField: document.getElementById('productName'),
    priceField: document.getElementById('productPrice'),
    typeField: document.getElementById('productType'),
    quantityField: document.getElementById('productQty'),
    dateField: document.getElementById('productDate'),
    descriptionField: document.getElementById('productDescription'),
    errorField: document.getElementById('ErrorCaption'),
    searchField: document.getElementById('searchInput'),
};


buttons.clearBtn.onclick = () => {
    searchField.value = '';
};
fields.searchField.oninput = () => {
    tableManager.findAndPublish(fields.searchField.value);
}