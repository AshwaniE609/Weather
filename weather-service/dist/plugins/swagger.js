"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SwaggerPlugin;
    }
});
const _core = require("@godspeedsystems/core");
const _swaggeruiexpress = /*#__PURE__*/ _interop_require_default(require("swagger-ui-express"));
const _yamljs = /*#__PURE__*/ _interop_require_default(require("yamljs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class SwaggerPlugin extends _core.GSPlugin {
    register() {
        const swaggerPath = _path.default.resolve(process.cwd(), "swagger.yaml");
        const swaggerDocument = _yamljs.default.load(swaggerPath);
        this.godspeed.app.use("/api-docs", _swaggeruiexpress.default.serve, _swaggeruiexpress.default.setup(swaggerDocument));
        this.logger.info("📘 Swagger UI available at /api-docs");
    }
    start() {
        return _async_to_generator(function*() {
        // No extra logic needed
        })();
    }
    stop() {
        return _async_to_generator(function*() {
        // Nothing to clean up
        })();
    }
}

//# sourceMappingURL=swagger.js.map