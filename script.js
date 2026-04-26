let num1 = 0;
let num2 = 0;
let operator = "";


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return 0;
}

function digitPressed() {
    return 0;
}

let digitBtn = document.querySelector('.digitBtn');

digitBtn.addEventListener('click', (event) => {
    // if button is clicked
    if (event.target.tagName === 'BUTTON') {
        const digit = event.target.value;
        num1 = digit;
    } 
    console.log(num1);
});