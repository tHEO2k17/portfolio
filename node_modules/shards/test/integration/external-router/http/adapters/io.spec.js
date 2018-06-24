var mock = require('mock-require');

var INPUT_ADAPTER_PATH = requireImpl.relativePath('lib/external-router/http/adapters/input.js', __dirname);
var OUTPUT_ADAPTER_PATH = requireImpl.relativePath('lib/external-router/http/adapters/output.js', __dirname);

describe('IOAdapter', function(){
    describe('#createMiddleware()', function(){
        var InputAdapterMock;
        var OutputAdapterMock;
        var IOAdapter;

        before(function mockInputAdapter(){
            InputAdapterMock = sinon.spy(function InputAdapterMock(options){
            });

            InputAdapterMock.prototype.createInput = sinon.spy(function(req, res, next){
                return Promise.resolve({});
            });
            mock(INPUT_ADAPTER_PATH, InputAdapterMock);
        });

        before(function mockOutputAdapter(){
            OutputAdapterMock = sinon.spy(function OutputAdapterMock(options){
            });

            OutputAdapterMock.prototype.adaptOutput = sinon.spy(function(promise, res){
                return promise;
            });
            mock(OUTPUT_ADAPTER_PATH, OutputAdapterMock);
        });

        before(function requireIOAdapter(){
            IOAdapter = requireImpl('lib/external-router/http/adapters/io.js');
        });

        afterEach(function deregisterSpies(){
            InputAdapterMock.reset();
            InputAdapterMock.prototype.createInput.reset();
            OutputAdapterMock.reset();
            OutputAdapterMock.prototype.adaptOutput.reset();
        });

        after(function(){
            mock.stop(INPUT_ADAPTER_PATH);
            mock.stop(OUTPUT_ADAPTER_PATH);
        });

        it('should invoke InputAdapter with the routeConfig', function(){
            var action = function(){};
            var routeConfig = {};

            new IOAdapter(action, routeConfig).createMiddleware();

            expect(InputAdapterMock).to.have.been.calledWithExactly(routeConfig);
        });

        it('should invoke OutputAdapter with the routeConfig', function(){
            var action = function(){};
            var routeConfig = {};

            new IOAdapter(action, routeConfig).createMiddleware();

            expect(OutputAdapterMock).to.have.been.calledWithExactly(routeConfig);
        });

        describe('invoked created middleware', function(){
            var req;
            var res;
            var promise;
            var action;
            var routeConfig;

            beforeEach(function(){
                req = {};
                res = {
                    status: function(){
                        return this;
                    },
                    send: function(){}
                };
                promise = Promise.resolve('result');
                action = sinon.spy(function(){
                    return promise;
                });
                routeConfig = {};
            });

            it('should invoke InputAdapter.createInput() with req', function(done){
                var middleware = new IOAdapter(action, routeConfig).createMiddleware();
                middleware(req, res)
                    .finally(ensureCreateInputCalled)
                    .nodeify(done);

                function ensureCreateInputCalled(){
                    expect(InputAdapterMock.prototype.createInput).to.have.been.calledWithExactly(req);
                }
            });

            it('should invoke the action', function(done){
                var middleware = new IOAdapter(action, routeConfig).createMiddleware();
                middleware(req, res)
                    .finally(ensureActionCalled)
                    .nodeify(done);

                function ensureActionCalled(){
                    expect(action).to.have.been.calledOnce;
                }
            });

            it('should invoke OutputAdapter.adaptOutput() with the action promise and res', function(done){
                var middleware = new IOAdapter(action, routeConfig).createMiddleware();
                middleware(req, res)
                    .finally(ensureAdaptOutputCalled)
                    .nodeify(done);

                function ensureAdaptOutputCalled(){
                    expect(OutputAdapterMock.prototype.adaptOutput).to.have.been.calledWithExactly(promise, res);
                }
            });

            it('should create input, invoke action and adapt output in that exact order', function(done){
                var middleware = new IOAdapter(action, routeConfig).createMiddleware();
                middleware(req, res)
                    .finally(ensureFunctionsCalledInOrder)
                    .nodeify(done);

                function ensureFunctionsCalledInOrder(){
                    expect(InputAdapterMock.prototype.createInput).to.have.been.calledBefore(action);
                    expect(action).to.have.been.calledBefore(OutputAdapterMock.prototype.adaptOutput);
                }
            });
        });
    });
});
