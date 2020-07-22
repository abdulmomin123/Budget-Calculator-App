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
    this.percentenge = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentenge = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentenge = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentenge;
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
    percentenge: -1,
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
      if (data.totals.inc > 0) {
        data.percentenge = Math.round(
          (data.totals.exp / data.totals.inc) * 100
        );
      } else {
        data.percentenge = -1;
      }
    },

    // Calculates percentenge
    calculatePercentages: function () {
      // Calculates percentage for each item
      data.allItems.exp.forEach((element) => {
        element.calcPercentage(data.totals.inc);
      });
    },

    // Gets all the percentages
    getPercentages: function () {
      var allPerc = data.allItems.exp.map((element) => {
        return element.getPercentage();
      });

      return allPerc;
    },

    // Gets the Budget
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentenge: data.percentenge,
      };
    },

    // Deletes item from data structure
    deleteItem: function (type, id) {
      var ids, index;

      // Stores all the id's in a new Array
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      // Gets the index
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
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
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentengeLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
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
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMStrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">0%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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

    // Prints the budget data to the dom
    displayBudget: function (obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expenseLabel).textContent =
        obj.totalExp;

      if (obj.percentenge > 0) {
        document.querySelector(DOMStrings.percentengeLabel).textContent =
          obj.percentenge + "%";
      } else {
        document.querySelector(DOMStrings.percentengeLabel).textContent = "...";
      }
    },

    deleteListItem: function (id) {
      // Selecting the elemnt we want to delte
      var elementId = document.getElementById(id);

      elementId.parentNode.removeChild(elementId);
    },

    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

      var nodeListForEach = function (list, callback) {
        for (i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      };

      nodeListForEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "...";
        }
      });
    },
  };
})();

// Global App Controller Module
var controller = (function (budgetCTRL, UICTRL) {
  var setEventListners = function () {
    var DOM = UICTRL.getDOMStrings();

    var addBtn = document.querySelector(DOM.inputBtn);
    var container = document.querySelector(DOM.container);

    addBtn.addEventListener("click", ctrlAddItem);

    // The enter event
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    // Delete event for delete button
    container.addEventListener("click", ctrlDeleteItem);
  };

  // Calcualte and display the budget
  var updateBudget = function () {
    // Calculate the budget
    budgetCTRL.calculateBudget();

    // Return Budget
    var budget = budgetCTRL.getBudget();

    // Display the budget
    UICTRL.displayBudget(budget);
  };

  // Adds an Item
  ctrlAddItem = function () {
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

      // Calculate and display updated percentages
      updatePercentages();
    }
  };

  // Deletes an item
  ctrlDeleteItem = function (event) {
    var itemId, splitId, type, ID;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      splitId = itemId.split("-");

      type = splitId[0];
      ID = parseInt(splitId[1]);
    }

    // Delete item from data structure
    budgetCTRL.deleteItem(type, ID);

    // Delete item from UI
    UICTRL.deleteListItem(itemId);

    // Update the Budget
    updateBudget();

    // Calculate and display updated percentages
    updatePercentages();
  };

  // Updates the percentages
  updatePercentages = function () {
    // Calculate the percentages
    budgetCTRL.calculatePercentages();

    // Read the percentages from Budget controller
    var percentages = budgetCTRL.getPercentages();

    // Display updated percentages
    UICTRL.displayPercentages(percentages);
  };

  return {
    init: setEventListners,
  };
})(budgetController, UIController);

controller.init();
