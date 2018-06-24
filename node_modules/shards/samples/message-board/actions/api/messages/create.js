module.exports = {
    promise: function(context, io){
        return context.models.Message.create(io.input.body.content);
    }
};