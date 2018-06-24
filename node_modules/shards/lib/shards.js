require('./global');
var express = require('express');

var Loader = require('./loader/index.js');
var Registry = require('./registry/index');
var ContextFactory = require('./context-factory/index.js');
var ExternalRouter = require('./external-router/index');


function Shards(rootPath, env, fragments){
    this._rootPath = rootPath;
    this._env = env;
    this._fragments = fragments;
}

Shards.prototype = {
    _rootPath: undefined,
    _env: undefined,
    _fragments: undefined,

    _server: undefined,
    get server(){
        return this._server;
    },

    _config: undefined,
    get config(){
        return this._config;
    },

    _routes: undefined,
    get routes(){
        return this._routes;
    },

    _registry: undefined,
    get registry(){
        return this._registry;
    }
};

Shards.prototype.init = function(){
    var _this = this;

    return new Loader(this._rootPath, this._env, this._fragments).init()
        .tap(setConfig)
        .tap(setRoutes)
        .tap(createRegistry)
        .tap(injectContext)
        .tap(this._initServer.bind(this))
        .return(this);

    function setConfig(loader){
        _this._config = loader.config;
    }

    function setRoutes(loader){
        _this._routes = loader.routes;
    }

    function createRegistry(loader){
        _this._registry = new Registry(loader.actions, _this._fragments);
    }

    function injectContext(loader){
        var contextFactory =  new ContextFactory(_this._registry, loader.supports, loader.models);
        Object.keys(loader.actions).forEach(decorateAction);

        function decorateAction(actionPath){
            loader.actions[actionPath].context = contextFactory.buildContext(loader.actions[actionPath]);
        }
    }
};

Shards.prototype._initServer = function(){
    var routes = this.routes;
    this._server = express();
    var router = this._external = new ExternalRouter(this._server, this.registry, this.config);

    Object.keys(routes)
        .forEach(registerRoutes);
    this._server.listen(3000);

    function registerRoutes(routePath){
        routes[routePath](router);
    }
};

module.exports = Shards;