let a = "";
let b = "";
let digit = "";
let endResult = "";
let prevOperator = "";
let operator = "";
let onScreen = "";
let result = "";
let currentResult = "";
let decimalCounter = 0;
let btn = document.querySelector('.btnContainer');
let display = document.querySelector('h1');
let isDone = false;

function add(a, b) {
    return Number((a + b).toFixed(3));
}

function subtract(a, b) {
    return Number((a - b).toFixed(3));
}

function multiply(a, b) {
    return Number((a * b).toFixed(3));
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by Zero";
    } else return Number((a / b).toFixed(3)); // round to 3 decimal places if division is not a whole number 
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
    digit = "";
    onScreen = "";
    a = "";
    b = "";
    operator = "";
    display.textContent = "0";
}

/**
 * UI-Driven Calculator Logic
 * 
 * STATE TRACKING:
 * @param {string} a - Stores the first operand (parsed to Number for math).
 * @param {string} b - Stores the second operand (parsed to Number for math).
 * @param {string} digit - Temporary buffer for the current number being typed.
 * @param {string} operator - The current active mathematical operator.
 * @param {boolean} isDone - Flag to reset state if a digit is pressed after an evaluation.
 * 
 * EVENT FLOW:
 * 1. Listen for clicks on the '.btnContainer' delegated to <button> elements.
 * 2. If 'digit': Append to current buffer and assign to 'a' or 'b' based on operator presence.
 * 3. If 'operator': 
 *    - If 'b' is empty: Update the active operator.
 *    - If 'b' exists: Perform intermediate calculation (chaining) and set result as new 'a'.
 * 4. If 'executor' (=): Run the final operation and toggle 'isDone'.
 */
btn.addEventListener('click', (event) => {
    let btnSelected = event.target.tagName === 'BUTTON';
    // if button is clicked (this avoids clicking anything else inside the div that isn't a button)
    if (btnSelected) {
        let isDigit = event.target.classList.contains('digit');
        let isOperator = event.target.classList.contains('operator');
        let toExecute = event.target.classList.contains('executor');
        let isDecimal = event.target.value === '.';
        let toClear = event.target.value === 'clear';
        let isBackspace = event.target.id === 'backspace';
        let btnSelection = event.target.value; // a button was clicked and stored

        // Calculator flow
        if (toClear) {
            resetCalculator();
            return;
        }

        // TODO: Backspace logic goes here
        if (isBackspace) { // Remove to revert
            console.log('BACKSPACE CLICKED')
            digit = digit.slice(0, -1);
            console.log(`backspace: ${digit}`);
        } // REMOVE to revert

        if (isDigit) {
            // check if a new digit is pressed after result displayed then clear calculator 
            if (isDone && isDigit) {
                resetCalculator();
                isDone = false;
            } 

            // allow only 1 decimal per digit
            if (!(btnSelection === '.' && digit.includes('.'))) {
                // Concatenate the numbers to be selected
                digit += btnSelection;
                // Concatenate the Screen display 
                onScreen += btnSelection;
            } 

            if (operator === "") {
                a = +digit;
            } else {
                b = +digit;
            }

        } else if (isOperator) {
            // If computation started (by clicking new operator) after having a result displayed
            if (isDone) {
                a = endResult;
                onScreen += btnSelection;
                digit = "";
                b = ""; // for swapping operator logic
                isDone = false;
            }

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
        // check for equal sign - If so, then, call operate and display result on screen 
        if (toExecute) {
            // display result and store result for next calculation if computed
            endResult = operate(operator, a, b);
            isDone = true;
        } else {
            screenDisplay(onScreen);
        }
    } 
});