const product = new Product();

const dropdown = document.getElementById('typeDropdown');
const tableManager = new Manipulator('data', dropdown.id);
const hints = document.getElementById('searchHints');

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
};
const fieldOninput = () => {
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
buttons.clearBtn.onclick = () => {
    specialFields.searchField.value = '';
    specialFields.searchField.oninput();
};
buttons.confirmButton.onclick = () => {
    try {
        tableManager.Insert(product);
        iterateFields(fields, field => field.value = '');
        fieldOninput();
    } catch (error) {
        printError(error.message);
    }
};
specialFields.searchField.oninput = () => {
    const val = specialFields.searchField.value;
    const published = tableManager.findAndPublish(val);
    let hintsarr = [];

    if (published !== null) {
        for (const prod of published) {
            const props = [
                prod.name, prod.price.toString(), prod.type,
                prod.quantity.toString(), prod.date.toLocaleDateString(), prod.description
            ];
            for (const prop of props) {
                if (prop.trim().toLowerCase().includes(val.trim().toLowerCase())) {
                    hintsarr.push(prop);
                }
            }
        }
    }

    hints.innerHTML = '';
    hintsarr = hintsarr.filter(Manipulator.uniqueFilter)
        .filter(x => x.trim().toLowerCase() !== val.trim().toLowerCase());
    if (hintsarr?.length === 1) return;
    hintsarr.forEach(x => hints.innerHTML += `<option value="${x}">`);
};
resetBtn.onclick = () => {
    dropdown.value = 'All';
    dropdown.onchange();
};
dropdown.onchange = () => {
    tableManager.SelectCategory(dropdown.value);
};

tableManager.Insert(new Product('Product 1', 334, 'Cat 2', 1, '1/2/2023', 'Iste eius dolorum, commodi sequi architecto dicta natus'));
tableManager.Insert(new Product('Product 2', 334, 'Cat 1', 4));
tableManager.Insert(new Product('Product 3', 334, 'Cat 1', 5));