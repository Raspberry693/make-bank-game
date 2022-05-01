// var declarations
var save_list = [];

var money = 0;
var income = 1;

var boost_cost = 1000;

var bonus_cost = 100;
var bonus_clicks = 0;
var total_bonus = 0;

var auto_cost = 500;
var auto_clicks = 0;

var item_number = 0;

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
    {object:'Falcon 9 Rocket', price:100000000, income:50},
    {object:'Trump Tower', price:300000000, income:50},
    {object:'Bank of America', price:449100000000, income:10},
    {object:'United States', price:225000000000000, income:200},
    {object:'Earth', price:5000000000000000, income:200000}
];

chrome.storage.sync.get(['save'], function(result) {
    console.info('Save data read');
    console.info(result.save);
    if (result.save.length != 0) {
        console.log(result.save.money);
        money = result.save[3];
        income = result.save[4];
        boost_cost = result.save[5];
        bonus_cost = result.save[6];
        bonus_clicks = result.save[7];
        total_bonus = result.save[2];
        auto_cost = result.save[1];
        auto_clicks = result.save[0];
        purchase_list = result.save[8];
    }
    console.log(result.save.length != 0);
});

var comment_list = [
    {comment:"You're broke", time:0},
    {comment:"You have something to your name!", time:1},
    {comment:"You can shop at Walmart!", time:10},
    {comment:"You have a decent amount of pocket change.", time:100},
    {comment:"You are above the poverty line!", time:1000},
    {comment:"Look at all the stuff you can buy!", time:5000},
    {comment:"Do you have auto click yet?", time:15000},
    {comment:"Look at that chunk of change!", time:50000},
    {comment:"I'm bored. How 'bout you?", time:100000},
    {comment:"The president wants your job.", time:250000},
    {comment:"Ever considered big oil?", time:500000},
    {comment:"You're a millionaire!", time:1000000}
];

// HTML DOM declaration
const make = document.getElementById('click');

const comment = document.getElementById('witty-remark');

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
    income += purchase_list[item_number].income;
    income_display.innerHTML = 'Income $' + income;

    money -= purchase_list[item_number].price;

    console.log(item_number);
    purchase_list.splice(item_number, 1);
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
    auto_clicks += 2.5;
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
        money += income * auto_clicks / 60;
    }
    total.innerHTML = '$' + Math.floor(money);
    income_display.innerHTML = 'Income $' + Math.floor(income);

    for (var x = 0;x < purchase_list.length;x++) {
        if (money >= purchase_list[x].price && money < purchase_list[x+1].price) {
            item_description.innerHTML = 'You can afford a ' + purchase_list[x].object + ' ($' + purchase_list[x].price + ')';
            item_section.style.display = 'flex';
            item_number = x;
            break;
        } else {
            item_section.style.display = 'none';
        }
    }

    for (var i = 0;i < comment_list.length;i++) {
        if (money >= comment_list[i].time && money < comment_list[i+1].time) {
            comment.innerHTML = comment_list[i].comment;
        }
    }
    boost_display.innerHTML = boost_cost;
    bonus_display.innerHTML = bonus_cost;
    auto_display.innerHTML = auto_cost;

    game_bonus.innerHTML = total_bonus.toFixed(1);
}, 1000/30);

var d;
var save_tick = setInterval(function() {
    save_list = [auto_clicks,auto_cost,total_bonus,money,income,boost_cost,bonus_cost,bonus_clicks,purchase_list]
    chrome.storage.sync.set({save: save_list}, function() {
        d = new Date();
        console.info('Game saved at ' + d);
        console.info(save_list);
    });
}, 5000);