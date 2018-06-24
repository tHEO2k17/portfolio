var InputAdapter = requireImpl('lib/external-router/http/adapters/input.js');

describe('InputAdapter', function(){
    describe('#createInput()', function(){
        it('should resolve with an object containing the req.params', function(){
            var req = {
                params: {
                    content: 'params content'
                }
            };

            return expect(new InputAdapter().createInput(req)).to.become({
                params: {
                    content: 'params content'
                },
                body: {},
                query: {}
            });
        });

        it('should inflate dotted keys in the req.params', function(){
            var req = {
                params: {
                    'user.id': 1
                }
            };

            return expect(new InputAdapter().createInput(req)).to.become({
                params: {
                    user: {
                        id: 1
                    }
                },
                body: {},
                query: {}
            });
        });

        it('should resolve with an object containing the req.body', function(){
            var req = {
                body: {
                    content: 'body content'
                }
            };

            return expect(new InputAdapter().createInput(req)).to.become({
                params: {},
                body: {
                    content: 'body content'
                },
                query: {}
            });
        });

        it('should inflate dotted keys in the req.body', function(){
            var req = {
                body: {
                    'user.id': 1
                }
            };

            return expect(new InputAdapter().createInput(req)).to.become({
                params: {},
                body: {
                    user: {
                        id: 1
                    }
                },
                query: {}
            });
        });

        it('should resolve with an object containing the req.query', function(){
            var req = {
                query: {
                    content: 'query content'
                }
            };

            return expect(new InputAdapter().createInput(req)).to.become({
                params: {},
                body: {},
                query: {
                    content: 'query content'
                }
            });
        });

        it('should inflate dotted keys in the req.query', function(){
            var req = {
                query: {
                    'user.id': 1
                }
            };


            return expect(new InputAdapter().createInput(req)).to.become({
                body: {},
                params: {},
                query: {
                    user: {
                        id: 1
                    }
                }
            });
        });

        describe('session', function(){
            it('should resolve with an object containing the req.session if the session option is set', function(){
                var options = {
                    session: true
                };
                var req = {
                    session: {
                        content: 'session content'
                    }
                };

                return expect(new InputAdapter(options).createInput(req)).to.become({
                    params: {},
                    body: {},
                    query: {},
                    session: {
                        content: 'session content'
                    }
                });
            });

            it('should not return an object containing the req.session unless the session option is set', function(){
                var req = {
                    session: 'session content'
                };

                return expect(new InputAdapter().createInput(req)).to.become({
                    params: {},
                    body: {},
                    query: {}
                });
            });
        });

        describe('files', function(){
            it('should resolve with an object containing the req.files if the files options is set', function(){
                var options = {
                    files: true
                };
                var req = {
                    files: {
                        content: 'files content'
                    }
                };

                return expect(new InputAdapter(options).createInput(req)).to.become({
                    params: {},
                    body: {},
                    query: {},
                    files: {
                        content: 'files content'
                    }
                });
            });

            it('should not return an object containing the req.files unless the files option is set', function(){
                var req = {
                    files: {
                        content: 'files content'
                    }
                };

                return expect(new InputAdapter().createInput(req)).to.become({
                    params: {},
                    body: {},
                    query: {}
                });
            });
        })
    });
});