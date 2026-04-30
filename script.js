let a = "";
let b = "";
let num1 = "";
let operator = "";
let inputsStored = [];

let btn = document.querySelector('.btnContainer');
let display = document.querySelector('h1');


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

function screenDisplay(screenDisplay) {
    display.textContent = screenDisplay;
}

// Calculator logic 
/* 
1. check if button is pressed // create two routes
- if digit 
- else operator
2. If it's a digit 
- If it's digit then we store as a number in string until we reach a operator. If we reach operator then we store the number (still as as string and we parse later)
3. Else it's operator (check for equal sign in operate function)  
*/
btn.addEventListener('click', (event) => {
    // if button is clicked (this avoids clicking anything else inside the div that isn't a button)
    if (event.target.tagName === 'BUTTON') {
        let digit = event.target.value; // a button was clicked
        a += digit;

        // check if operator is clicked
        if (event.target.classList.contains('operator')) {
            // store a and see to truncate operator
            // then store operator and next we want to store b
            a = Number(a.slice(0, -1)); // this completes storing number 1
            num1 = a;

            operator = event.target.value;
            console.log(`A: ${a}`);
            
            console.log(`Operator: ${operator}`);
            console.log(typeof a);
            console.log(typeof operator);
            
            // clear display
            // start accumulating number again 
             
            digit = "";
        } 
        b += digit

        // check for equal sign to call operate
        if (event.target.classList.contains('operator') && event.target.id === "=") {
            console.log(`B: ${b}`);
            operate(operator, a, b);
        }

        console.log(`Num1: ${num1}`);
        screenDisplay(a);
    } 
});




/* Logic for capturing 1st number then operator then 2nd number

create an array to store up to 3 elements // would this not be dynamic?

1. after every number pressed it adds to the number being created
2. then we wait until operator is clicked 
3. do same to create second number
4. wait for equal sign 
5. call operate and display(return) calculation 


// TODO:
How do I press a digit and have it make number greater say I want 100, how do I press 1 and then 0 then 0 again and have 100? 

Add value to a string, and keep adding value to string, and wait until operator is selected to stop? 

*/