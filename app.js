// Budget Controller Module
var budgetController = (function () {
  // Code goes here
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
  var DOM = UICTRL.getDOMStrings();
  var addBtn = document.querySelector(DOM.inputBtn);

  var ctrlAddItem = function () {
    // Get data from input fields
    var input = UICTRL.getInput();

    // Add item to budget controller

    // Add item to UI

    // Calculate the budget

    // Display the budget
  };
  addBtn.addEventListener("click", ctrlAddItem);

  // The enter event
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
