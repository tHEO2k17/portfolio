var mergePrototypes = require('../utils/merge-prototypes.js');

var DataLoader = require('./data-loader.js');
var Action = require('./action.js');

function ActionsLoader(fragments){
    DataLoader.call(this, 'actions', fragments);
}

mergePrototypes(ActionsLoader, DataLoader);

ActionsLoader.prototype.init = function(requires){
    return Object.keys(requires).reduce(castToAction, {});

    function castToAction(result, path){
        result[path] = new Action(requires[path], path);
        return result;
    }
};

ActionsLoader.prototype._filterPath = function(path){
    var pathParts = path.split('.');
    return (pathParts.indexOf(this._root) == 0) && (pathParts.indexOf('supports') == -1);
};


module.exports = ActionsLoader;