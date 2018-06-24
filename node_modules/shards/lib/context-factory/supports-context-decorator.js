var nest  = require('../utils/nest.js');

var LAST_PATH_PART_REGEXP = /\.?\w+$/;

function SupportsContextDecorator(supports){
    this._supports = supports || {};
}

SupportsContextDecorator._trimPath = function(path){
    return path.split('.').splice(1).join('.');
};

SupportsContextDecorator.prototype = {
    _supports: undefined
};

SupportsContextDecorator.prototype.decorate = function(context, action){
    var supports = this._supports;
    var actionParentPaths = createParentPaths(action.path);
    context.supports = Object.keys(this._supports)
        .filter(sharesActionParentPath)
        .reduce(copySupport, {});
    return context;

    function createParentPaths(path){
        var parentPaths = [];
        do
            parentPaths.push(path);
        while(path = path.replace(LAST_PATH_PART_REGEXP, ''));

        return parentPaths;
    }

    function sharesActionParentPath(path){
        var parentPath = path.replace(LAST_PATH_PART_REGEXP, '');
        return actionParentPaths.indexOf(parentPath) != -1;
    }

    function copySupport(result, path){
        nest.set(result, SupportsContextDecorator._trimPath(path), supports[path]);
        return result;
    }
};

module.exports = SupportsContextDecorator;