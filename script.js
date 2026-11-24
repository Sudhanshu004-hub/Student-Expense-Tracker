let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let name = document.getElementById("name").value.trim();
  let amount = Number(document.getElementById("amount").value);
  let category = document.getElementById("category").value;
  if (name === "" || amount <= 0) {
    document.getElementById("error").innerText = "Enter a valid name and amount";
    return;
  }
  document.getElementById("error").innerText = "";
  expenses.push({ name, amount, category });
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  save();
}

function deleteExpense(i) {
  expenses.splice(i, 1);
  save();
}

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
}

function showExpenses() {
  let filter = document.getElementById("filter").value;
  let html = "";
  let total = 0;
  expenses.forEach((e, i) => {
    if (filter === "All" || e.category === filter) {
      total += e.amount;
      html += `<div class="expense"><div>${e.name} <span class="badge">${e.category}</span></div><div class="right"><span class="amount">₹${e.amount}</span><button class="delete" onclick="deleteExpense(${i})">Delete</button></div></div>`;
    }
  });
  document.getElementById("list").innerHTML = html || '<p class="empty">No expenses yet</p>';
  document.getElementById("total").innerText = total;
}

showExpenses();