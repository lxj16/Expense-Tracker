//UI controller
const UICtrl = (function() {
  const UISelectors = {
    expenseList: "#expense-list",
    listExpenses: "#expense-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearAllBtn: ".clear-btn",
    expenseNameInput: "#expense-name",
    expenseAmountInput: "#expense-amount",
    totalAmount: ".total-cost"
  };

  //
  return {
    hideList: function() {
      document.querySelector(UISelectors.expenseList).style.display = "none";
    },
    populateExpList: function(expenses) {
      let html = "";

      expenses.forEach(function(expense) {
        html += `<li class="collection-item" id="item-${expense.id}">
        <strong>${expense.name}: </strong> <em>$ ${expense.amount}</em>
        <a href="#" class="secondary-content">
          <i class="edit-expense fa fa-pencil"></i>
        </a>
      </li>`;
      });
      //Insert <li> into <ul>
      document.querySelector(UISelectors.expenseList).innerHTML = html;
    },
    getSelectors: function() {
      return UISelectors;
    },

    addListExpense: function(expense) {
      //Show the list
      document.querySelector(UISelectors.expenseList).style.display = "block";
      //Create new <li> element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";

      //Add ID
      li.id = `item-${expense.id}`;

      //Add HTML
      li.innerHTML = `<strong>${expense.name}: </strong> <em>$ ${
        expense.amount
      }</em>
      <a href="#" class="secondary-content">
        <i class="edit-expense fa fa-pencil"></i>
      </a>`;

      //Insert item
      document
        .querySelector(UISelectors.expenseList)
        .insertAdjacentElement("beforeend", li);
    },

    showTotalAmount: function(total) {
      document.querySelector(UISelectors.totalAmount).textContent = total;
    },
    clearInput: function() {
      document.querySelector(UISelectors.expenseNameInput).value = "";
      document.querySelector(UISelectors.expenseAmountInput).value = "";
    },

    addExpenseToForm: function() {
      document.querySelector(
        UISelectors.expenseNameInput
      ).value = ExpCtrl.getSelectedExpense().name;
      document.querySelector(
        UISelectors.expenseAmountInput
      ).value = ExpCtrl.getSelectedExpense().amount;
      UICtrl.showEditState();
    },

    updateListExpense: function(expense) {
      let listExpenses = document.querySelectorAll(UISelectors.listExpenses);

      //Turn Node list into array
      listExpenses = Array.from(listExpenses);

      listExpenses.forEach(function(listExpenses) {
        const expenseID = listExpenses.getAttribute("id");
        if (expenseID === `item-${expense.id}`) {
          document.querySelector(`#${expenseID}`).innerHTML = `<strong>${
            expense.name
          }: </strong> <em>$ ${expense.amount}</em>
          <a href="#" class="secondary-content">
            <i class="edit-expense fa fa-pencil"></i>
          </a>`;
        }
      });
    },

    deleteListExpense: function(id) {
      const expenseID = `#item-${id}`;
      const expense = document.querySelector(expenseID);
      expense.remove();
    },

    clearAll: function() {
      let listExpenses = document.querySelectorAll(UISelectors.listExpenses);
      //Turn node list into array
      listExpenses = Array.from(listExpenses);
      listExpenses.forEach(function(expense) {
        expense.remove();
      });
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    getExpenseInput: function() {
      return {
        name: document.querySelector(UISelectors.expenseNameInput).value,
        amount: document.querySelector(UISelectors.expenseAmountInput).value
      };
    }
  };
})();
