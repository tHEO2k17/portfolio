var ModelsContextDecorator = require('./models-context-decorator.js');
var SupportsContextDecorator = require('./supports-context-decorator.js');
var ActionContextDecorator = require('./action-context-decorator.js');

function ContextFactory(registry, supports, models){
    this._registry = registry;
    this._supports = new SupportsContextDecorator(supports);
    this._models = new ModelsContextDecorator(models);
}

ContextFactory.prototype = {
    _registry: undefined,
    _supports: undefined,
    _models: undefined
};

ContextFactory.prototype.buildContext = function(action){
    var context = {};
    this._models.decorate(context, action);
    this._supports.decorate(context, action);
    new ActionContextDecorator(action).decorate(context);
    context.actions = this._registry.actions;
    return context;
};

module.exports = ContextFactory;