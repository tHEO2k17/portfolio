var nest = require('../utils/nest.js');
var IOAdapter = require('./http/adapters/io.js');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

function ExternalRouter(server, registry, config){
    this._server = server;
    this._registry = registry;
    this._config = config;
}

ExternalRouter.prototype = {
    _server: undefined,
    _registry: undefined,
    _config: undefined
};

ExternalRouter.prototype.registerRoute = function(method, route, actionPath, routeConfig){
    if (!method || !route || !actionPath)
        throw new Error('Missing arguments');
    routeConfig = routeConfig || {};
    var action = nest.get(this._registry.actions, actionPath);
    if (!action)
        throw new Error('Invalid action path: ' + actionPath);
    var middleware = new IOAdapter(action, routeConfig).createMiddleware();

    var expressMiddlewares = getExpressMiddlewares();
    expressMiddlewares.push(middleware);

    method = method.toLowerCase();

    this._server[method](route, expressMiddlewares);

    function getExpressMiddlewares(){
        var middlewares = [];

        middlewares.push(bodyParser.json());

        if(routeConfig.session){
            middlewares.push(cookieParser());
            middlewares.push(expressSession());
        }

        return middlewares;
    }
};

ExternalRouter.prototype.get = function(route, action, routeConfig){
    return this.registerRoute('GET', route, action, routeConfig);
};

ExternalRouter.prototype.post = function(route, action, routeConfig){
    return this.registerRoute('POST', route, action, routeConfig);
};

ExternalRouter.prototype.put = function(route, action, routeConfig){
    return this.registerRoute('PUT', route, action, routeConfig);
};

ExternalRouter.prototype.delete = function(route, action, routeConfig){
    return this.registerRoute('DELETE', route, action, routeConfig);
};

module.exports = ExternalRouter;