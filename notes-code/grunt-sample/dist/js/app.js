"use strict";

var p = new Promise(function (resolve) {
  console.log(1);
  setTimeout(function () {
    resolve();
  }, 1000);
});
//# sourceMappingURL=app.js.map
