var nest = {};

var REGEXP = {
    ALLOWED_CHARACTERS: /[A-Za-z0-9\.\-\_]/g,
    STARTING_DOT: /^\./g,
    TRAILING_DOT: /\.$/,
    MULTIPLE_DOTS: /\.+/g
};

nest.normalize = function(path){
    if (!path)
        return '';
    return path
        .match(REGEXP.ALLOWED_CHARACTERS)
        .join('')
        .replace(REGEXP.STARTING_DOT, '')
        .replace(REGEXP.TRAILING_DOT, '')
        .replace(REGEXP.MULTIPLE_DOTS, '.');
};

nest.exists = function(object, path){
    if (!object)
        throw new Error('Missing object');
    return !(nest.normalize(path)
        .split('.')
        .some(childDoesNotExist));

    function childDoesNotExist(path){
        if(!object.hasOwnProperty(path))
            return true;
        object = object[path];
        return false;
    }
};

nest.paths = function(object){
    return Object.keys(object)
        .reduce(lookupPath, []);

    function lookupPath(lookedUpPaths, path){
        var value = nest.get(object, path);
        if (isObjectWithNestedKeys(value)){
            return  Object.keys(value)
                .map(prependCurrentPath)
                .reduce(lookupPath, lookedUpPaths);
        }
        lookedUpPaths.push(path);
        return lookedUpPaths;

        function prependCurrentPath(prependTo){
            return path + '.' + prependTo;
        }
    }

    function isObjectWithNestedKeys(o){
        return (typeof(o) != 'function')
            && (o === Object(o))
            && !(o instanceof Array)
            && !(o instanceof Date)
            && (Object.keys(o).length);
    }
};

nest.get = function (object, path) {
    if (!object)
        throw new Error('Missing object');
    return nest.normalize(path)
        .split('.')
        .reduce(getProperty, object);

    function getProperty(object, property){
        if (!property)
            return object;
        return (object)? object[property] : undefined;
    }
};

nest.set = function (target, path, value){
    if (!path)
        throw new Error('Empty path');
    path = nest.normalize(path)
        .split('.');
    var parentPaths = path.slice(0, path.length - 1);
    var childPath = path[path.length - 1];

    parentPaths.reduce(createProperty, target)[childPath] = value;
    return target;

    function createProperty(target, property){
        return target[property] = target[property] || {};
    }
};

nest.retain = function(target, paths, source){
    return paths
        .map(nest.normalize)
        .reduce(retainPath, target);

    function retainPath(target, path){
        var value = nest.get(source, path);
        if(value === undefined)
            return target;
        return nest.set(target, path, value);
    }
};

nest.replace = function(target, paths, source){
    if (!target)
        throw new Error('Missing target');
    if (!source)
        throw new Error('Missing source');

    var existsInTarget = nest.exists.bind(null, target);
    var existsInSource = nest.exists.bind(null, source);
    var existingPaths = paths
        .filter(existsInTarget)
        .filter(existsInSource);
    return nest.retain(target, existingPaths, source);
};

nest.flatten = function(object){
    return nest.paths(object)
        .reduce(setValues, {});

    function setValues(result, path){
        result[path] = nest.get(object, path);
        return result;
    }
};

nest.inflate = function(object){
    if (!object)
        throw new Error('Missing object');
    return Object.keys(object)
        .map(nest.normalize)
        .reduce(nestProperty, {});

    function nestProperty(result, propertyName){
        return nest.set(result, propertyName, object[propertyName]);
    }
};

nest.merge = function(target, source){
    return nest.retain(target, nest.paths(source), source);
};

module.exports = nest;