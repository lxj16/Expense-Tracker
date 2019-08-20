//app controller
const App = (function(ExpCtrl, StorageCtrl, UICtrl) {
  //Load event listeners
  const loadEventListeners = function() {
    //GET UI selectors
    const UISelectors = UICtrl.getSelectors();

    //Add exp event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", expenseAddSubmit);

    //Edit icon click event
    document
      .querySelector(UISelectors.expenseList)
      .addEventListener("click", expenseEditClick);

    //Disable enter
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Update expense event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", expenseUpdateSubmit);

    //Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    //Delete button event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", expenseDeleteSubmit);

    //Clear all button event
    document
      .querySelector(UISelectors.clearAllBtn)
      .addEventListener("click", clearAllExpensesClick);
  };
  //Add exp submit
  const expenseAddSubmit = function(e) {
    //Get form input from UI Controller
    const input = UICtrl.getExpenseInput();

    //Validate inputs
    if (input.name !== "" && input.amount !== "") {
      //Add expense
      const newExpense = ExpCtrl.addExpense(input.name, input.amount);

      //Add expense to UI list
      UICtrl.addListExpense(newExpense);

      //Get total expenses
      const totalAmount = ExpCtrl.getTotalAmount();

      //Update total amount
      UICtrl.showTotalAmount(totalAmount);

      //Store in local storage
      StorageCtrl.storeExpense(newExpense);

      //Clear form fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  };

  //click expense edit
  const expenseEditClick = function(e) {
    if (e.target.classList.contains("edit-expense")) {
      //Get expense id
      const expenseId = e.target.parentNode.parentNode.id;

      //Split the id, get only the number
      const expIdArr = expenseId.split("-");

      //get the id
      const id = parseInt(expIdArr[1]);

      //Get the actual expense
      const expenseToEdit = ExpCtrl.getExpenseById(id);
      //Set selected expense

      ExpCtrl.setSelectedExpense(expenseToEdit);

      //Add expense to form
      UICtrl.addExpenseToForm();
    }
    e.preventDefault();
  };

  //Update expense
  const expenseUpdateSubmit = function(e) {
    //Get input
    const input = UICtrl.getExpenseInput();

    //Update expense
    const updatedExpense = ExpCtrl.updateExpense(input.name, input.amount);

    //Update UI
    UICtrl.updateListExpense(updatedExpense);

    //Get total expenses
    const totalAmount = ExpCtrl.getTotalAmount();

    //Update local storage
    StorageCtrl.updateExpenseStorage(updatedExpense);

    //Update total amount
    UICtrl.showTotalAmount(totalAmount);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  //Delete expense
  const expenseDeleteSubmit = function(e) {
    //Get selected expense
    const selected = ExpCtrl.getSelectedExpense();

    //Delete from data structure
    ExpCtrl.deleteExpense(selected.id);

    //Delete from UI
    UICtrl.deleteListExpense(selected.id);

    //Get total expenses
    const totalAmount = ExpCtrl.getTotalAmount();

    //Update total amount
    UICtrl.showTotalAmount(totalAmount);

    //Delete from ls
    StorageCtrl.deleteExpenseFromStorage(selected.id);
    UICtrl.clearEditState();

    e.preventDefault();
  };

  //Clear all event
  const clearAllExpensesClick = function() {
    //Delete all entries from data
    ExpCtrl.clearAllExpenses();

    //Remove from UI
    UICtrl.clearAll();
    //Get total expenses
    const totalAmount = ExpCtrl.getTotalAmount();
    //Update total amount
    UICtrl.showTotalAmount(totalAmount);

    //Clear from local storage
    StorageCtrl.clearAllFromStorage();

    UICtrl.clearEditState();
  };

  return {
    init: function() {
      //Clear edit state
      UICtrl.clearEditState();

      //fetch expenses from data base
      const expenses = ExpCtrl.getExpenses();

      //check if any expenses
      if (expenses.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateExpList(expenses);
      }
      //Populate list with items
      UICtrl.populateExpList(expenses);

      //Get total expenses
      const totalAmount = ExpCtrl.getTotalAmount();

      //Update total amount
      UICtrl.showTotalAmount(totalAmount);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ExpCtrl, StorageCtrl, UICtrl);

//initialize
App.init();
