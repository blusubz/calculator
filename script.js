let a = "";
let b = "";
let digit = "";
let prevOperator = "";
let operator = "";
let onScreen = "";
let result = "";
let currentResult = "";
let btn = document.querySelector('.btnContainer');
let display = document.querySelector('h1');
let isDone = false;

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
    } else if ((a / b ) % 2 !== 0) {
        return a / b;
    } else return (a / b).toFixed(3); // round to 3 decimal places if division is not a whole number 
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
    
    display.textContent = result; // for screen display

    return result;
}

function screenDisplay(screenDisplay) {
    display.textContent = screenDisplay;
}

function resetCalculator() {
    btnSelection = "";
    digit = "";
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

        // Calculator flow
        if (toClear) {
            resetCalculator();
            return;
        }

        if (isDigit) {
            // check if a new digit is pressed clear calculator 
            if (isDone) {
                resetCalculator();
                isDone = false;
                return;
            }
            // Concatenate the numbers to be selected
            digit += btnSelection;
            // Concatenate the Screen display 
            onScreen += btnSelection;

            if (operator === "") {
                a = +digit;
            } else {
                b = +digit;
            }
        } else if (isOperator) {
            if (operator === "") { // logic for single operation
                operator = btnSelection; 
                prevOperator = operator;
                onScreen += btnSelection;
                digit = "";
            }
            else if (b === "" && operator !== "") { // logic to check for new operator selection
                operator = btnSelection;
                prevOperator = operator;
                onScreen = a + operator;
            } else { // logic to chain operations 
                currentResult = operate(prevOperator, a, b)
                a = currentResult;
                onScreen += btnSelection;
                digit = "";
                b = ""; // for swapping operator logic
            }
        } 
        // check for equal sign to call operate and display result on screen 
        if (toExecute) {
            operate(operator, a, b);
            isDone = true;
        } else {
            screenDisplay(onScreen);
        }
    } 
});