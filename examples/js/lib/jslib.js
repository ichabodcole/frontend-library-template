(function() {
  window.app = typeof app !== "undefined" && app !== null ? app : {};

  app.sayHello = function() {
    return "Hello World!";
  };

}).call(this);
