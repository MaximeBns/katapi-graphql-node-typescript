require("source-map-support").install();
exports.id = "index";
exports.modules = {

/***/ "./src/schema.graphql":
false,

/***/ "./src/schema.ts":
false,

/***/ "./src/server.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("apollo-server-module-graphiql");
/* harmony import */ var apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
!(function webpackMissingModule() { var e = new Error("Cannot find module './schema'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("subscriptions-transport-ws");
/* harmony import */ var subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_8__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;









function graphiqlExpress(options) {
    var graphiqlHandler = function (req, res, next) {
        var query = req.url && url__WEBPACK_IMPORTED_MODULE_8__["parse"](req.url, true).query;
        apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1__["resolveGraphiQLString"](query, options, req).then(function (graphiqlString) {
            res.setHeader('Content-Type', 'text/html');
            res.write(graphiqlString);
            res.end();
        }, function (error) { return next(error); });
    };
    return graphiqlHandler;
}
/* harmony default export */ __webpack_exports__["default"] = (function (port) { return __awaiter(_this, void 0, Promise, function () {
    var app, server, apolloServer;
    return __generator(this, function (_a) {
        app = express__WEBPACK_IMPORTED_MODULE_3__();
        server = Object(http__WEBPACK_IMPORTED_MODULE_6__["createServer"])(app);
        app.use('*', cors__WEBPACK_IMPORTED_MODULE_2__({ origin: 'http://localhost:3000' }));
        apolloServer = new apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({
            playground: false,
            schema: !(function webpackMissingModule() { var e = new Error("Cannot find module './schema'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
        });
        apolloServer.applyMiddleware({ app: app, path: '/graphql' });
        if (true) {
            app.use('/graphiql', graphiqlExpress({
                endpointURL: '/graphql',
                query: '# Welcome to your own GraphQL server!\n#\n' +
                    '# Press Play button above to execute GraphQL query\n#\n' +
                    '# You can start editing source code and see results immediately\n\n' +
                    'query hello($subject:String) {\n  hello(subject: $subject)\n}',
                subscriptionsEndpoint: "ws://localhost:" + port + "/subscriptions",
                variables: { subject: 'World' }
            }));
        }
        return [2, new Promise(function (resolve) {
                server.listen(port, function () {
                    new subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_7__["SubscriptionServer"]({
                        execute: graphql__WEBPACK_IMPORTED_MODULE_5__["execute"],
                        schema: !(function webpackMissingModule() { var e = new Error("Cannot find module './schema'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
                        subscribe: graphql__WEBPACK_IMPORTED_MODULE_5__["subscribe"]
                    }, {
                        path: '/subscriptions',
                        server: server
                    });
                    resolve(server);
                });
            })];
    });
}); });


/***/ }),

/***/ "graphql-tools":
false

};
//# sourceMappingURL=index.a8ee0ed275864c7aba63.js.map