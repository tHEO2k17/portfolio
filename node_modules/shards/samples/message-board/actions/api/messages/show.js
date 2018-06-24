module.exports = {
    promise: function(context, io){
        return context.models.Message.show(io.input.params.id);
    }
};