var Action = requireImpl('lib/loader/action.js');

describe('Action', function(){
    describe('constructor', function(){
        describe('content validation', function(){
            it('should throw an error unless a content is provided', function(){
                function createActionWithoutContent(){
                    return new Action();
                }

                expect(createActionWithoutContent).to.throw();
            });

            it('should throw an error unless the content init property is a function', function(){
                function createActionWithInitObject(){
                    var content = {
                        init: {},
                        promise: function(){}
                    };
                    var path = 'api.user';
                    return new Action(content, path);
                }

                expect(createActionWithInitObject).to.throw();
            });

            it('should throw an error unless the content validates property is a function', function(){
                function createActionWithValidatesObject(){
                    var content = {
                        validates: {},
                        promise: function(){}
                    };
                    var path = 'api.user';
                    return new Action(content, path);
                }

                expect(createActionWithValidatesObject).to.throw();
            });

            it('should throw an error unless the content has a promise', function(){
                function createActionWithoutPromise(){
                    var content = {};
                    var path = 'api.user';
                    return new Action(content, path);
                }

                expect(createActionWithoutPromise).to.throw();
            });

            it('should throw an error unless the content promise property is a function', function(){
                function createActionWithPromiseObject(){
                    var content = {
                        promise: {}
                    };
                    var path = 'api.user';
                    return new Action(content, path);
                }

                expect(createActionWithPromiseObject).to.throw();
            });
        });

        describe('path validation', function(){
            it('should throw an error unless the path is provided', function(){
                function createActionWithoutPath(){
                    var content = {};
                    return new Action(content);
                }

                expect(createActionWithoutPath).to.throw();
            });

            it('should throw an error if the path is empty', function(){
                function createActionWithEmptyPath(){
                    var content = {};
                    var path = '';
                    return new Action(content, path);
                }

                expect(createActionWithEmptyPath).to.throw();
            });

            it('should throw an error unless the path is a string', function(){
                function createActionWithPathObject(){
                    var content = {};
                    var path = {};
                    return new Action(content, path);
                }

                expect(createActionWithPathObject).to.throw();
            });

            it('should throw an error unless the path contains a dot', function(){
                function createActionWithNonDottedPath(){
                    var content = {};
                    var path = 'api';
                    return new Action(content, path);
                }

                expect(createActionWithNonDottedPath).to.throw();
            });
        });
    });

    describe('#get path()', function(){
        it('should return the provided path', function(){
            var content = {
                promise: function(){}
            };
            var path = 'api.user';

            expect(new Action(content, path).path).to.deep.equal('api.user');
        });
    });

    describe('#get fragment()', function(){
        it('should return the first part of provided the path as fragment', function(){
            var content = {
                promise: function(){}
            };
            var path = 'api.user';

            expect(new Action(content, path).fragment).to.deep.equal('api');
        });
    });

    describe('#get init()', function(){
        it('should return the action init function', function(){
            var content = {
                init: function(){},
                promise: function(){}
            };
            var path = 'api.user';

            expect(new Action(content, path).init).to.equal(content.init);
        });
    });

    describe('#get validates()', function(){
        it('should return the action validates function', function(){
            var content = {
                validates: function(){},
                promise: function(){}
            };
            var path = 'api.user';

            expect(new Action(content, path).validates).to.equal(content.validates);
        });
    });

    describe('#get promise()', function(){
        it('should return the action promise function', function(){
            var content = {
                promise: function(){}
            };
            var path = 'api.user';

            expect(new Action(content, path).promise).to.equal(content.promise);
        });
    });
});