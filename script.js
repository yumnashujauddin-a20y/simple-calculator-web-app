// Get calculator elements
const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".key");
const themeBtn = document.getElementById("themeBtn");


// Store the calculation
let expression = "";


// Show value on screen
function updateDisplay() {

    if (expression === "") {
        display.textContent = "0";
    } else {
        display.textContent = expression;
    }

}


// Add number or operator
function addValue(value) {

    expression = expression + value;

    updateDisplay();

}


// Clear calculator
function clearCalculator() {

    expression = "";

    history.textContent = "";

    updateDisplay();

}


// Delete last character
function deleteLast() {

    expression = expression.slice(0, -1);

    updateDisplay();

}


// Calculate answer
function calculate() {

    if (expression === "") {
        return;
    }

    try {

        // Convert percentage
        let calculation = expression.replace(/%/g, "/100");

        // Calculate
        let answer = Function(
            "return " + calculation
        )();

        // Check result
        if (!Number.isFinite(answer)) {
            throw new Error();
        }

        // Show history
        history.textContent = expression + " =";

        // Show answer
        expression = String(
            Number(answer.toFixed(10))
        );

        display.textContent = expression;

    } catch (error) {

        display.textContent = "Error";

        expression = "";

    }

}


// Handle calculator buttons
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.dataset.value;
        const action = button.dataset.action;


        // AC button
        if (action === "clear") {

            clearCalculator();

        }


        // DEL button
        else if (action === "delete") {

            deleteLast();

        }


        // Equal button
        else if (action === "equals") {

            calculate();

        }


        // Number/operator buttons
        else if (value !== undefined) {

            addValue(value);

        }

    });

});


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;


    // Numbers
    if (key >= "0" && key <= "9") {

        addValue(key);

    }


    // Decimal
    else if (key === ".") {

        addValue(".");

    }


    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        addValue(key);

    }


    // Enter
    else if (key === "Enter") {

        calculate();

    }


    // Backspace
    else if (key === "Backspace") {

        deleteLast();

    }


    // Escape
    else if (key === "Escape") {

        clearCalculator();

    }

});


// Dark mode
themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

});