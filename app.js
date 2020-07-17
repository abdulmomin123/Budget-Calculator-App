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
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item
      if (type === "inc") {
        newItem = new Income(ID, des, val);
      } else if (type === "exp") {
        newItem = new Expense(ID, des, val);
      }

      // Push item to Data structure
      data.allItems[type].push(newItem);

      return newItem;
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
    var input, newItem;

    // Get data from input fields
    input = UICTRL.getInput();

    // Add item to budget controller data structure
    newItem = budgetCTRL.addItem(input.type, input.description, input.value);

    // Add item to UI

    // Calculate the budget

    // Display the budget
  };

  return {
    init: setEventListners,
  };
})(budgetController, UIController);

controller.init();
