var Config = requireImpl('lib/config.js');

describe('Config', function(){
    var config;
    beforeEach(function(){
        config = new Config('dev');
    });

    describe('Basic behavior', function(){
        it('should throw an error unless an env is given', function(){
            function createConfigWithoutEnv(){
                return new Config();
            }

            expect(createConfigWithoutEnv).to.throw();
        });

        it('should load the dev configuration', function(){
            var configObject = {
                dev: {
                    port: 8080
                }
            };

            expect(config.load(configObject).value).to.deep.equal({ port: 8080 });
        });

        it('should ignore the configurations for other envs', function(){
            var configObject = {
                dev: {
                    port: 8080
                },
                production: {
                    port: 80
                }
            };

            expect(config.load(configObject).value).to.deep.equal({ port: 8080 });
        });
    });

    describe('Default configuration', function(){
        it('should load the default configuration', function(){
            var configObject = {
                default: {
                    port: 8080
                }
            };

            expect(config.load(configObject).value).to.deep.equal({ port: 8080 });
        });

        it('should override the default configuration with the dev configuration', function(){
            var configObject =  {
                default: {
                    port: 80
                },
                dev: {
                    port: 8080
                }
            };

            expect(config.load(configObject).value).to.deep.equal({ port: 8080 })
        });

        it('should merge nested objects with the dev configuration', function(){
            var configObject = {
                default: {
                    server: {
                        port: 8080
                    }
                },
                dev: {
                    server: {
                        host: 'coderpower.com'
                    }
                }
            };

            expect(config.load(configObject).value).to.deep.equal({
                server: {
                    host: 'coderpower.com',
                    port: 8080
                }
            });
        });
    });

    describe('Local configuration', function(){
        it('should override the dev config with the local dev configuration', function(){
            var configObject = {
                dev: {
                    port: 8080
                },
                local: {
                    dev: {
                        port: 8081
                    }
                }
            };

            expect(config.load(configObject).value).to.deep.equal({ port: 8081 });
        });

        it('should merge nested objects with the local dev configuration', function(){
            var configObject = {
                dev: {
                    server: {
                        port: 8080
                    }
                },
                local: {
                    dev: {
                        server: {
                            host: 'coderpower.com'
                        }
                    }
                }
            };

            expect(config.load(configObject).value).to.deep.equal({
                server: {
                    host: 'coderpower.com',
                    port: 8080
                }
            })
        });
    })
});