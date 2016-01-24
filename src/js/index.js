var GTI = require("./internals/controller.js");
var domReady = require("domready");

domReady(function () {
    window.gti = new GTI().run();
}); 
