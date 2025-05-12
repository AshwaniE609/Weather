"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CONFIG_FILE_NAME: function() {
        return CONFIG_FILE_NAME;
    },
    DEFAULT_CONFIG: function() {
        return DEFAULT_CONFIG;
    },
    DataSource: function() {
        return OpenWeatherDataSource;
    },
    SourceType: function() {
        return SourceType;
    },
    Type: function() {
        return Type;
    },
    default: function() {
        return OpenWeatherDataSource;
    }
});
const _core = require("@godspeedsystems/core");
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
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
class OpenWeatherDataSource extends _core.GSDataSource {
    initClient() {
        return _async_to_generator(function*() {
            const client = _axios.default.create({
                baseURL: this.config.base_url || "https://api.openweathermap.org/data/2.5"
            });
            return client;
        }).call(this);
    }
    execute(ctx, args) {
        return _async_to_generator(function*() {
            try {
                var _args_meta;
                const city = ((_args_meta = args.meta) === null || _args_meta === void 0 ? void 0 : _args_meta.city) || "London";
                const apiKey = this.config.api_key;
                const response = yield this.client.get("/weather", {
                    params: {
                        q: city,
                        appid: apiKey
                    }
                });
                return new _core.GSStatus(true, 200, "Weather fetched!", response.data);
            } catch (err) {
                ctx.childLogger.error("Error fetching weather", err);
                return new _core.GSStatus(false, 500, "Failed to fetch weather", {
                    error: err.message
                });
            }
        }).call(this);
    }
}
const SourceType = "DS";
const Type = 'REST';
const CONFIG_FILE_NAME = "openweather"; // this links to your YAML
const DEFAULT_CONFIG = {
    base_url: "https://api.openweathermap.org/data/2.5",
    api_key: "027535cb5e8f9cc8283ec06315a2b272"
};

//# sourceMappingURL=REST.js.map