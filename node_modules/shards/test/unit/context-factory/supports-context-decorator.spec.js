var SupportsContextDecorator = requireImpl('/lib/context-factory/supports-context-decorator.js');

describe('SupportsContextDecorator', function(){
    describe('constructor', function(){
        it('should not throw an error when no supports are given', function(){
            function createSupportsContextDecoratorWithoutSupports(){
                return new SupportsContextDecorator();
            }

            expect(createSupportsContextDecoratorWithoutSupports).to.not.throw();
        });
    });

    describe('#decorate()', function(){
        it('should decorate the provided context itself', function(){
            var context = {};
            var supports = {
                'api.users.serialize': 'serialize content',
                'api.users.merge': 'merge content'
            };
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            var supportsContextDecorator = new SupportsContextDecorator(supports);
            supportsContextDecorator.decorate(context, action);

            expect(context).to.deep.equal({
                supports: {
                    users: {
                        serialize: 'serialize content',
                        merge: 'merge content'
                    }
                }
            });
        });

        it('should return the provided context', function(){
            var context = {};
            var supports = {};
            var supportsContextDecorator = new SupportsContextDecorator(supports);
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            expect(supportsContextDecorator.decorate(context, action)).to.equal(context);
        });

        it('should contain same-level supports', function(){
            var supports = {
                'api.users.serialize': 'serialize content',
                'api.users.merge': 'merge content'
            };
            var supportsContextDecorator = new SupportsContextDecorator(supports);
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            expect(supportsContextDecorator.decorate({}, action)).to.deep.equal({
                supports: {
                    users:{
                        serialize: 'serialize content',
                        merge: 'merge content'
                    }
                }
            });
        });

        it('should contain parent-level supports', function(){
            var supports = {
                'api.users.serialize': 'serialize content',
                'api.users.merge': 'merge content'
            };
            var supportsContextDecorator = new SupportsContextDecorator(supports);
            var action = {
                path: 'api.users.published.list',
                fragment: 'api'
            };

            expect(supportsContextDecorator.decorate({}, action)).to.deep.equal({
                supports: {
                    users: {
                        serialize: 'serialize content',
                        merge: 'merge content'
                    }
                }
            });
        });

        it('should not contain a sibling\'s support', function(){
            var supports = {
                'api.users.serialize': 'serialize content'
            };
            var supportsContextDecorator = new SupportsContextDecorator(supports);
            var action = {
                path: 'api.messages',
                fragment: 'api'
            };

            expect(supportsContextDecorator.decorate({}, action)).to.deep.equal({ supports: {} });
        });

        it('should be empty for an action path without supports', function(){
            var supports = {};
            var supportsContextDecorator = new SupportsContextDecorator(supports);
            var action = {
                path: 'api.users'
            };

            expect(supportsContextDecorator.decorate({}, action)).to.deep.equal({ supports: {} });
        });

        it('should keep the properties of the original context', function(){
            var context = {
                models: { User: 'User Model' }
            };

            var supports = {
                'api.users.serialize': 'serialize content',
                'api.users.merge': 'merge content'
            };
            var action = {
                path: 'api.users.list',
                fragment: 'api'
            };

            var supportsContextDecorator = new SupportsContextDecorator(supports);
            expect(supportsContextDecorator.decorate(context, action)).to.deep.equal({
                supports:{
                    users: {
                        serialize: 'serialize content',
                        merge: 'merge content'
                    }
                },
                models: {
                    User: 'User Model'
                }
            });
        });
    });
});