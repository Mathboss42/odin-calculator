let displayValue = '0';
let firstValue = '';
let secondValue = '';
let currentOperator = '';


const displayScreen = document.querySelector('p');
const operandButtons = Array.from(document.querySelectorAll('.operand'));
operandButtons.forEach(button => button.addEventListener('click', displayDigit));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
operatorButtons.splice(3, 2);
operatorButtons.forEach(button => button.addEventListener('click', setOperator));
const equalsButton = document.querySelector('[data-key="="]');
equalsButton.addEventListener('click', equals);
const clearButton = document.querySelector('[data-key="clear"]');
clearButton.addEventListener('click', clear);


//when user presses operator, store display value in temporary variable and reset display value
//store operator value in variable
//when user presses new numbers, store those in displayValue
//when user presses equals, operate and display result


function displayDigit(event) {
    if (displayValue === '0') {
        displayValue = '';
        displayValue += event.target.dataset.key;
        displayScreen.textContent = displayValue;
    } else {
        displayValue += event.target.dataset.key;
        displayScreen.textContent = displayValue;
    }
    if (firstValue !== '' && secondValue === '') {
        secondValue = displayValue;
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    }
}


function updateDisplay() {
    displayScreen.textContent = displayValue;
}


function setOperator(event) {
    if (firstValue === '' && secondValue === '') {
        firstValue = displayValue;
        displayValue = '0';
        currentOperator = event.target.dataset.key;
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    } else if (firstValue !== '' && secondValue !== '') {
        equals();
        currentOperator = event.target.dataset.key;
        firstValue = displayValue;
        secondValue = '';
        displayValue = '0';
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    } 
}


function equals() {
    displayValue = operate(firstValue, secondValue, currentOperator);
    updateDisplay();
}


function clear() {
    displayValue = '0';
    firstValue = '';
    secondValue = '';
    updateDisplay();
}


function add(a, b) {
    return Number(a) + Number(b);
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b; 
}


function divide(a, b) {
    return Math.round(a / b * 10) / 10;
}


function operate(a, b, operator) {
    let result = 0;
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
    }
    return result;
}
