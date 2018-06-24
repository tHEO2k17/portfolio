var mergePrototypes = require('../utils/merge-prototypes.js');

var DataLoader = require('./data-loader.js');

function SupportsLoader(fragments){
    DataLoader.call(this, 'actions', fragments);
}

mergePrototypes(SupportsLoader, DataLoader);

SupportsLoader.prototype._filterPath = function(path){
    var pathParts = path.split('.');
    return (pathParts.indexOf(this._root) == 0) && (pathParts.indexOf('supports') != -1);
};

SupportsLoader.prototype._trimPath = function(path){
    return path
        .split('.')
        .splice(1)
        .filter(notSupports)
        .join('.');

    function notSupports(pathParts){
        return pathParts != 'supports';
    }
};

module.exports = SupportsLoader;