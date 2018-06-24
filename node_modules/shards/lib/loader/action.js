function Action(content, path){
    this._validateContent(content);
    this._validatePath(path);

    this._content = content;
    this._path = path;
}

Action.prototype = {
    _content: undefined,
    _path: undefined,
    get path(){
        return this._path;
    },
    get fragment(){
        return this._path.split('.')[0];
    },
    get init(){
        return this._content.init;
    },
    get validates(){
        return this._content.validates;
    },
    get promise(){
        return this._content.promise;
    }
};

Action.prototype._validateContent = function(content){
    if(!content)
        throw new Error('Invalid content');

    validateInit(content);
    validateValidates(content);
    validatePromise(content);

    function validateInit(content){
        if (content.init && typeof(content.init) != 'function')
            throw new Error('Invalid init function');
    }

    function validateValidates(content){
        if(content.validates && typeof(content.validates) != 'function')
            throw new Error('Invalid validates function');
    }

    function validatePromise(content){
        if(!content.promise || typeof(content.promise) != 'function')
            throw new Error('Invalid promise function');
    }
};

Action.prototype._validatePath = function(path){
    if(!path
        || typeof(path) != 'string'
        || path == ''
        || path.indexOf('.') == -1)
        throw new Error('Invalid path');

};

module.exports = Action;