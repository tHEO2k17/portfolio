module.exports = function init(config){
    var allMessages = [{
        id: 0,
        tag: 'greeting',
        content: 'Welcome! :)'
    }, {
        id: 1,
        content: 'This is a temporary message board.'
    }, {
        id: 2,
        content: 'All messages will disappear as soon as the server restarts.'
    }];

    var MESSAGE_NOT_FOUND = 'Not found';

    var Message = {};

    Message.list = function(){
        return Promise.resolve(allMessages)
    };

    Message.listByTag = function(tag){
        if (!tag)
            return this.list();
        return Promise.resolve(allMessages.filter(hasTag));

        function hasTag(message){
            return message.tag && message.tag.toLowerCase() == tag.toLowerCase();
        }
    };

    Message.create = function(content, tag){
        var message = {
            id: allMessages.length,
            content: content,
            timestamp: Date.now()
        };
        if (tag)
            message.tag = tag;

        allMessages.push(message);
        return Promise.resolve(message);
    };

    Message.show = function(id){
        return (allMessages[id])? Promise.resolve(allMessages[id]) : Promise.reject(MESSAGE_NOT_FOUND);
    };

    return Message;
};