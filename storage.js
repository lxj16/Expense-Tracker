//storage controller
const StorageCtrl = (function() {
  return {
    storeExpense: function(expense) {
      let expenses;
      if (localStorage.getItem("expenses") === null) {
        expenses = [];
        //push new expense
        expenses.push(expense);
        //Set local storage
        localStorage.setItem("expenses", JSON.stringify(expenses));
      } else {
        //Get old ls
        expenses = JSON.parse(localStorage.getItem("expenses"));

        //Push new expense
        expenses.push(expense);

        //Reset local storage(updated)
        localStorage.setItem("expenses", JSON.stringify(expenses));
      }
    },

    updateExpenseStorage: function(updatedExpense) {
      let expenses = JSON.parse(localStorage.getItem("expenses"));

      expenses.forEach(function(expense, index) {
        if (updatedExpense.id === expense.id) {
          expenses.splice(index, 1, updatedExpense);
        }
      });
      //Reset ls
      localStorage.setItem("expenses", JSON.stringify(expenses));
    },
    deleteExpenseFromStorage: function(id) {
      let expenses = JSON.parse(localStorage.getItem("expenses"));

      expenses.forEach(function(expense, index) {
        if (id === expense.id) {
          expenses.splice(index, 1);
        }
      });
      //Reset ls
      localStorage.setItem("expenses", JSON.stringify(expenses));
    },

    clearAllFromStorage: function() {
      localStorage.removeItem("expenses");
    },
    getExpenseFromStorage: function() {
      if (localStorage.getItem("expenses") === null) {
        expenses = [];
      } else {
        expenses = JSON.parse(localStorage.getItem("expenses"));
      }
      return expenses;
    }
  };
})();
