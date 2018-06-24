var nest = require('../../../utils/nest.js');

function InputAdapter(options){
    this._options = options || {};
}

InputAdapter.prototype = {
    _options: undefined
};

InputAdapter.prototype.createInput = function(req, res, next){
    var input  = {
        params: nest.inflate(req.params || {}),
        body: nest.inflate(req.body || {}),
        query: nest.inflate(req.query || {})
    };

    if(this._options.files && req.files)
        input.files = nest.inflate(req.files);

    if(this._options.session && req.session)
        input.session = nest.inflate(req.session);

    return Promise.resolve(input);
};

module.exports = InputAdapter;