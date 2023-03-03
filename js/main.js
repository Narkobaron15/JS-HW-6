const tableManager = new Manipulator('data');

const printError = (msg = '') => fields.errorField.innerHTML = msg;

const buttons = {
    clearBtn: document.getElementById('clearBtn'),
    confirmButton: document.getElementById('confirmButton'),
};
const fields = {
    nameField: document.getElementById('productName'),
    priceField: document.getElementById('productPrice'),
    typeField: document.getElementById('productType'),
    qtyField: document.getElementById('productQty'),
    dateField: document.getElementById('productDate'),
    descField: document.getElementById('productDescription'),
    errorField: document.getElementById('ErrorCaption'),
    searchField: document.getElementById('searchInput'),
};

let product = new Product();

buttons.clearBtn.onclick = () => {
    searchField.value = '';
};
buttons.confirmButton.onclick = () => {
    try {
        tableManager.Insert(product);
        product = new();
    } catch (error) {
        printError(error.message);
    }
};
fields.searchField.oninput = () => {
    tableManager.findAndPublish(fields.searchField.value);
};

fields.nameField.oninput =
    fields.priceField.oninput =
    fields.typeField.oninput =
    fields.qtyField.oninput =
    fields.dateField.oninput =
    fields.descField.oninput = () => {
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
        catch(error) {
            buttons.confirmButton.disabled = true;
        }
    };