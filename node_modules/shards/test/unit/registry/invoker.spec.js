var Invoker = requireImpl('/lib/registry/invoker');

describe('Invoker', function(){
    describe('#invoke()', function(){
        it('should invoke the action\'s promise', function(done){
            var action = {
                promise: sinon.spy(function(){

                })
            };

            new Invoker(action).invoke()
                .finally(ensurePromiseCalled)
                .nodeify(done);

            function ensurePromiseCalled(){
                expect(action.promise).to.have.been.calledOnce;
            }
        });

        it('should invoke the action\'s promise by passing it the action context and io', function(done){
            var action = {
                context: 'context content',
                promise: sinon.spy(function(context, io){

                })
            };
            var io = 'io content';

            new Invoker(action).invoke(io)
                .finally(ensurePromiseCalledWithContextAndIo)
                .nodeify(done);

            function ensurePromiseCalledWithContextAndIo(){
                expect(action.promise).to.have.been.calledWith(action.context, io);
            }
        });

        it('should resolve with the result of the promise', function(){
            var action = {
                promise: function(){
                    return Promise.resolve('result');
                }
            };

            return expect(new Invoker(action).invoke()).to.become('result');
        });

        it('should forward promise rejections', function(){
            var action = {
                promise: function(){
                    return Promise.reject('error');
                }
            };

            return expect(new Invoker(action).invoke()).to.be.rejected;
        });

        describe('validation', function(){
            it('should call the action validates method with io', function(done){
                var action = {
                    validates: sinon.spy(function(io){

                    }),
                    promise: function(){

                    }
                };
                var io = 'io content';

                new Invoker(action).invoke(io)
                    .finally(ensureValidatesCalledWithIo)
                    .nodeify(done);

                function ensureValidatesCalledWithIo(){
                    expect(action.validates).to.have.been.calledWith(io);
                }
            });

            it('should call the action promise if the validates does not throw', function(done){
                var action = {
                    validates: function(){

                    },
                    promise: sinon.spy(function(){

                    })
                };

                new Invoker(action).invoke()
                    .finally(ensurePromiseCalled)
                    .nodeify(done);

                function ensurePromiseCalled(){
                    expect(action.promise).to.have.been.calledOnce;
                }
            });

            it('should reject if the validates throws', function(){
                var action = {
                    validates: function(){
                        throw new Error();
                    }
                };

                return expect(new Invoker(action).invoke()).to.be.rejected;
            });

            it('should not call the action promise if the validates throws', function(done){
                var action = {
                    validates: function(){
                        throw new Error();
                    },
                    promise: sinon.spy(function(){

                    })
                };

                new Invoker(action).invoke()
                    .catch(consumeError)
                    .finally(ensurePromiseNotCalled)
                    .nodeify(done);

                function consumeError(){}

                function ensurePromiseNotCalled(){
                    expect(action.promise).to.not.have.been.calledOnce;
                }
            });
        });
    });
});