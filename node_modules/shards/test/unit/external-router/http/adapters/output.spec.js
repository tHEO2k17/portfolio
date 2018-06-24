var OutputAdapter = requireImpl('lib/external-router/http/adapters/output.js');

describe('OutputAdapter', function(){
    describe('#adaptOutput()', function(){
        var res;

        beforeEach(function(){
            res = {
                status: sinon.spy(function(){
                    return this;
                }),
                send: sinon.spy(function(){

                })
            };
        });

        it('should resolve with the promise resolve', function(){
            var promise = Promise.resolve('result');

            return expect(new OutputAdapter().adaptOutput(promise, res)).to.become('result');
        });

        it('should call res.status with a 200 code when resolving', function(done){
            var promise = Promise.resolve('result');

            new OutputAdapter().adaptOutput(promise, res)
                .then(ensureStatusCalledWith200)
                .nodeify(done);

            function ensureStatusCalledWith200(){
                expect(res.status).to.have.been.calledWithExactly(200);
            }
        });

        it('should call res.send with the result when resolving', function(done){
            var promise = Promise.resolve('result');

            new OutputAdapter().adaptOutput(promise, res)
                .then(ensureSendCalledWithResult)
                .nodeify(done);

            function ensureSendCalledWithResult(){
                expect(res.send).to.have.been.calledWith('result');
            }
        });

        it('should reject with the promise rejection', function(){
            var error = new Error();
            var promise = Promise.reject(error);

            return expect(new OutputAdapter().adaptOutput(promise, res)).to.be.rejectedWith(error);
        });

        it('should call res.status with a 500 code when rejecting', function(done){
            var error = new Error();
            var promise = Promise.reject(error);

            new OutputAdapter().adaptOutput(promise, res)
                .catch(ensureStatusCalledWith500)
                .nodeify(done);

            function ensureStatusCalledWith500(){
                expect(res.status).to.have.been.calledWithExactly(500);
            }
        });

        it('should call res.send with the error when rejecting', function(done){
            var error = new Error();
            var promise = Promise.reject(error);

            new OutputAdapter().adaptOutput(promise, res)
                .catch(ensureSendCalledWithError)
                .nodeify(done);

            function ensureSendCalledWithError(){
                expect(res.send).to.have.been.calledWithExactly(error);
            }
        });

        describe('skipOutput', function(){
            it('should not call res.status when the skipOutput option is set', function(done){
                var options = {
                    skipOutput: true
                };
                var promise = Promise.resolve('result');

                new OutputAdapter(options).adaptOutput(promise, res)
                    .then(ensureStatusNotCalled)
                    .nodeify(done);

                function ensureStatusNotCalled(){
                    expect(res.status).to.not.have.been.calledOnce;
                }
            });

            it('should not call res.send when the skipOutput option is set', function(done){
                var options = {
                    skipOutput: true
                };
                var promise = Promise.resolve('result');

                new OutputAdapter(options).adaptOutput(promise, res)
                    .then(ensureSendNotCalled)
                    .nodeify(done);

                function ensureSendNotCalled(){
                    expect(res.send).to.not.have.been.calledOnce;
                }
            });
        });
    });
});