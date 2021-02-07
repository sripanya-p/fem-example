let runningTotal = 0;
let buffer = "0";
let previousOperator; // เพื่อใช้สำหรับตามว่า user พึ่งกดปุ่มอะไร
const screen = document.querySelector('.screen'); // กำหนดให้ screen เลือก class screen

// add more code

document.querySelector('.calc-buttons').addEventListener("click", function (event) {
    // console.log(event.target.innerText);
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) { // เช็คว่า value ไม่ใข่ตัวเลข
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }

}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            rerender();
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }

}

function rerender() {
    screen.innerText = buffer;
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "x") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";

}