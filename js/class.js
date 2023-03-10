class Manipulator {
    static #empty = '<tr><td colspan="8" class="text-center">Empty...</td></tr>';
    static #count = 0;

    #tableId;
    #dropdownId;
    #products;

    constructor(tableId, dropdownId) {
        if (typeof tableId !== 'string') {
            throw new Error('Value of tableId is unacceptable.');
        }
        if (typeof dropdownId !== 'string') {
            throw new Error('Value of dropdownId is unacceptable.');
        }

        this.#tableId = tableId;
        this.#dropdownId = dropdownId;
        this.#products = [];

        this.#Empty();
    }

    get #table() {
        return document.getElementById(this.#tableId);
    }

    get #dropdown() {
        return document.getElementById(this.#dropdownId);
    }

    get #tablerows() {
        return Array.from(this.#table.rows);
    }

    get products() {
        return this.#products;
    }

    get categories() {
        return this.#products
            .flatMap(prod => prod.type)
            .filter(Manipulator.uniqueFilter);
    }

    static get uniqueFilter() {
        return (value, index, array) => array.indexOf(value) === index;
    }

    GetCategoriesAsOptions() {
        let catStr = '<option value="All">All</option>';
        for (const cat of this.categories) {
            catStr += `<option value="${cat}">${cat}</option>`;
        }
        return catStr;
    }

    #GetProductsByCat(cat) {
        return this.#products.filter(val => val.type === cat);
    }

    Insert(product) {
        if (!(product instanceof Product)) {
            throw new Error("Product must be an instance of the Product class");
        }

        if (this.#products.length === 0) {
            this.#Empty('');
        }

        product = product.clone();
        product.id = ++Manipulator.#count;
        this.#products.push(product);

        // this.#VisualInsertion(product);
        this.#dropdown.innerHTML = tableManager.GetCategoriesAsOptions();
        this.SelectCategory();
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
            this.#BulkVisualInsertion(this.products);
        }
        else {
            let result = [];
            key = key.trim().toLowerCase();

            for (const product of this.#products) {
                if (product.searchString.includes(key)) {
                    result.push(product);
                }
            }
            this.#BulkVisualInsertion(result);

            if (key.length > 1) return result;
        }
        
        return null;
    }

    SelectCategory(cat = 'All') {
        let arr = cat === 'All'
            ? this.products
            : this.#GetProductsByCat(cat);

        this.#Empty('');
        this.#BulkVisualInsertion(arr);
    }

    #BulkVisualInsertion(arr) {
        this.#Empty('');
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
        btn.innerHTML = `<img class="m-1px" src="./images/x-mark-24.png" alt="Cross">`;
        btn.onclick = () => {
            let cat = value.type;
            this.Delete(value.id);

            if (this.categories.find(el => el === cat) === undefined) {
                this.SelectCategory('All');
                this.#dropdown.innerHTML = this.GetCategoriesAsOptions();
            }

            if (this.products.length === 0) {
                this.#Empty();
            }
        };
        return btn;
    }

    #Empty(cnt = null) {
        cnt = cnt === null ? Manipulator.#empty : cnt;
        this.#table.innerHTML = cnt;
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

    get searchString() {
        let str = this.name + this.price.toString() + this.type + this.quantity.toString() + this.date.toLocaleDateString() + this.description;
        return str.toLowerCase();
    }

    clone() {
        return new Product(this.name, this.price, this.type, this.quantity, this.date, this.description);
    }
}
