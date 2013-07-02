(function() {
  var JsLib;

  JsLib = (function() {
    function JsLib() {}

    JsLib.prototype.sayHello = function() {
      return "Hello World!";
    };

    return JsLib;

  })();

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return JsLib;
    });
  } else {
    if (typeof window === "object" && typeof window.document === "object") {
      window.JsLib = JsLib;
    }
  }

}).call(this);
