var SupportsLoader = requireImpl('lib/loader/supports-loader');

describe('SupportsLoader', function(){
    describe('#load()', function(){
        it('should return all the supports if no fragment is provided', function(){
            var requires = {
                'actions.api.users.supports.serialize': 'users.serialize content',
                'models.api.user': 'user content'
            };

            expect(new SupportsLoader().load(requires)).to.deep.equal({
                'api.users.serialize': 'users.serialize content'
            });
        });

        it('should not return actions', function(){
            var requires = {
                'actions.api.users.show': 'users.show content'
            };

            expect(new SupportsLoader().load(requires)).to.deep.equal({});
        });

        it('should return only the supports belonging to a given fragment', function(){
            var fragment = 'api';
            var requires = {
                'actions.api.users.supports.serialize': 'users.serialize content',
                'actions.admin.users.supports.ban': 'users.ban content'
            };

            expect(new SupportsLoader(fragment).load(requires)).to.deep.equal({
                'api.users.serialize': 'users.serialize content'
            });
        });

        it('should return only the supports belonging to a given fragments array', function(){
            var fragments = ['api', 'admin'];
            var requires = {
                'actions.api.users.supports.serialize': 'users.serialize content',
                'actions.admin.users.supports.ban': 'users.ban content',
                'actions.upload.users.pictures.supports.compress': 'users.pictures.compress content'
            };


            expect(new SupportsLoader(fragments).load(requires)).to.deep.equal({
                'api.users.serialize': 'users.serialize content',
                'admin.users.ban': 'users.ban content'
            });
        });

        it('should return an empty object if no support is provided', function(){
            var requires = {};

            expect(new SupportsLoader().load(requires)).to.deep.equal({});
        });

        it('should return nested objects without flattening their keys', function(){
            var requires = {
                'actions.api.users.supports.serialize': {
                    slugify: 'slugify content'
                }
            };

            expect(new SupportsLoader().load(requires)).to.deep.equal({
                'api.users.serialize': {
                    slugify: 'slugify content'
                }
            });

        });
    });
});