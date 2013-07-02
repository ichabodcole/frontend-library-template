(function() {
  describe("sayHello", function() {
    beforeEach(function() {
      return this.app = new JsLib();
    });
    return it("should return 'Hello World!'", function() {
      return expect(this.app.sayHello()).to.equal("Hello World!");
    });
  });

}).call(this);
