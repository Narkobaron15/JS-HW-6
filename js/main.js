const dropdown = document.getElementById('typeDropdown');
const tableManager = new Manipulator('data', dropdown.id);
let product = new Product();

const buttons = {
    clearBtn: document.getElementById('clearBtn'),
    confirmButton: document.getElementById('confirmButton'),
    resetBtn: document.getElementById('resetBtn'),
};
const fields = {
    nameField: document.getElementById('productName'),
    priceField: document.getElementById('productPrice'),
    typeField: document.getElementById('productType'),
    qtyField: document.getElementById('productQty'),
    dateField: document.getElementById('productDate'),
    descField: document.getElementById('productDescription'),
};
const specialFields = {
    errorField: document.getElementById('ErrorCaption'),
    searchField: document.getElementById('searchInput'),
};

const printError = (msg = '') => specialFields.errorField.innerHTML = msg;
const iterateFields = (fields, fn) => {
    for (const key in fields) {
        fn(fields[key]);
    }
}

buttons.clearBtn.onclick = () => {
    specialFields.searchField.value = '';
};
buttons.confirmButton.onclick = () => {
    try {
        tableManager.Insert(product);
        iterateFields(fields, field => field.value = '');
    } catch (error) {
        printError(error.message);
    }
};
specialFields.searchField.oninput = () => {
    tableManager.findAndPublish(specialFields.searchField.value);
};
dropdown.onchange = () => {
    tableManager.SelectCategory(dropdown.value);
}

let fieldOninput = () => {
    printError();
    try {
        product.name = fields.nameField.value;
        product.price = parseFloat(fields.priceField.value);
        product.type = fields.typeField.value;
        product.quantity = parseInt(fields.qtyField.value);
        product.date = fields.dateField.value;
        product.description = fields.descField.value;

        buttons.confirmButton.disabled = false;
    }
    catch (error) {
        buttons.confirmButton.disabled = true;
    }
};
iterateFields(fields, field => field.oninput = fieldOninput);