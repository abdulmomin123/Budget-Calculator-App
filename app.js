// Budget Controller Module
var budgetController = (function () {
  // Function Constructors
  var Income, Expense;

  Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Main Data Structure
  var data;
  data = {
    allItems: {
      incomes: [],
      expenses: [],
    },

    totals: {
      incomes: 0,
      expenses: 0,
    },
  };
})();

// UI Controller Module
var UIController = (function () {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },

    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

// General App Controller Module
var controller = (function (budgetCTRL, UICTRL) {
  var setEventListners = function () {
    var DOM = UICTRL.getDOMStrings();

    var addBtn = document.querySelector(DOM.inputBtn);

    addBtn.addEventListener("click", ctrlAddItem);

    // The enter event
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  // Add Item
  var ctrlAddItem = function () {
    // Get data from input fields
    var input = UICTRL.getInput();
    console.log(input);

    // Add item to budget controller

    // Add item to UI

    // Calculate the budget

    // Display the budget
  };

  return {
    init: setEventListners,
  };
})(budgetController, UIController);

controller.init();
