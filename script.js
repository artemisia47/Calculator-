const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b !== 0 ? a / b : "Error");

// Variables
let current = "";
let previous = "";
let operator = null;

// Display
const display = document.getElementById("display");

// Update display
function updateDisplay(value) {
    display.textContent = value || "0";
}

// Perform the calculation
function calculate() {
    if (previous && operator && current) {
        const a = parseFloat(previous);
        const b = parseFloat(current);
        switch (operator) {
            case "+":
                return add(a, b);
            case "-":
                return subtract(a, b);
            case "x":
                return multiply(a, b);
            case "÷":
                return b === 0 ? "Error" : divide(a, b);
            default:
                return b;
        }
    }
    return current;
}

// Button clicks
document.querySelectorAll(".btn").forEach((button) =>
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "C") {
            // Play the clear GIF
            playClearGif();

            // Clear all data and reset display
            current = "";
            previous = "";
            operator = null;
            updateDisplay("0"); // Ensure display shows "0"
        } else if (value === "←") {
            // Delete last character from current input
            current = current.slice(0, -1);
            updateDisplay(current || "0"); // Ensure display shows "0" if empty
        } else if (["+", "-", "x", "÷"].includes(value)) {
            // Operator logic
            if (current) {
                if (previous && operator) {
                    // If we already have a previous value, calculate the result
                    previous = calculate();
                    updateDisplay(previous); // Update the display with result
                } else {
                    previous = current;
                }
                operator = value;
                current = ""; // Reset current for next input
            }
        } else if (value === "=") {
            // Equals logic to perform the final calculation
            if (current && previous && operator) {
                current = calculate();
                previous = "";
                operator = null;
                updateDisplay(current); // Update with the final result
            }
        } else {
            // Handle numbers and decimal points
            if (value === "." && current.includes(".")) return; // Prevent multiple decimals
            current += value;
            updateDisplay(current); // Update the display with the current value
        }
    })
);

// Keyboard support
document.addEventListener("keydown", (e) => {
    const keyMap = {
        "/": "÷",
        "*": "x",
        "+": "+",
        "-": "-",
        Enter: "=",
        Backspace: "←",
        Escape: "C",
    };
    const key = keyMap[e.key] || e.key;

    const button = [...document.querySelectorAll(".btn")].find(
        (btn) => btn.dataset.value === key
    );

    if (button) {
        button.click();
    }
});

// Variables for GIF handling
const gifContainer = document.getElementById("gif-container");

// Function to play the GIF
function playClearGif() {
    gifContainer.style.display = "block"; // Show the GIF container

    // Hide the GIF after it has played (e.g., after 2 seconds)
    setTimeout(() => {
        gifContainer.style.display = "none";
    }, 2000); // Adjust the duration to match your GIF length
}
