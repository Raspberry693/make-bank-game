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
    {object:'House', price:800000, income:20}
];

const total = document.getElementById('total');
const item_purchase = document.getElementById('purchase');

// add money
const make = document.getElementById('click');
make.addEventListener('click', function() {
    money += income;
    total.innerHTML = '$' + money;
});

// check for possessions
if (money >= purchase_list[0]) {

}