var ModelsLoader = requireImpl('lib/loader/models-loader.js');

describe('ModelsLoader', function(){
    describe('#filter()', function(){
        it('should return all models if no fragment is provided', function(){
            var requires = {
                'actions.api.users.show': 'users.show content',
                'models.api.user': 'user content'
            };

            expect(new ModelsLoader().filter(requires)).to.deep.equal({
                'api.user': 'user content'
            });
        });

        it('should return only the models belonging to a given fragment', function(){
            var fragment = 'api';
            var requires = {
                'models.api.user': 'user content',
                'models.admin.ban': 'ban content'
            };

            expect(new ModelsLoader(fragment).filter(requires)).to.deep.equal({
                'api.user': 'user content'
            });
        });

        it('should return only the models belonging to a given fragments array', function(){
            var fragments = ['api', 'admin'];
            var requires = {
                'models.api.user': 'user content',
                'models.admin.ban': 'ban content',
                'models.uploads.picture': 'picture content'
            };

            expect(new ModelsLoader(fragments).filter(requires)).to.deep.equal({
                'api.user': 'user content',
                'admin.ban': 'ban content'
            });
        });

        it('should return an empty object when no model is provided', function(){
            var requires = {};

            expect(new ModelsLoader().filter(requires)).to.deep.equal({});
        });
    });

    describe('#init()', function(){
        it('should invoke the model init() function with the config', function(done){
            var fragments = undefined;
            var config = {
                api: {
                    db: 'api.db'
                }
            };
            var requires = {
                api: sinon.spy(function(config){
                    return 'api content'
                })
            };

            new ModelsLoader(fragments, config)
                .init(requires)
                .finally(ensureApiCalledWithConfig)
                .nodeify(done);

            function ensureApiCalledWithConfig(){
                expect(requires.api).to.have.been.calledWithExactly(config);
            }
        });

        it('should resolve with a model', function(){
            var requires = {
                'api.user': function(){
                    return 'user content';
                }
            };

            return expect(new ModelsLoader().init(requires)).to.become({
                'api.user': 'user content'
            });
        });

        it('should resolve with a model promise\'s resolve', function(){
            var requires = {
                'api.user': function(){
                    return Promise.resolve('user content');
                }
            };

            return expect(new ModelsLoader().init(requires)).to.become({
                'api.user': 'user content'
            });
        });

        it('should reject if any model init() function throws an error', function(){
            var requires = {
                'api.user': function(){
                    return Promise.resolve('user content')
                },
                'admin.ban': function(){
                    throw new Error();
                }
            };

            return expect(new ModelsLoader().init(requires)).to.be.rejected;
        });

        it('should reject if any model init() function rejects', function(){
            var requires = {
                'api.user': function(){
                    return Promise.resolve('user content');
                },
                'admin.ban': function(){
                    return Promise.reject();
                }
            };

            return expect(new ModelsLoader().init(requires)).to.be.rejected;
        });
    });
});