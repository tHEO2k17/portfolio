var InputAdapter = require('./input.js');
var OutputAdapter = require('./output.js');

function IOAdapter(action, routeConfig){
    this._action = action;
    this._routeConfig = routeConfig;
}

IOAdapter.prototype = {
    _action: undefined,
    _routeConfig: undefined
};

IOAdapter.prototype.createMiddleware = function(){
    var action = this._action;
    var input = new InputAdapter(this._routeConfig);
    var output = new OutputAdapter(this._routeConfig);

    return function(req, res, next){
        return input.createInput(req)
            .then(adaptOutput);

        function adaptOutput(input){
            return output.adaptOutput(action({input: input}), res);
        }
    };
};

module.exports = IOAdapter;