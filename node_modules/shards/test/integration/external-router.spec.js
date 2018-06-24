var mockery = require('mockery');
var mock = require('mock-require');

var IO_ADAPTER_PATH = requireImpl.relativePath('lib/external-router/http/adapters/io.js', __dirname);

describe('ExternalRouter', function(){
    describe('#registerRouter()', function(){
        var express;
        var IOAdapterMock;
        var registry;
        var ExternalRouter;
        var externalRouter;

        before(function mockExpress(){
            express = {};
            express.server = {};
            express.server.get = sinon.spy(function(path, middlewares){});
            express.server.post = sinon.spy(function(path, middlewares){});
            express.server.put = sinon.spy(function(path, middlewares){});
            express.server.delete = sinon.spy(function(path, middlewares){});

            express.middlewares = {};
            express.middlewares.bodyParser = sinon.spy(function(req, res, next){});
            express.middlewares.bodyParser.json = sinon.spy(function(req, res, next){});
            express.middlewares.cookieParser = sinon.spy(function(req, res, next){});
            express.middlewares.session = sinon.spy(function(req, res, next){});

            var bodyParser = function(){
                return express.middlewares.bodyParser;
            };
            bodyParser.json = function(){
                return express.middlewares.bodyParser.json;
            };
            mockery.registerMock('body-parser', bodyParser);
            mockery.registerMock('cookie-parser', function(){
                return express.middlewares.cookieParser;
            });
            mockery.registerMock('express-session', function(){
                return express.middlewares.session;
            });

            mockery.enable({
                warnOnUnregistered: false
            });
        });

        before(function mockIOAdapter(){
            IOAdapterMock = sinon.spy(function(action, routeConfig){

            });

            IOAdapterMock.mockedMiddleware = function(req, res, next){
                return Promise.resolve();
            };

            IOAdapterMock.prototype.createMiddleware = sinon.spy(function(){
                return IOAdapterMock.mockedMiddleware;
            });

            mock(IO_ADAPTER_PATH, IOAdapterMock);
        });

        before(function mockRegistry(){
            registry = {
                actions: {
                    api: {
                        users: {
                            show: sinon.spy(function(io){
                                return Promise.resolve();
                            }),
                            update: function(io){
                                return Promise.resolve();
                            },
                            create: function(io){
                                return Promise.resolve();
                            },
                            destroy: function(io){
                                return Promise.resolve();
                            }
                        }
                    }
                }
            };
        });

        before(function createExternalRouter(){
            ExternalRouter = requireImpl('lib/external-router/index.js');
        });

        beforeEach(function instanciateExternalRouter(){
            var config = {};
            externalRouter = new ExternalRouter(express.server, registry, config);
        });

        afterEach(function(){
            express.server.get.reset();
            express.server.post.reset();
            express.server.put.reset();
            express.server.delete.reset();

            express.middlewares.bodyParser.reset();
            express.middlewares.cookieParser.reset();
            express.middlewares.session.reset();

            registry.actions.api.users.show.reset();

            IOAdapterMock.reset();
            IOAdapterMock.prototype.createMiddleware.reset();
        });

        after(function deregisterMocks(){
            mockery.deregisterAll();
            mockery.disable();
            mock.stop(IO_ADAPTER_PATH);
        });

        describe('methods', function(){
            it('should invoke express.get() when registering a route with the GET method', function(){
                externalRouter.registerRoute('GET', '/user/show', 'api.users.show');
                expect(express.server.get).to.have.been.called;
            });

            it('should invoke express.post() when registering a route with the POST method', function(){
                externalRouter.registerRoute('POST', '/user',  'api.users.create');
                expect(express.server.post).to.have.been.called;
            });

            it('should invoke express.put() when registering a route with the PUT method', function(){
                externalRouter.registerRoute('PUT', '/user/:id', 'api.users.update');
                expect(express.server.put).to.have.been.called;
            });

            it('should invoke express.delete() when registering a route with the DELETE method', function(){
                externalRouter.registerRoute('DELETE', '/user/:id', 'api.users.destroy');
                expect(express.server.delete).to.have.been.called;
            });
        });

        describe('shorthands', function(){
            it('should invoke registerRoute with GET through ExternalRouter.get()', function(){
                var route = '/users/show';
                var action = 'api.users.show';
                externalRouter.registerRoute = sinon.spy(externalRouter.registerRoute);

                externalRouter.get(route, action);
                expect(externalRouter.registerRoute).to.have.been.calledWith('GET', route, action);
            });

            it('should invoke registerRoute with POST through ExternalRouter.post()', function(){
                var route = '/user';
                var action = 'api.users.create';
                externalRouter.registerRoute = sinon.spy(externalRouter.registerRoute);

                externalRouter.post(route, action);
                expect(externalRouter.registerRoute).to.have.been.calledWith('POST', route, action);
            });

            it('should invoke registerRoute with PUT through ExternalRouter.put()', function(){
                var route = '/user/:id';
                var action = 'api.users.update';
                externalRouter.registerRoute = sinon.spy(externalRouter.registerRoute);

                externalRouter.put(route, action);
                expect(externalRouter.registerRoute).to.have.been.calledWith('PUT', route, action);
            });

            it('should invoke registerRoute with DELETE through ExternalRouter.delete()', function(){
                var route = '/user/:id';
                var action = 'api.users.destroy';
                externalRouter.registerRoute = sinon.spy(externalRouter.registerRoute);

                externalRouter.delete(route, action);
                expect(externalRouter.registerRoute).to.have.been.calledWith('DELETE', route, action);
            });
        });

        it('should forward the route to the express get() method', function(){
            externalRouter.registerRoute('GET', '/user/show', 'api.users.show');
            expect(express.server.get).to.have.been.calledWith('/user/show');
        });

        it('should invoke express.get() with the bodyParser.json() middleware', function(){
            externalRouter.registerRoute('GET', '/user/show', 'api.users.show');
            var middlewares = express.server.get.firstCall.args[1];
            expect(middlewares).to.contain(express.middlewares.bodyParser.json);
        });

        it('should create a new IOAdapter with the action and routeConfig', function(){
            var routeConfig = {session: true};
            externalRouter.registerRoute('GET', '/users/show', 'api.users.show', routeConfig);

            expect(IOAdapterMock).to.have.been.calledWithExactly(registry.actions.api.users.show, routeConfig);
        });

        it('should invoke IOAdapter.createMiddleware()', function(){
            var routeConfig = {};
            externalRouter.registerRoute('GET', '/users/show', 'api.users.show', routeConfig);

            expect(IOAdapterMock.prototype.createMiddleware).to.have.been.calledOnce;
        });

        it('should invoke express.get() with the IOAdapter middleware as last middleware', function(){
            var routeConfig = {};
            externalRouter.registerRoute('GET', '/users/show', 'api.users.show', routeConfig);

            var middlewares = express.server.get.firstCall.args[1];
            expect(middlewares.indexOf(IOAdapterMock.mockedMiddleware)).to.equal(middlewares.length - 1);
        });

        describe('session option', function(){
            it('should invoke express.get() with the cookie parser middleware when the session option is set', function(){
                externalRouter.registerRoute('GET', '/user/show', 'api.users.show', {session: true});
                var middlewares = express.server.get.firstCall.args[1];
                expect(middlewares).to.contain(express.middlewares.cookieParser);
            });

            it('should not invoke express.get() with the cookie parser middleware unless the session option is set', function(){
                externalRouter.registerRoute('GET', '/user/show', 'api.users.show');
                var middlewares = express.server.get.firstCall.args[1];
                expect(middlewares).to.not.contain(express.middlewares.cookieParser);
            });

            it('should invoke express.get() with the session middleware when the session option is set', function(){
                externalRouter.registerRoute('GET', '/user/show', 'api.users.show', {session: true});
                var middlewares = express.server.get.firstCall.args[1];
                expect(middlewares).to.contain(express.middlewares.session);
            });

            it('should not invoke express.get() with the session middleware unless the session option is set', function(){
                externalRouter.registerRoute('GET', '/user/show', 'api.users.show');
                var middlewares = express.server.get.firstCall.args[1];
                expect(middlewares).to.not.contain(express.middlewares.session);
            });

            it('should order the cookieParser middleware before the session middleware', function(){
                externalRouter.registerRoute('GET', '/user/show', 'api.users.show', {session: true});
                var middlewares = express.server.get.firstCall.args[1];
                var indices = {
                    cookieParser: middlewares.indexOf(express.middlewares.cookieParser),
                    session: middlewares.indexOf(express.middlewares.session)
                };
                expect(indices.cookieParser).to.be.below(indices.session);
            });
        });
    });
});
