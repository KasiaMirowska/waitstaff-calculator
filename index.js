'use strict';
console.log('hi');
let RECORD = [];
let EARNINGS = [];

function MEAL(num1, num2, num3) {
    this.meal = num1,
    this.tax = num2,
    this.total = function () {
        return Number((this.meal * (this.tax / 100) + this.meal).toFixed(2));
        },
    this.tipPersentage = () => (Number(num3 / 100)),
    this.actualTip = function() {
           return Number((this.total() * this.tipPersentage()).toFixed(2));
        }
    this.subtotal = function() {
            return (this.actualTip() + this.total()).toFixed(2);
        }
    }



// takes info from form on submit, that then creates new object meal.
//each new MEAL should get pushed to record array
//each earning shoulgd get pushed to earnings array

function handleMealSubmit() {
    $('#meal-details').submit(function (e) {
        e.preventDefault();
        let baseMealPrice = Number($('.base-meal-price').val());
        let salesTax = Number($('.tax-rate').val());
        let myTip = Number($('.tip-persentage').val());
        let newMeal = new MEAL(baseMealPrice, salesTax, myTip)
        addMealToRecord(newMeal)
        addToEarnings(newMeal.actualTip())
        handleFormClear();
        renderCustomerCharges(newMeal.total(), newMeal.actualTip(),newMeal.subtotal());
        averageTip(newMeal.actualTip);
        console.log(EARNINGS)
    });
    }

function addMealToRecord(meal) {
    RECORD.push(meal);
}
function addToEarnings(tip){
    EARNINGS.push(Number(tip));
}

// let mealCount = function() {
//     console.log(RECORD,'hi')
//     let meals = RECORD.length;
// }

function handleFormClear() {
    $('.base-meal-price').val('');
    $('.tax-rate').val(''); 
    $('.tip-persentage').val('');
}

let averageTip = function(tip) {
    console.log(EARNINGS,2)
    let tipTotal = EARNINGS.reduce((acc, tip) => (acc + tip), 0);
    let aveTip = Number((tipTotal / EARNINGS.length).toFixed(2)); 
    handleEarningsInfo(tipTotal, aveTip)
}

function renderCustomerCharges(total,tip,subtotal){
    $('#total').html(`Total: ${total}`);
    $('#tip').html(`Tip: ${tip}`);
    $('#subtotal').html(`Subtotal: ${subtotal}`);
}
 function handleEarningsInfo(tipTotal,aveTip) {
    console.log(EARNINGS,3)
    console.log('here?')
    let mealCount = RECORD.length;
    console.log(mealCount)

     $('#tip-total').html(`Tip total: ${tipTotal}`);
     $('#meal-count').html(`Meal count: ${mealCount}`);
     $('#average-tip-per-meal').html(`Average meal tip: ${aveTip}`)
 }


function bundle() {
    handleMealSubmit();

    
}

$(bundle());
