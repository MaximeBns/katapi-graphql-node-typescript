require("source-map-support").install();
exports.id = "index";
exports.modules = {

/***/ "./src/resolvers.ts":
false,

/***/ "./src/schema.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql-tools");
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tools__WEBPACK_IMPORTED_MODULE_0__);
!(function webpackMissingModule() { var e = new Error("Cannot find module './resolvers'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/schema.graphql");
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_schema_graphql__WEBPACK_IMPORTED_MODULE_2__);



var executableSchema = Object(graphql_tools__WEBPACK_IMPORTED_MODULE_0__["makeExecutableSchema"])({
    typeDefs: _schema_graphql__WEBPACK_IMPORTED_MODULE_2__,
    resolvers: !(function webpackMissingModule() { var e = new Error("Cannot find module './resolvers'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
});
/* harmony default export */ __webpack_exports__["default"] = (executableSchema);


/***/ })

};
//# sourceMappingURL=index.c5741761f3b215b4fc8e.js.map