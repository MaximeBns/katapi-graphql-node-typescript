require("source-map-support").install();
exports.id = "index";
exports.modules = {

/***/ "./src/resolvers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    Query: {
        hello: function (obj, _a) {
            var subject = _a.subject;
            console.log(obj);
            return "Hello, " + subject + "! from Server";
        }
    }
});


/***/ })

};
//# sourceMappingURL=index.8f85e648bf64b4c072cb.js.map