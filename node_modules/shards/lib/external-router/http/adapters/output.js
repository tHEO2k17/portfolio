function OutputAdapter(options){
    this._options = options || {};
}

OutputAdapter.prototype = {
    _options: undefined
};

OutputAdapter.prototype.adaptOutput = function(promise, res){
    var _this = this;

    return promise
        .then(sendResult)
        .catch(sendError);

    function sendResult(result){
        if(!_this._options.skipOutput)
            res.status(200).send(result);

        return result;
    }

    function sendError(err){
        if(!_this._options.skipOutput)
            res.status(500).send(err);
        
        return Promise.reject(err);
    }
};

module.exports = OutputAdapter;