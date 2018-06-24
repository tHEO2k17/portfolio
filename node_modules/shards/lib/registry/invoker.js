function Invoker(action){
    this._action = action;
}

Invoker.prototype = {
    _action: undefined
};

Invoker.prototype.invoke = function(io){
    var _this = this;

    if(this._action.validates)
        return Promise.try(this._action.validates, io)
            .then(invokeActionPromise);

    return invokeActionPromise();

    function invokeActionPromise(){
        return Promise.resolve(_this._action.promise(_this._action.context, io));
    }
};

module.exports = Invoker;