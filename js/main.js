let btn = document.

let prod = new Product('123', 12.32, '12/11/2020', 'desc');
console.log(prod);

let tableManager = new Manipulator('data');
tableManager.Insert(prod);
tableManager.Insert(prod);

tableManager.Delete(prod);
tableManager.Delete(prod);

tableManager.Insert(prod);
