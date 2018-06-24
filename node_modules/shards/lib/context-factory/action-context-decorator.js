var Promise = require('bluebird');

function ActionContextDecorator(action){
    this._action = action || {};
}

ActionContextDecorator.prototype = {
    _action: undefined
};

ActionContextDecorator.prototype.decorate = function(context){
    if (this._action.init)
        this._action.init(context);

    return context;
};

module.exports = ActionContextDecorator;