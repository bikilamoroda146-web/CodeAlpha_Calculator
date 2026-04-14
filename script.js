const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.value = "";
    }

    else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    }

   else if (value === "=") {
  try {
    let expression = currentInput.replace(/%/g, "/100");

    // 🚨 Check division by zero BEFORE eval
    if (/\/0(?!\d)/.test(expression)) {
      display.value = "Can't divide by 0";
      display.classList.add("error");
      currentInput = "";
      return;
    }

    currentInput = eval(expression).toString();
    display.value = currentInput;
    display.classList.remove("error");

  } catch {
    display.value = "Error";
    display.classList.add("error");
    currentInput = "";
  }
}

  else {
  const operators = ["+", "-", "*", "/", "%"];

  const lastChar = currentInput.slice(-1);

  // If clicking operator
  if (operators.includes(value)) {

    // Block double operators like ++ -- ** //
    if (operators.includes(lastChar)) {
      return; // stop here
    }
  }

  currentInput += value;
  display.value = currentInput;
}
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    currentInput += key;
    display.value = currentInput;
  } 
  else if (key === "Enter") {
    try {
      currentInput = eval(currentInput).toString();
      display.value = currentInput;
    } catch {
      display.value = "Error";
      currentInput = "";
    }
  } 
  else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } 
  else if (key === "Escape") {
    currentInput = "";
    display.value = "";
  }
});