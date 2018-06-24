var path = require('path');
var requireAll = require('../utils/require-all.js');

var Config = require('../config.js');

var DataLoader = require('./data-loader.js');
var ActionsLoader = require('./actions-loader.js');
var SupportsLoader = require('./supports-loader.js');
var ModelsLoader = require('./models-loader.js');

function Loader(rootPath, env, fragments){
    this._rootPath = path.join(rootPath);
    this._env = env;
    this._fragments = fragments;

    this._loadConfig = this._loadConfig.bind(this);
    this._loadData = this._loadData.bind(this);
}

Loader.prototype = {
    _rootPath: undefined,
    _fragments: undefined,
    _env: undefined,

    _config: undefined,
    get config(){
        return this._config;
    },

    _actions: undefined,
    get actions(){
        return this._actions;
    },

    _supports: undefined,
    get supports(){
        return this._supports;
    },

    _models: undefined,
    get models(){
        return this._models;
    },

    _routes: undefined,
    get routes(){
        return this._routes
    },

    get _configPath(){
        return path.join(this._rootPath, 'config');
    }
};

Loader.prototype.init = function(){
    return this._loadConfig()
        .then(this._loadData)
        .return(this);
};

Loader.prototype._loadConfig = function(){
    var _this = this;
    return requireAll(this._configPath)
        .then(getConfig)
        .tap(setConfig);

    function getConfig(configObject){
        return new Config(_this._env).load(configObject).value;
    }

    function setConfig(config){
        return _this._config = config;
    }
};

Loader.prototype._loadData = function(){
    var _this = this;

    return requireRootPath()
        .then(loadComponents)
        .spread(setComponents)
        .return(this);

    function requireRootPath(){
        return requireAll(_this._rootPath, {flatten: true});
    }

    function loadComponents(requires){
        return Promise.all([
            Promise.resolve(new ActionsLoader(_this._fragments).load(requires)),
            Promise.resolve(new SupportsLoader(_this._fragments).load(requires)),
            Promise.resolve(new ModelsLoader(_this._fragments, this._config).load(requires)),
            Promise.resolve(new DataLoader('routes', _this._fragments).load(requires))
        ]);
    }

    function setComponents(actions, supports, models, routes){
        _this._actions = actions;
        _this._supports = supports;
        _this._models = models;
        _this._routes = routes;
    }
};

module.exports = Loader;