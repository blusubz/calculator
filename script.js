let a = "";
let b = "";
let num1 = "";
let num2 = "";
let selection = "";
let operator = "";
let onScreen = "";
let result = "";
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

    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            return "Error" // Runs if no cases match 
    }
    
    display.textContent = result;
    
    console.log(`operator: ${operator}`);
    console.log(`a: ${a}`);
    console.log(`b: ${b}`);
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
        let isDigit = event.target.classList.contains('digit');
        let isOperator = event.target.classList.contains('operator');
        let btnSelection = event.target.value; // a button was clicked and stored

        // Concatenate the numbers to be selected
        selection += btnSelection;
        // Concatenate the Screen display 
        onScreen += btnSelection;

        if (isDigit) {
            if (operator === "") {
                a = +selection;
            } else {
                b = +selection;
            }
        } else if (isOperator) {
            operator = selection.slice(-1);
            selection = "";
        } 

        // console.log(`selection: ${selection}`);

        // check for equal sign to call operate and display result on screen 
        if (event.target.classList.contains('executor')) {
            operate(operator, a, b);
        } else {
            screenDisplay(onScreen);
        }

        // TODO: do logic for CLEAR
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