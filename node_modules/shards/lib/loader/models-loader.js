var mergePrototypes = require('../utils/merge-prototypes.js');

var DataLoader = require('./data-loader.js');

function ModelsLoader(fragments, config){
    DataLoader.call(this, 'models', fragments);
    this._config = config;
}

mergePrototypes(ModelsLoader, DataLoader, {
    _config: undefined
});

ModelsLoader.prototype.init = function(requires){
    var config = this._config;
    return Promise.reduce(Object.keys(requires), initModel, {});

    function initModel(result, path){
        return Promise.resolve(requires[path](config))
            .then(setModel)
            .return(result);

        function setModel(model){
            result[path] = model;
        }
    }
};

module.exports = ModelsLoader;