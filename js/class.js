class Manipulator {
    static #empty = '<tr><td colspan="5" class="text-center">Empty</td></tr>';
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

    get tableId() {
        return this.#tableId;
    }

    get #table() {
        return document.getElementById(this.#tableId);
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

        this.#products.push(product);
        product.id =  ++Manipulator.#count;
        this.#Insertion(product)
    }

    Delete(product) {
        console.log(product.id);
        this.#table.deleteRow(product.id - 1);
        this.#products.splice(product.id - 1, 1)
        
        if (this.#products.length === 0) {
            this.#Empty();
        }
    }

    #Insertion(value) {
        const row = this.#table.insertRow();
        const idCell = row.insertCell();
        idCell.innerHTML = value.id;

        const nameCell = row.insertCell();
        nameCell.innerHTML = value.name;

        const priceCell = row.insertCell();
        priceCell.innerHTML = value.price;

        const dateCell = row.insertCell();
        dateCell.innerHTML = value.date.toLocaleDateString();

        const descriptionCell = row.insertCell();
        descriptionCell.innerHTML = value.description;
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

    constructor(name, price, date, description) {
        this.id = 0;
        this.name = name;
        this.price = price;
        this.date = date;
        this.description = description;
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
        console.log(date.toDateString());
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
}
