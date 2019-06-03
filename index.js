'use strict';
const record = {
    mealTotal: 0,
    myTip: 0,
    subtotal: 0,
    totalTips: 0,
    mealCount: 0,
    averageTip: 0,
}

console.log(typeof record.totalTips)

function handleSubmit() {
        $('#meal-details').submit(function (e) {
            e.preventDefault();
            let mealPrice = parseFloat($('.base-meal-price').val());
            console.log(mealPrice)
            let salesTax = parseFloat($('.tax-rate').val());
            let tip = parseFloat($('.tip-persentage').val());
            handleFormClear()
            updateRecord(mealPrice,salesTax,tip);
            render();
        });
        }

function updateRecord(meal,tax,tip){
    //  let {mealTotal, myTip, subtotal, totalTips, mealCount,  averageTip} = record;
    record.mealTotal =  parseFloat((meal * (tax / 100) + meal).toFixed(2));
    record.myTip = parseFloat((record.mealTotal * (tip / 100)).toFixed(2));
    record.subtotal = parseFloat((record.myTip + record.mealTotal).toFixed(2));

    record.totalTips = (parseFloat(record.totalTips) + parseFloat(record.myTip)).toFixed(2);
    
    record.mealCount = record.mealCount + 1;
    record.averageTip = (parseFloat(record.totalTips) / parseFloat(record.mealCount)).toFixed(2);
    console.log(record)
}  

function render() {
    $('#customer-info').html(`<h2>Customer Charges</h2>
    <div id='total'>
            <p>Total: $${record.mealTotal}</p>
            </div>
        <div id='tip' >
            <p>Tip: $${record.myTip}</p>
        </div>
        <div id='subtotal'>
            <p>Subtotal: $${record.subtotal} </p>
        </div>`);

    $('#waitstaff-earnings').html(`<h2>My Earnings Info</h2>
    <div id='tip-total'>
        <p>Tip total: $${record.totalTips} </p>
    </div>
    <div id='meal-count'>
    <p>Meal count: ${record.mealCount}</p>
    </div>
    <div id='average-tip-per-meal'>
        <p>Average tip: $${record.averageTip}</p>
    </div>`)   
}

function handleFormClear() {
    $('.base-meal-price').val('');
    $('.tax-rate').val(''); 
    $('.tip-persentage').val('');
}

function handleCancel(){
    $('#meal-details').on('click','#cancel', function(e) {
        e.preventDefault();
        handleFormClear();
    });

}

function handleReset(){
    $('.section-2').on('click','#reset',function(e){
        e.preventDefault();
        console.log(e.target)
        record.mealTotal = 0;
        record.myTip = 0;
        record.subtotal = 0;
        record.totalTips = 0;
        record.mealCount = 0;
        record.averageTip = 0;
        render();
        });
}



function bundle(){
    handleSubmit();
    handleCancel()
    handleReset();
}
$(bundle)



