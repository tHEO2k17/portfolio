var DataLoader = requireImpl('lib/loader/data-loader.js');

describe('DataLoader', function(){
    describe('constructor', function(){
        it('should throw an error when no root is provided', function(){
            function createWithoutRoot(){
                return new DataLoader();
            }

            expect(createWithoutRoot).to.throw();
        });
    });

    describe('#load()', function(){
        it('should invoke filter() with the given requires', function(){
            var root = 'actions';
            var dataLoader = new DataLoader(root);
            dataLoader.filter = sinon.spy(dataLoader.filter);
            var requires = {
                'actions.api.users.show': 'users.show content'
            };

            dataLoader.load(requires);
            expect(dataLoader.filter).to.have.been.calledWithExactly(requires);
        });

        it('should forward the output of filter() to init()', function(){
            var root = 'actions';
            var dataLoader = new DataLoader(root);
            dataLoader.filter = sinon.spy(dataLoader.filter);
            dataLoader.init = sinon.spy(dataLoader.init);
            var requires = {
                'actions.api.users.show': 'users.show content',
                'models.api.user': 'user content'
            };

            dataLoader.load(requires);
            expect(dataLoader.init).to.have.been.calledWithExactly(dataLoader.filter.firstCall.returnValue);
        });

        it('should return the same result as init()', function(){
            var root = 'actions';
            var dataLoader = new DataLoader(root);
            dataLoader.init = sinon.spy(dataLoader.init);
            var requires = {
                'actions.api.users.show': 'users.show content',
                'models.api.user': 'user content'
            };

            expect(dataLoader.load(requires)).to.deep.equal(dataLoader.init.firstCall.returnValue);
        });
    });

    describe('#filter()', function(){
        it('should return all the data matching the root if no fragment is provided', function(){
            var root = 'actions';
            var requires = {
                'actions.api.users.show': 'users.show content',
                'models.api.user': 'user content'
            };

            expect(new DataLoader(root).filter(requires)).to.deep.equal({
                'api.users.show': 'users.show content'
            });
        });

        it('should not return data not matching the root', function(){
            var root = 'actions';
            var requires = {
                'models.api.user': 'user content'
            };

            expect(new DataLoader(root).filter(requires)).to.deep.equal({});
        });

        it('should return only the data belonging to a given fragment', function(){
            var root = 'actions';
            var fragment = 'api';
            var requires = {
                'actions.api.users.show': 'users.show content',
                'actions.admin.users.rights': 'users.rights content'
            };

            expect(new DataLoader(root, fragment).filter(requires)).to.deep.equal({
                'api.users.show': 'users.show content'
            });
        });

        it('should return only the data belonging to a given fragments array', function(){
            var root = 'actions';
            var fragments = ['api', 'admin'];
            var requires = {
                'actions.api.users.show': 'users.show content',
                'actions.admin.users.rights': 'users.rights content',
                'actions.upload.users.pictures': 'users.pictures content'
            };

            expect(new DataLoader(root, fragments).filter(requires)).to.deep.equal({
                'api.users.show': 'users.show content',
                'admin.users.rights': 'users.rights content'
            });
        });

        it('should return an empty object if no data is provided', function(){
            var root = 'actions';
            var requires = {};

            expect(new DataLoader(root).filter(requires)).to.deep.equal({});
        });

        it('should return nested objects without flattening their keys', function(){
            var root = 'actions';
            var requires = {
                'actions.api.users.show': {
                    promise: 'promise content'
                }
            };

            expect(new DataLoader(root).filter(requires)).to.deep.equal({
                'api.users.show': {
                    promise: 'promise content'
                }
            });
        });
    });
});