let a = "";
let b = "";
let selection = "";
let prevOperator = "";
let tempOperator = "";
let operator = "";
let onScreen = "";
let result = "";
let currentResult = "";
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
    if (b === 0) {
        return "Error: Division by Zero";
    } else return (a / b).toFixed(3); // round to 3 decimal places
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
    // console.log(`operator: ${operator}`);
    // console.log(`a: ${a}`);
    // console.log(`b: ${b}`);

    return result;
}

function digitPressed() {
    return 0;
}

function screenDisplay(screenDisplay) {
    display.textContent = screenDisplay;
}

function resetCalculator() {
    btnSelection = "";
    selection = "";
    onScreen = "";
    a = "";
    b = "";
    operator = "";
    display.textContent = "0";
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
        let toExecute = event.target.classList.contains('executor');
        let toClear = event.target.value === 'clear';
        let btnSelection = event.target.value; // a button was clicked and stored

        // Concatenate the numbers to be selected
        selection += btnSelection;
        // Concatenate the Screen display 
        onScreen += btnSelection;

        // Calculator flow
        if (toClear) {
            resetCalculator();
            return;
        }

        if (isDigit) {
            if (operator === "") {
                a = +selection;
            } else {
                b = +selection;
            }

        } else if (isOperator) {
            if (operator === "") {
                operator = selection.slice(-1);
                selection = "";
                // currentResult = operate(operator, a, b);
                // a = currentResult;
                selection = "";
                prevOperator = operator;
            } else {
                // call operate with prevOperator 
                currentResult = operate(prevOperator, a, b);
                console.log(`current result: ${currentResult}`);
                a = currentResult;
                console.log(`a: ${a}`);
                operator = selection.slice(-1);
                selection = "";
            }
            // Uncomment below and remove conditionals to have the calculator working for two operands only such as 2+2 = 4 
            // operator = selection.slice(-1);
            // selection = "";
        } 

        // check for equal sign to call operate and display result on screen 
        if (toExecute) {
            console.log(`Equals Operator: ${operator}`);
            console.log(`Equals a: ${a}`);
            console.log(`Equals b: ${b}`);
            operate(operator, a, b);
            // onScreen = "";
            // selection = "";
        } else {
            screenDisplay(onScreen);
        }
    } 
});