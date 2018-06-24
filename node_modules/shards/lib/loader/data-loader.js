function DataLoader(root, fragments){
    if (!root)
        throw new Error('Missing root.');
    this._root = root;
    this._fragments = (typeof(fragments) == 'string')? [fragments] : fragments;
}

DataLoader.prototype = {
    _root: undefined,
    _fragments: undefined
};

DataLoader.prototype.load = function(requires){
    return this.init(this.filter(requires));
};

DataLoader.prototype.filter = function(requires){
    var filterFragment = this._filterFragment.bind(this);
    var filterPath = this._filterPath.bind(this);
    var trimPath = this._trimPath.bind(this);

    return Object.keys(requires)
        .filter(filterFragment)
        .filter(filterPath)
        .reduce(copyData, {});

    function copyData(result, path){
        result[trimPath(path)] = requires[path];
        return result;
    }
};

DataLoader.prototype.init = function(requires){
    return requires;
};

DataLoader.prototype._filterFragment = function(path){
    if (!this._fragments)
        return true;
    var pathFragment = path.split('.')[1];
    return pathFragment && this._fragments.indexOf(pathFragment) != -1;
};

DataLoader.prototype._filterPath = function(path){
    return path.split('.').indexOf(this._root) == 0;
};

DataLoader.prototype._trimPath = function(path){
    return path.split('.').splice(1).join('.');
};

module.exports = DataLoader;