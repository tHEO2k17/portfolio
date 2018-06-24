function mergePrototypes(args){
    if (!arguments.length)
        throw new Error('Empty arguments');

    var prototypes = Array.prototype.map.call(arguments, getPrototype);
    var target = arguments[0];
    merge.apply(null, prototypes);
    return (target.prototype)? target : target.constructor;
}

function getPrototype(func){
    return func.prototype || func;
}

function merge(args){
    return Array.prototype.reduce.call(arguments, copyObject);

    function copyObject(destination, source){
        Object.getOwnPropertyNames(source).forEach(copyPropertyByName);
        return destination;

        function copyPropertyByName(property){
            copyProperty(source, property, destination);
        }
    }
}

function copyProperty(source, property, destination){
    Object.defineProperty(destination, property, Object.getOwnPropertyDescriptor(source, property));
}

module.exports = mergePrototypes;