var Promise = require('bluebird');

var nest = require('../utils/nest.js');

function ModelsContextDecorator(models){
    this._models = models || {};
}

ModelsContextDecorator._trimPath = function(path){
    return path.split('.').splice(1).join('.');
};

ModelsContextDecorator.prototype = {
    _models: undefined
};

ModelsContextDecorator.prototype.decorate = function(context, action){
    if(!action)
        throw new Error('Missing action');
    var models = this._models;
    context.models = Object.keys(this._models)
        .filter(pathBelongsToFragment)
        .reduce(copyModel, {});
    return context;

    function pathBelongsToFragment(path){
        return path.split('.').indexOf(action.fragment) == 0;
    }

    function copyModel(result, path){
        nest.set(result, ModelsContextDecorator._trimPath(path), models[path]);
        return result;
    }
};

module.exports = ModelsContextDecorator;