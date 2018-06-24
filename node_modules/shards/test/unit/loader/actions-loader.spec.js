var ActionsLoader = requireImpl('lib/loader/actions-loader.js');

describe('ActionsLoader', function(){
    describe('#filter()', function(){
        it('should return all the actions if no fragment is provided', function(){
            var requires = {
                'actions.api.users.show': 'users.show content',
                'models.api.user': 'user content'
            };

            expect(new ActionsLoader().filter(requires)).to.deep.equal({
                'api.users.show': 'users.show content'
            });
        });

        it('should not return supports', function(){
            var requires = {
                'actions.api.users.supports.serialize': 'user.serialize content'
            };

            expect(new ActionsLoader().filter(requires)).to.deep.equal({});
        });

        it('should return only the actions belonging to a given fragment', function(){
            var fragment = 'api';
            var requires = {
                'actions.api.users.show': 'users.show content',
                'actions.admin.users.rights': 'users.rights content'
            };

            expect(new ActionsLoader(fragment).filter(requires)).to.deep.equal({
                'api.users.show': 'users.show content'
            });
        });

        it('should return only the actions belonging to a given fragments array', function(){
            var fragments = ['api', 'admin'];
            var requires = {
                'actions.api.users.show': 'users.show content',
                'actions.admin.users.rights': 'users.rights content',
                'actions.upload.users.pictures': 'users.pictures content'
            };

            expect(new ActionsLoader(fragments).filter(requires)).to.deep.equal({
                'api.users.show': 'users.show content',
                'admin.users.rights': 'users.rights content'
            });
        });

        it('should return an empty object if no action is provided', function(){
            var requires = {};

            expect(new ActionsLoader().filter(requires)).to.deep.equal({});
        });
    });
});