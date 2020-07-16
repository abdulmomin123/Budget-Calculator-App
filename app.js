// Budget Controller Module
var budgetController = (function () {
  // Code goes here
})();

// UI Controller Module
var UIController = (function () {
  return {
    getInput: function () {
      return {
        type: document.querySelector(".add__type").value, // inc or exp
        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value,
      };
    },
  };
})();

// General App Controller Module
var controller = (function (budgetCTRL, UICTRL) {
  var addBtn = document.querySelector(".add__btn");

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
