const displaySmall  = document.getElementById("historySmall");
const displayBig    = document.getElementById("displayNumber");
const historyPanel  = document.getElementById("historyPanel");
const historyListEl = document.getElementById("historyList");

let current = "";
let memory  = 0;
let history = []; 

function updateDisplay() {
    displayBig.innerText = current || "0";
}

function append(val) {
    current += val;
    updateDisplay();
}

function clearEntry() {
    current = current.slice(0, -1);
    updateDisplay();
}

function allClear() {
    current = "";
    displaySmall.innerText = "";
    updateDisplay();
}

function backspace() {
    current = current.slice(0, -1);
    updateDisplay();
}

// HITUNG (=)
function calculate() {
    try {
        if (!current) return;
        let result = eval(current);
        if (result === Infinity || result === -Infinity) {
            displaySmall.innerText = current + " =";
            const row = `${current} = Tidak bisa dibagi 0`;
            history.unshift(row);
            if (history.length > 5) history.pop();
            renderHistory();
            current = "∞";
            updateDisplay();
            return;
        }

        displaySmall.innerText = current + " =";
        const row = `${current} = ${result}`;
        history.unshift(row);
        if (history.length > 5) history.pop();
        renderHistory();
        current = result.toString();
        updateDisplay();

    } catch (e) {
        displayBig.innerText = "Error";
    }
}

function renderHistory() {
    historyListEl.innerHTML = "";
    if (history.length === 0) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty-history";
        emptyDiv.textContent = "Belum ada riwayat";
        historyListEl.appendChild(emptyDiv);
        return;
    }

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.textContent = item;
        div.addEventListener("click", () => {
            const parts = item.split(" = ");
            if (parts[1] && parts[1].includes("Tidak bisa dibagi")) {
                return;
            }
        
            displaySmall.innerText = parts[0] + " =";
            current = parts[1].trim();
            updateDisplay();
            historyPanel.classList.remove("show");
        });

        historyListEl.appendChild(div);
    });
}

function toggleHistory() {
    renderHistory();
    historyPanel.classList.toggle("show");
}

function memoryAdd()   { memory += Number(current || 0); }
function memoryMinus() { memory -= Number(current || 0); }
function memoryRecall(){ current = memory.toString(); updateDisplay(); }
function memoryClear() { memory = 0; }

renderHistory();
updateDisplay();