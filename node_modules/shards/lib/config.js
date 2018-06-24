var nest = require('./utils/nest.js');

module.exports = Config;

var KNOWN_CONFIGS = {
    DEFAULT: 'default',
    LOCAL: 'local'
};

function Config(env){
    if(!env)
        throw 'No environment provided';
    this.env = env;
}

Config.prototype = {
    env: undefined,
    _value: null,
    get value(){
        return this._value;
    }
};

Config.prototype.reset = function(){
    return this;
};

Config.prototype.load = function(configObject){
    this._value = configObject[KNOWN_CONFIGS.DEFAULT] || {};

    if(configObject[this.env])
        nest.merge(this._value, configObject[this.env]);

    if(configObject[KNOWN_CONFIGS.LOCAL] && configObject[KNOWN_CONFIGS.LOCAL][this.env])
        nest.merge(this._value, configObject[KNOWN_CONFIGS.LOCAL][this.env]);

    return this;
};

Config.prototype.loadPath = function(configPath){
    return Promise.resolve(this);
};
