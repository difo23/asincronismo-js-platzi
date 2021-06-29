//Callbacks definition

function sum(num1, num2) {
    return num1 + num2;
}


function calc(num1, num2, callback) {

    return callback(num1, num2);
}


console.log(calc(3, 4, sum));


// Callback with timeout continue in 'callback/index.js'

function date(callback) {
    console.log(new Date);
    setTimeout(function () {
        let date = new Date;
        callback(null, date)
    }, 3000)
}


// Los callbacks deben tener erro y result

function printDate(error, result) {
    console.log(result);
}

date(printDate)

