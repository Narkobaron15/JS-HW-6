const clearbtn = document.getElementById('ClearBtn');
const searchfield = document.getElementById('searchInput');
clearbtn.onclick = () => {
    searchfield.value = '';
};
// searchfield.oninput = () => {
//     tableManager.findAndPublish
// }

const prod = new Product('123', 12.32, 'default', 123, '12/11/2020', 'desc'),
    prod2 = new Product("Widget", 19.99, "Tech", 10, "2022-02-28", "A cool widget");

const tableManager = new Manipulator('data');
tableManager.Insert(prod);
tableManager.Insert(prod);

tableManager.Insert(prod2);
tableManager.Insert(prod);

tableManager.Delete(4);
tableManager.Delete(1);

tableManager.Insert(prod);