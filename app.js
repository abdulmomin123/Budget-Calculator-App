var budgetController = (function () {
  a = 10;

  function addNumbers(a, b) {
    console.log(a + b);
  }

  return {
    publicAddNumbers: addNumbers,
  };
})();

budgetController.publicAddNumbers(a, 10);
