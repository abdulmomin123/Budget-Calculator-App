var budgetController = (function () {
  a = 10;

  function addNumbers(a, b) {
    return a + b;
  }

  return {
    publicAddNumbers: addNumbers,
  };
})();

var UIController = (function () {
  // Code goes here
})();

var controller = (function (budgetCTRL, UICTRL) {
  // Code goes here
  var h1 = budgetCTRL.publicAddNumbers(a, 10);

  return {
    public: function () {
      console.log(h1);
    },
  };
})(budgetController, UIController);

controller.public();
