const historyContainer = document.getElementById("history");
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

const themeSelect = document.getElementById("themeColor");

// Load saved theme
const savedTheme = localStorage.getItem("themeColor");
if (savedTheme) {
  document.body.classList.add(savedTheme);
  themeSelect.value = savedTheme;
}

function addToHistory(expression, result) {
  const item = document.createElement("div");
  item.textContent = `${expression} = ${result}`;

  // Click to reuse result
  item.addEventListener("click", () => {
    currentInput = result;
    display.value = result;
  });

  historyContainer.prepend(item);
  saveHistory();
}

themeSelect.addEventListener("change", () => {
  document.body.className = ""; // reset all
  document.body.classList.add(themeSelect.value);
  localStorage.setItem("themeColor", themeSelect.value);
});

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

    // prevent divide by 0
    if (/\/0(?!\d)/.test(expression)) {
      display.value = "Can't divide by 0";
      display.classList.add("error");
      currentInput = "";
      return;
    }

    let result = eval(expression).toString(); 

    addToHistory(currentInput, result); 

    currentInput = result;
    display.value = result;
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
 
  if (operators.includes(value)) {
 
    if (operators.includes(lastChar)) {
      return;  
    }
  }

  currentInput += value;
  display.value = currentInput;
}
  });
});
 function saveHistory() {
  localStorage.setItem("calcHistory", historyContainer.innerHTML);
}

function loadHistory() {
  const saved = localStorage.getItem("calcHistory");
  if (saved) historyContainer.innerHTML = saved;
}

loadHistory();
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
const toggleBtn = document.getElementById("themeToggle");

 if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  historyContainer.innerHTML = "";
  localStorage.removeItem("calcHistory");
});