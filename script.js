let displayValue = '0';
let firstValue = '';
let secondValue = '';
let currentOperator = '';
let isDone = false;
let isOperatorPressed = false;
let currentOperation = '';

window.addEventListener('keydown', assignKey);

const resultDisplay = document.querySelector('.result-display');
const operationDisplay = document.querySelector('.operation-display')
const operandButtons = Array.from(document.querySelectorAll('.operand'));
operandButtons.forEach(button => button.addEventListener('click', setDigit));
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
const decimalButton = document.querySelector('[data-key="."]');
decimalButton.addEventListener('click', addDecimal);
console.log(decimalButton);



function assignKey(event) {
    // event.preventDefault();
    const pressedButton = document.querySelector(`[data-keycode="${event.keyCode}"]`);
    let datakey = pressedButton.dataset.key;
    console.log(pressedButton);
    if (event.keyCode >= 96 && event.keyCode <= 105) {
        displayDigit(datakey);
    } else if (event.keyCode === 106 || event.keyCode === 107 || event.keyCode === 109 || event.keyCode === 111) {
        displayOperator(datakey);
    } else if (event.keyCode === 13) {
        equals();
    } else if (event.keyCode === 8) {
        erase();
    } else if (event.keyCode === 110) {
        addDecimal();
    } else if (event.keyCode === 27) {
        clear();
    }

    //note: when refactoring, try using an array and array methods to select correct function
}


function setDigit(event) {
    let digit = event.target.dataset.key;
    displayDigit(digit);
}

function setOperator(event) {
    let operator = event.target.dataset.key;
    displayOperator(operator);
}



function addDecimal() {
    if (!(displayValue.includes('.'))) {
        displayValue += '.';
        updateDisplay();
        console.log("addDecimal")
    } else {
        return
    }
}



function displayDigit(digit) {
    if (isOperatorPressed) {
        isOperatorPressed = false;
    } else if (isDone) {
        clear();
        isDone = false;   
    } 

    if (String(displayValue).includes('.')) {
        let decimalIndex = String(displayValue).indexOf('.')
        let decimal = String(displayValue).slice(decimalIndex+1);
        
        if (decimal.length > 0) {
            return;
        } else {
            displayValue += digit;
            updateDisplay();
        }
    } else {
        if (displayValue == '0') {
            displayValue = '';
            displayValue += digit;
            updateDisplay();
        } else {
            displayValue += digit;
            updateDisplay();
        }
    }
}


function updateDisplay() {
    resultDisplay.textContent = displayValue;
}

function updateOperationDisplay() {
    console.log(currentOperation)
    operationDisplay.textContent = currentOperation;
}

function displayOperator(operator) {
    if (isOperatorPressed === true) return;

    if (firstValue === '' && secondValue === '') {
        currentOperation += displayValue + operator;
        updateOperationDisplay();
        firstValue = displayValue;
        displayValue = '0';
        currentOperator = operator;
        isOperatorPressed = true;
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    } else if (firstValue !== '') {
        equals(false);
        currentOperator = operator;
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
        if (!(currentOperation.includes('='))) {
            currentOperation += secondValue;
            updateOperationDisplay();
        } else {
            currentOperation = firstValue + currentOperator + secondValue;
            updateOperationDisplay();
        }
        // console.log(firstValue);
        // console.log(secondValue);
        // console.log(displayValue);
        // console.log(currentOperator);
    }
    if (firstValue !== '' && secondValue !== '') { //check if all operands have been entered, causes bugs if no check
        displayValue = operate(firstValue, secondValue, currentOperator);
        currentOperation += '=';
        updateOperationDisplay();
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
    currentOperation = '';
    updateDisplay();
    updateOperationDisplay();
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
        // console.log('display val ' + String(displayValue) + typeof displayValue);
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


function modulo(a, b) {
    return a % b;
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
        case '%':
            result = modulo(a, b)
            break;
    }
    return result;
}
