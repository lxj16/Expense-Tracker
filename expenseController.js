//expense controller
const ExpCtrl = (function() {
  //Constructor
  const Expense = function(id, name, amount) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  };

  //Data Structure
  const data = {
    expenses: StorageCtrl.getExpenseFromStorage(),
    selected: null,
    totalAmount: 0
  };

  return {
    getExpenses: function() {
      return data.expenses;
    },

    addExpense: function(name, amount) {
      //create ID
      let ID;
      if (data.expenses.length > 0) {
        ID = data.expenses[data.expenses.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //amount to number
      amount = parseInt(amount);
      //create new expense
      newExpense = new Expense(ID, name, amount);
      data.expenses.push(newExpense);
      return newExpense;
    },

    getExpenseById: function(id) {
      let found = null;
      //loop through expenses
      data.expenses.forEach(function(expense) {
        if (expense.id === id) {
          found = expense;
        }
      });
      return found;
    },

    updateExpense: function(name, amount) {
      //amount to number
      amount = parseInt(amount);

      let found = null;
      //loop through expenses
      data.expenses.forEach(function(expense) {
        if (expense.id === data.selected.id) {
          expense.name = name;
          expense.amount = amount;
          found = expense;
        }
      });
      return found;
    },

    deleteExpense: function(id) {
      //Get ids
      const ids = data.expenses.map(function(expense) {
        return expense.id;
      });

      //Get index
      const index = ids.indexOf(id);

      //Remove expense
      data.expenses.splice(index, 1);
    },

    clearAllExpenses: function() {
      data.expenses = [];
    },

    setSelectedExpense: function(expense) {
      data.selected = expense;
    },

    getSelectedExpense: function() {
      return data.selected;
    },
    getTotalAmount: function() {
      let total = 0;
      data.expenses.forEach(function(expense) {
        total += expense.amount;
      });

      //set total amount in data structure
      data.totalAmount = total;

      return data.totalAmount;
    },
    logData: function() {
      return data;
    }
  };
})();
