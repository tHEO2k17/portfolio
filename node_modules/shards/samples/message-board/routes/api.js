module.exports = function(router){
    router.get('/messages', 'api.messages.list');
    router.get('/message/:id', 'api.messages.show');
    router.post('/message', 'api.messages.create');
};