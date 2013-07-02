class JsLib
  constructor: ->

  sayHello: ->
    return "Hello World!"

if typeof define == 'function' && define.amd
  define ->
    return JsLib
else
  if typeof window == "object" && typeof window.document == "object"
    window.JsLib = JsLib
