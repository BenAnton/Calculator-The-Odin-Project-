
const display = document.querySelector(".display");
const operatorButtons = document.querySelectorAll('.operator');
const ac = document.querySelector('.AC');
const del = document.querySelector('.Del');
const percenetage = document.getElementsByClassName("percentage");
const equals = document.querySelector('.equals');
const numbers = document.querySelectorAll('.number');

let numberA;
let numberB;
let displayContent = "";
let clickedOperator = "";
let decLeft = false;
let decRight = false;

equals.addEventListener('click', calculate);

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', function() {
        clickedOperator = this.textContent;
        decLeft = false;
        decRight = false;
        displayAppend(clickedOperator);
})
});

function calculate() {
    numberSplit(displayContent);
    operate (numberA, clickedOperator, numberB);
    displayContent = display.textContent;
}

function numberSplit(displayContent){
    const oper = ["+", "-", "*", "/"];
    let splitArray;
    for (let operator of oper) {
        splitArray = displayContent.split(operator);
        if (splitArray.length === 2) {
            break;
        }
    }

    if (splitArray.length !==2){
        console.log("Error");
        return;
    }

    numberA = parseFloat(splitArray[0]);
    numberB = parseFloat(splitArray[1]);

    console.log("NumberA: " + numberA);
    console.log(Number.isInteger(numberA));
    
    console.log("NumberB: " + numberB);
    console.log(Number.isInteger(numberB));
}

// function calls the simple math functions depending on the operator it is given. 
function operate(numberA, operator, numberB){
    if (operator === "+"){
        add(numberA, numberB);
    }
    else if (operator === "-"){
        subtract(numberA,numberB);
    }
    else if (operator === "*"){
        multiply(numberA,numberB);    
    }
    else if (operator === "/"){
        divide(numberA,numberB);
    }
}

// need to add removal of the zero before the first press. 
numbers.forEach(number => {
    number.addEventListener('click', function() {
        if (displayContent === "0"){
        displayContent = displayContent.slice(0, -1);
        displayAppend(this.textContent);
    } else {
        displayAppend(this.textContent); 
    }
    });
});

function displayAppend(input) {
    if (input === "." && displayContent.includes(".")) {
        return;
    }

    if (input === "." && displayContent === "") {
        displayContent += "0";
    }

    if (["+","-","*","/"].includes(input)) {
        decLeft = false;
        decRight = false;
    }

    if (input === "." && clickedOperator !== "" && !decLeft) {
        decLeft = true;
    }

    if (input === "." && clickedOperator !== "" && decLeft && !decRight) {
        decRight = true;
    }

    displayContent += input;
    display.textContent = displayContent;
}

ac.addEventListener('click', clear)
function clear() {
    displayContent = "0";
    display.textContent = displayContent;
}

del.addEventListener('click', dele)
function dele() {
    if (displayContent.length > 1){
    displayContent = displayContent.slice(0, -1);
    display.textContent = displayContent;
    }
    else if (displayContent.length === 1){
        displayContent = "0";
        display.textContent = displayContent;
    }

}

// Simple math functions, all tested and working.  
function add(numberA, numberB){
    let result = numberA + numberB;
    displayContent = result;
    display.textContent = displayContent;
    console.log(result);
}

function subtract(numberA, numberB) {
    let result = numberA - numberB;
    displayContent = result;
    display.textContent = displayContent;
    console.log(result);
}

function multiply(numberA, numberB) {
    let result = numberA * numberB;
    displayContent = result;
    display.textContent = displayContent;
    console.log(result);
}

function divide(numberA, numberB) {
    if (numberA === 0 || numberB === 0){
        displayContent = "Stop!!!";
        display.textContent = displayContent;
        return;
    }
    else {
    let result = numberA / numberB;
    displayContent = result;
    display.textContent = displayContent;
    console.log(result);
}}

