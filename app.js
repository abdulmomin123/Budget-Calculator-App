// Budget Controller Module
var budgetController = (function () {
  // Code goes here
})();

// UI Controller Module
var UIController = (function () {
  // Code goes here
})();

// General App Controller Module
var controller = (function (budgetCTRL, UICTRL) {
  var addBtn = document.querySelector(".add__btn");

  var ctrlAddItem = function () {
    // Get data from input fields
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
