// var declarations
var money = 0;
var income = 1;

var boost_cost = 1000;

var bonus_cost = 100;
var bonus_clicks = 0;
var total_bonus = 0;

var auto_cost = 500;
var auto_clicks = 0;

var powerup = 'bonus';

var purchase_list = [
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
    {object:'United States', price:225000000000000, income:200},
    {object:'Earth', price:5000000000000000, income:200000}
];

// HTML DOM declaration
const make = document.getElementById('click');

const help_close = document.getElementById('help-close');
const help = document.getElementById('help-wrapper');
const help_open = document.getElementById('help-button');

const money_tab = document.getElementById('money-tab');
const money_document = document.getElementById('game-wrapper');
const upgrades_tab = document.getElementById('upgrades-tab');
const upgrades_document = document.getElementById('upgrades-wrapper');

const bonus_tab = document.getElementById('bonus-tab');
const bonus_document = document.getElementById('bonus-wrapper');
const auto_tab = document.getElementById('auto-tab');
const auto_document = document.getElementById('auto-wrapper');
const bonus_shadow = document.getElementById('shadow1');
const auto_shadow = document.getElementById('shadow2');

const boost = document.getElementById('boost');
const boost_display = document.getElementById('boost-cost');
const bonus = document.getElementById('bonus-purchase');
const bonus_display = document.getElementById('bonus-cost');
const auto = document.getElementById('auto-purchase');
const auto_display = document.getElementById('auto-cost');

const game_bonus_add = document.getElementById('bonus-clicks');
const game_bonus = document.getElementById('bonus');
const use = document.getElementById('use-bonus');

const auto_add = document.getElementById('auto-clicks');

const total = document.getElementById('total');
const income_display = document.getElementById('income');

const item_description = document.getElementById('item-desc');
const item_section = document.getElementById('item-wrapper');
const item_purchase = document.getElementById('item');

// help section
help_close.addEventListener('click', function() {
    help.style.display = 'none';
});
help_open.addEventListener('click', function() {
    help.style.display = 'block';
});

// add money
make.addEventListener('click', function() {
    money += income;

    if (powerup == 'bonus') {
        total_bonus += bonus_clicks;
        let x = total_bonus;
        total_bonus = (Math.round(x * 10) / 10);
    }
});

use.addEventListener('click', function() {
    money += total_bonus * income;
    total_bonus = 0;
});

// purchase item
item_purchase.addEventListener('click', function() {
    income += purchase_list[0].income;
    income_display.innerHTML = 'Income $' + income;

    money -= purchase_list[0].price;

    purchase_list.shift();

    item_description.innerHTML = 'You can afford a ' + purchase_list[0].object + ' ($' + purchase_list[0].price + ')';
});

// money page
money_tab.addEventListener('click', function() {
    money_document.style.display = 'flex';
    upgrades_document.style.display = 'none';
    upgrades_tab.className = 'tab';
    money_tab.className = 'tab selected';
});

// upgrades page
upgrades_tab.addEventListener('click', function() {
    upgrades_document.style.display = 'flex';
    money_document.style.display = 'none';
    upgrades_tab.className = 'tab selected';
    money_tab.className = 'tab';
});

// auto page
auto_tab.addEventListener('click', function() {
    auto_shadow.style.display = 'none';
    bonus_shadow.style.display = 'block';
    bonus_tab.className = 'tab';
    auto_tab.className = 'tab selected';
    powerup = 'auto';
});

// bonus page
bonus_tab.addEventListener('click', function() {
    bonus_shadow.style.display = 'none';
    auto_shadow.style.display = 'block';
    bonus_tab.className = 'tab selected';
    auto_tab.className = 'tab';
    powerup = 'bonus';
});

// purchase income boost
boost.addEventListener('click', function() {
    money -= boost_cost;
    boost_cost *= 2;
    income *= 1.1;
});

// purchase bonus clicks
bonus.addEventListener('click', function() {
    money -= bonus_cost;
    bonus_cost *= 3;
    bonus_clicks += 0.1;
});

// purchase auto clicks
auto.addEventListener('click', function() {
    money -= auto_cost;
    auto_cost *= 3;
    auto_clicks += 5;
    auto_add.innerHTML = auto_clicks.toFixed(1);
});

// game tick
var tick = setInterval(function() {
    if (money < boost_cost) {
        boost.disabled = true;
    } else {
        boost.disabled = false;
    }
    if (money < bonus_cost) {
        bonus.disabled = true;
    } else {
        bonus.disabled = false;
    }
    if (money < auto_cost) {
        auto.disabled = true;
    } else {
        auto.disabled = false;
    }

    game_bonus_add.innerHTML = bonus_clicks.toFixed(1);
    if (powerup == 'auto') {
        money += auto_clicks / 60;
    }
    total.innerHTML = '$' + Math.floor(money);
    income_display.innerHTML = 'Income $' + Math.floor(income);

    if (money < purchase_list[0].price) {
        item_section.style.display = 'none';
    }

    if (money >= purchase_list[0].price) {
        item_description.innerHTML = 'You can afford a ' + purchase_list[0].object + ' ($' + purchase_list[0].price + ')';
        item_section.style.display = 'flex';
    } else {
        item_section.style.display = 'none';
    }

    boost_display.innerHTML = boost_cost;
    bonus_display.innerHTML = bonus_cost;
    auto_display.innerHTML = auto_cost;

    game_bonus.innerHTML = total_bonus.toFixed(1);
}, 1000/60);