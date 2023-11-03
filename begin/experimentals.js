let runningTotal = 0;
let buffer = '0'; // Why string? screen
let previousOperator = null; 

const screen = document.querySelector('.screen'); //Why? to interact with html

function buttonClick (value) {
    if(isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}


function handleSymbol(symbol) {
    // if( symbol === 'C') {
    //     buffer = '0';
    //     runningTotal = 0;
    // }
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null){
                //need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '&larr;':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
        case '+':
        case '-':
        case '×':
        case '&divide':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    console.log('here')
    if(buffer === '0'){
        //do nothing
        return;
    }
    const intBuffer = +buffer; //+ transform string to number

    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer)
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if(previousOperator === '+') {
        runningTotal += intBuffer;
    } else if(previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if(previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if(buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}


// press the button  
function init () {
    document.querySelector('.calc-buttons')
        .addEventListener ('click', function(event){
            buttonClick(event.target.innerText); 
        })
}

init();