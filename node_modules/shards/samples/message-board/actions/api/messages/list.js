module.exports = {
    promise: function(context, io){
        return context.models.Message.listByTag(io.input.query.tag);
    }
};