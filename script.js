let money = 0;
let income = 1;

let purchase_list = [
    {object:'Water Bottle', price:20, income:1},
    {object:'Backpack', price:100, income:1},
    {object:'Cart', price:200, income:1},
    {object:'Smartphone', price:500, income:2},
    {object:'Laptop', price:2000, income:3},
    {object:'Motorcycle', price:3000, income:3},
    {object:'Car', price:10000, income:5},
    {object:'Luxury Car', price:80000, income:10},
    {object:'Apartment in Los Angeles', price:300000, income:12},
    {object:'House', price:800000, income:20},
    {object:'Mansion', price:2000000, income:30},
    {object:'Trump Tower', price:300000000, income:50},
    {object:'Bank of America', price:449100000000, income:10},
    {object:'United States', price:225000000000000, income:200}
];

const total = document.getElementById('total');
const income_display = document.getElementById('income');

const item_description = document.getElementById('item-desc');
const item_section = document.getElementById('item-wrapper');

// add money
const make = document.getElementById('click');
make.addEventListener('click', function() {
    money += income;
    total.innerHTML = '$' + money;

    // check for possessions
    if (money >= purchase_list[0].price) {
        item_description.innerHTML = 'You can afford a ' + purchase_list[0].object + ' ($' + purchase_list[0].price + ')';
        item_section.style.display = 'flex';
    } else {
        item_section.style.display = 'none';
    }
});

const item_purchase = document.getElementById('item');
item_purchase.addEventListener('click', function() {
    income += purchase_list[0].income;
    income_display.innerHTML = '$' + income;

    money -= purchase_list[0].price;
    total.innerHTML = '$' + money; 

    if (money < purchase_list[0].price) {
        item_section.style.display = 'none';
    }

    purchase_list.shift();
});