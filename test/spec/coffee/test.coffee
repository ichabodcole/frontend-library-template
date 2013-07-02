describe "sayHello", ->
  beforeEach ->
    @app = new JsLib()
  it "should return 'Hello World!'", ->
    expect(@app.sayHello()).to.equal "Hello World!"