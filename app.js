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

  calculateTotal = function (type) {
    sum = 0;

    // calculate
    data.allItems[type].forEach(function (current) {
      sum += current.value;
    });

    // store
    data.totals[type] = sum;
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

    budget: 0,
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

    // Calculates the budget
    calculateBudget: function (type) {
      // Calculate total income and expense
      calculateTotal("inc");
      calculateTotal("exp");

      // Calculate the budget
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentenge
    },

    test: function () {
      console.log(data);
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
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };

  return {
    getDOMStrings: function () {
      return DOMStrings;
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },

    // Adds list to the UI
    addListItem: function (obj, type) {
      var html, newHtml, element;

      // Create an HTML string with placeholder text
      if (type === "inc") {
        element = DOMStrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMStrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with object data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // Insert HTML to the dom
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function () {
      var fields, fieldsArray;

      fields = document.querySelectorAll(
        DOMStrings.inputDescription + ", " + DOMStrings.inputValue
      );

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function (current) {
        current.value = "";
      });
      fieldsArray[0].focus();
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

  // Calcualte and display the budget
  var updateBudget = function () {
    // Calculate the budget
    budgetCTRL.calculateBudget();

    // Return Budget
    // Display the budget
  };

  // Add Item
  var ctrlAddItem = function () {
    var input, newItem;

    // Get data from input fields
    input = UICTRL.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Add item to budget controller data structure
      newItem = budgetCTRL.addItem(input.type, input.description, input.value);

      // Add item to UI
      UICTRL.addListItem(newItem, input.type);

      // Clear Input fields
      UICTRL.clearFields();

      // Calculate and Update the budget
      updateBudget();
    }
  };

  return {
    init: setEventListners,
  };
})(budgetController, UIController);

controller.init();
