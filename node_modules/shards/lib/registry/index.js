var nest = require('../utils/nest.js');
var Invoker = require('./invoker.js');

function Registry(actions, fragments){
    this._fragments = fragments;

    this._actions = Object.keys(actions)
        .reduce(createInvoker, {});

    function createInvoker(result, actionPath){
        var invoker = new Invoker(actions[actionPath]);
        nest.set(result, actionPath, invoker.invoke.bind(invoker));
        return result;
    }
}

Registry.prototype = {
    _fragments: undefined,
    _actions: undefined,
    get actions(){
        return this._actions;
    }
};

module.exports = Registry;