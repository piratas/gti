var GTI = require("./internals/controller.js");

require("dom-ready")(function () {
    window.gti = new GTI().run();
}); 
