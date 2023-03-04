class Manipulator {
    static #empty = '<tr><td colspan="8" class="text-center">Empty...</td></tr>';
    static #count = 0;

    #tableId;
    #products;

    constructor(tableId) {
        if (typeof tableId !== 'string') {
            throw new Error('Value of tableId is unacceptable.');
        }
        this.#tableId = tableId;
        this.#products = [];

        this.#Empty();
    }

    get #table() {
        return document.getElementById(this.#tableId);
    }

    get #tablerows() {
        return Array.from(this.#table.rows);
    }

    get products() {
        return this.#products;
    }

    Insert(product) {
        if (!(product instanceof Product)) {
            throw new Error("Product must be an instance of the Product class");
        }

        if (this.#products.length === 0) {
            this.#table.innerHTML = '';
        }

        product = product.clone();

        this.#products.push(product);
        product.id = ++Manipulator.#count;
        this.#VisualInsertion(product)
    }

    Delete(id) {
        const rowID = this.#tablerows.findIndex(row => row.cells[0].innerHTML === id.toString());

        this.#table.deleteRow(rowID);
        this.#products.splice(id - 1, 1)

        if (this.#products.length === 0) {
            this.#Empty();
        }
    }

    getProductId(product) {
        return this.#products.indexOf(product);
    }

    findAndPublish(key) {
        if (typeof key !== 'string') {
            throw new Error('The key should be a string.');
        }

        if (key === '') {
            for (const product of this.#products) {
                this.#VisualInsertion(product);
            }
        }
        else {
            let result = [];
            key = key.trim().toLowerCase();

            for (const product of this.#products) {
                for (const field of product) {
                    console.log(field);
                }
            }
            // this.#BulkVisualInsertion(result);
        }
    }

    #BulkVisualInsertion(arr) {
        for (const product of arr) {
            this.#VisualInsertion(product);
        }
    }

    #VisualInsertion(value) {
        const row = this.#table.insertRow();
        const idCell = row.insertCell();
        idCell.innerHTML = value.id;

        const nameCell = row.insertCell();
        nameCell.innerHTML = value.name;

        const priceCell = row.insertCell();
        priceCell.innerHTML = value.price;

        const typeCell = row.insertCell();
        typeCell.innerHTML = value.type;

        const quantityCell = row.insertCell();
        quantityCell.innerHTML = value.quantity;

        const dateCell = row.insertCell();
        dateCell.innerHTML = value.date.toLocaleDateString();

        const descriptionCell = row.insertCell();
        descriptionCell.innerHTML = value.description;

        const deleteCell = row.insertCell();
        deleteCell.appendChild(this.#GetDelBtnFor(value));
    }

    #GetDelBtnFor(value) {
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('btn', 'btn-light');
        btn.innerHTML = `
            <img class="m-1px" src="./images/x-mark-24.png" alt="Cross">
        `;
        btn.onclick = () => this.Delete(value.id)
        return btn;
    }

    #Empty() {
        this.#table.innerHTML = Manipulator.#empty;
    }
}

class Product {
    #id;
    #name;
    #price;
    #date;
    #description;
    #type;
    #quantity;

    constructor(name = '', price = 0, type = '', quantity = 0, date = new Date(), description = '') {
        this.id = 0;
        this.name = name;
        this.price = price;
        this.date = date;
        this.description = description;
        this.type = type;
        this.quantity = quantity;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        if (typeof value !== "number") {
            throw new Error("ID must be a number");
        }
        this.#id = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (typeof value !== "string") {
            throw new Error("Name must be a string");
        }
        this.#name = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        if (typeof value !== "number") {
            throw new Error("Price must be a number");
        }
        this.#price = value;
    }

    get date() {
        return this.#date;
    }

    set date(value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error("The field date must be a valid date");
        }
        this.#date = date;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        if (typeof value !== "string") {
            value = '';
        }
        this.#description = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        if (typeof value !== "string") {
            throw new Error("Type must be a string");
        }
        this.#type = value;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        if (!Number.isInteger(value)) {
            throw new Error("Quantity must be an integer");
        }
        this.#quantity = value;
    }


    clone() {
        return new Product(this.name, this.price, this.type, this.quantity, this.date, this.description);
    }
}
