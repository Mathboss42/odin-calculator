let displayValue = '0';
let firstValue = '';
let secondValue = '';
let currentOperator = '';
let isDone = false;
let isOperatorPressed = false;


const displayScreen = document.querySelector('p');
const operandButtons = Array.from(document.querySelectorAll('.operand'));
operandButtons.forEach(button => button.addEventListener('click', displayDigit));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
operatorButtons.forEach(button => button.addEventListener('click', setOperator));
const equalsButton = document.querySelector('[data-key="="]');
equalsButton.addEventListener('click', equals);
const clearButton = document.querySelector('[data-key="clear"]');
clearButton.addEventListener('click', clear);
const backButton = document.querySelector('[data-key="back"]');
backButton.addEventListener('click', erase);
const invertButton = document.querySelector('[data-key="+/-"]');
invertButton.addEventListener('click', invertSign);


//when user presses operator, store display value in temporary variable and reset display value
//store operator value in variable
//when user presses new numbers, store those in displayValue
//when user presses equals, operate and display result


function displayDigit(event) {
    if (isOperatorPressed) {
        isOperatorPressed = false;
    } else if (isDone) {
        clear();
        isDone = false;   
    } 
    if (displayValue == '0') {
        displayValue = '';
        displayValue += event.target.dataset.key;
        displayScreen.textContent = displayValue;
    } else {
        displayValue += event.target.dataset.key;
        displayScreen.textContent = displayValue;
    }
}


function updateDisplay() {
    displayScreen.textContent = displayValue;
}


function setOperator(event) {
    if (isOperatorPressed === true) return;
    if (firstValue === '' && secondValue === '') {
        firstValue = displayValue;
        displayValue = '0';
        currentOperator = event.target.dataset.key;
        isOperatorPressed = true;
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    } else if (firstValue !== '') {
        equals(false);
        currentOperator = event.target.dataset.key;
        firstValue = displayValue;
        secondValue = '';
        displayValue = '0';
        isOperatorPressed = true;
        isDone = false;
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    } 
}


function equals(status = true) {
    if (isDone) return;
    if (firstValue !== '' && secondValue === '') {
        secondValue = displayValue;
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    }
    if (firstValue !== '' && secondValue !== '') { //check if all operands have been entered, causes bugs if no check
        displayValue = operate(firstValue, secondValue, currentOperator);
        firstValue = displayValue;
        secondValue = '';
        updateDisplay();
        isDone = status;
    } else { //otherwise don't do anything
        return;
    }
}


function clear() {
    displayValue = '0';
    firstValue = '';
    secondValue = '';
    updateDisplay();
}


function erase() {
    if (isDone) return;
    if (displayValue === '0') {
        // console.log('displayval 0');
        return;
    } else if (displayValue.length === 1) {
        if (true) {
            // console.log('displayval ' + displayValue);
            // console.log('display length ' + displayValue.length)
            displayValue = '0';
            updateDisplay();
        }
    } else {
        // console.log('displayval ' + displayValue);
        // console.log('slice');
        displayValue = String(displayValue).slice(0, -1);
        updateDisplay()
    }
}


function invertSign() {
    if (displayValue == 0) return;
    if (displayValue > 0) {
        displayValue = -displayValue;
        updateDisplay();
    } else {
        console.log('display val ' + String(displayValue) + typeof displayValue);
        displayValue = String(displayValue).substring(1)
        updateDisplay();
    }
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
    if (b == '0') { 
        return "Nice try, but no."
    }
    return Math.round(a / b * 10) / 10;
}


function modulo () {
    return;
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
