var ModelsContextDecorator = requireImpl('/lib/context-factory/models-context-decorator.js');

describe('ModelsContextDecorator', function(){
    describe('constructor', function(){
        it('should not throw an error when no models are given', function(){
            function createModelsContextDecoratorWithoutModels(){
                return new ModelsContextDecorator();
            }

            expect(createModelsContextDecoratorWithoutModels).to.not.throw();
        });
    });

    describe('#decorate()', function(){
        it('should decorate the provided context itself', function(){
            var models = {
                'api.user': {
                    find: 'user.find content'
                }
            };
            var context = {};
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            new ModelsContextDecorator(models).decorate(context, action);

            expect(context).to.deep.equal({
                models: {
                    user: {
                        find: 'user.find content'
                    }
                }
            });
        });

        it('should return the provided context', function(){
            var models = {};
            var context = {};
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            expect(new ModelsContextDecorator(models).decorate(context, action)).to.equal(context);
        });

        it('should only decorate the context with models belonging to the action fragment', function(){
            var models = {
                'api.message': {
                    find: 'message.find content'
                },
                'id.user': {
                    find: 'user.find content'
                }
            };
            var context = {};
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            expect(new ModelsContextDecorator(models).decorate(context, action)).to.deep.equal({
                models: {
                    message: {
                        find: 'message.find content'
                    }
                }
            });
        });

        it('should throw an error when no action is given', function(){
            function decorateContextWithoutAction(){
                var models = {
                    'api.message': {
                        find: 'message.find content'
                    }
                };
                var context = {};

                return new ModelsContextDecorator(models).decorate(context);
            }

            expect(decorateContextWithoutAction).to.throw();
        });

        it('should merge the models in the given context', function(){
            var models = {
                'api.message': {
                    find: 'message.find content'
                }
            };
            var context = {
                supports: {
                    merge: 'merge content'
                }
            };
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            expect(new ModelsContextDecorator(models).decorate(context, action)).to.deep.equal({
                models: {
                    message: {
                        find: 'message.find content'
                    }
                },
                supports: {
                    merge: 'merge content'
                }
            });
        });
    });
});
