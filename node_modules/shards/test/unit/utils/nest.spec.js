var nest = requireImpl('/lib/utils/nest.js');

describe('nest', function(){
    describe('#normalize()', function(){
        it('should remove the extra dots in case of consecutive dots', function(){
            var path = 'foo...bar';

            expect(nest.normalize(path)).to.equal('foo.bar');
        });

        it('should remove the initial dot', function(){
            var path = '.foo.bar';

            expect(nest.normalize(path)).to.equal('foo.bar');
        });

        it('should remove the dot at the end', function(){
            var path = 'foo.bar.';

            expect(nest.normalize(path)).to.equal('foo.bar');
        });

        it('should remove non allowed characters', function(){
            var path = 'foo/\\*=,\'"!é.bar';

            expect(nest.normalize(path)).to.equal('foo.bar');
        });

        it('should return an empty string when the path is not given', function(){
            expect(nest.normalize()).to.equal('');
        });

        it('should return empty string when the path is an empty string', function(){
            expect(nest.normalize('')).to.equal('');
        });

        it('should return an empty string when the path is null', function(){
            expect(nest.normalize(null)).to.equal('');
        });

        it('should return an empty string when the path is undefined', function(){
            expect(nest.normalize(undefined)).to.equal('');
        });
    });

    describe('#exists()', function(){
        it('should return true on an existing property', function(){
            var object = {
                foo: undefined
            };
            var path = 'foo';

            expect(nest.exists(object, path)).to.be.true;
        });

        it('should return false on a non-existing property', function(){
            var object = {};
            var path = 'foo';

            expect(nest.exists(object, path)).to.be.false;
        });

        it('should return true on an existing path', function(){
            var object = {
                foo: {
                    bar: undefined
                }
            };
            var path = 'foo.bar';

            expect(nest.exists(object, path)).to.be.true;
        });

        it('should return false on a non-existing path', function(){
            var object = {};
            var path = 'foo.bar';

            expect(nest.exists(object, path)).to.be.false;
        });
    });

    describe('#paths()', function(){
        it('should return an array of flattened paths for nested object', function(){
            var object = {
                foo: {
                    bar: 'bar'
                }
            };

            expect(nest.paths(object)).to.deep.equal(['foo.bar']);
        });

        it('should return an array of object paths for non-nested object', function(){
            var object = {
                foo: 'foo',
                bar: 'bar'
            };

            expect(nest.paths(object)).to.deep.equal(['foo', 'bar']);
        });

        it('should flatten the keys with empty object', function(){
            var object = {
                foo: {
                    bar: {}
                }
            };

            expect(nest.paths(object)).to.deep.equal(['foo.bar']);
        });

        it('should not flatten an array', function(){
            var object = {
                foo: ['bar', 'baz']
            };

            expect(nest.paths(object)).to.eql(['foo']);
        });

        it('should throw an error if object is not given', function(){
            function pathsOfNothing(){
                return nest.paths();
            }

            expect(pathsOfNothing).to.throw();
        });
    });


    describe('#get()', function(){
        it('should return value for a non nested path', function(){
            var object = {
                foo: 'foo'
            };
            var path = 'foo';

            expect(nest.get(object, path)).to.equal('foo');
        });

        it('should return value for a nested path', function(){
            var object = {
                foo: {
                    bar: {
                        baz: 'baz'
                    }
                }
            };
            var path = 'foo.bar.baz';

            expect(nest.get(object, path)).to.equal('baz');
        });

        it('should return undefined if the path does not exist', function(){
            var object = {
            };
            var path = 'foo.bar';

            expect(nest.get(object, path)).to.not.exist;
        });

        it('should return the object when the path is empty', function(){
            var object = {
                foo: 'foo'
            };

            expect(nest.get(object)).to.deep.equal(object);
        });

        it('should throw an error when the object is not given', function(){
            function getEmptyObject(){
                return nest.get();
            }

            expect(getEmptyObject).to.throw();
        });
    });

    describe('#set()', function(){
        it('should return the given object', function(){
            var object = {
                foo: 'foo'
            };
            var path = 'foo';
            var value = 'foo';

            expect(nest.set(object, path, value)).to.equal(object);
        });

        it('should override value for a non-nested path', function(){
            var object = {
                foo: 'foo'
            };
            var path = 'foo';
            var value = 'bar';

            nest.set(object, path, value);

            expect(object).to.deep.equal({foo: 'bar'});
        });

        it('should override value for a nested path', function(){
            var object = {
                foo: {
                    bar: {
                        baz: 'baz'
                    }
                }
            };
            var path = 'foo.bar.baz';
            var value = 'ban';

            nest.set(object, path, value);

            expect(object).to.deep.equal({foo: {bar: {baz: 'ban'}}})
        });

        it('should set value for a non-existing path', function(){
            var object = {};
            var path = 'foo';
            var value = 'foo';

            nest.set(object, path, value);

            expect(object).to.deep.equal({foo: 'foo'});
        });

        it('should throw an error when the path is empty', function(){
            var object = {
                foo: 'foo'
            };
            var path = '';

            function setEmptyPath(){
                return nest.set(object, path);
            }

            expect(setEmptyPath).to.throw();
        });

        it('should throw an error when the object is not given', function(){
            function setEmptyObject(){
                return nest.set();
            }

            expect(setEmptyObject).to.throw();
        });
    });

    describe('#retain()', function(){
        it('should return the given target', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                foo: 'foo'
            };
            var paths = ['foo'];

            expect(nest.retain(target, paths, source)).to.equal(target);
        });

        it('should override values for non-nested paths', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                foo: 'source foo'
            };
            var paths = ['foo'];

            nest.retain(target, paths, source);

            expect(target).to.deep.equal({foo: 'source foo'});
        });

        it('should override values for nested paths', function(){
            var target = {
                foo: {
                    bar: 'bar'
                }
            };
            var source = {
                foo: {
                    bar: 'source bar'
                }
            };
            var paths = ['foo.bar'];

            nest.retain(target, paths, source);

            expect(target).to.deep.equal({foo: {bar: 'source bar'}});
        });

        it('should add values for non-existing paths', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                bar: 'bar',
                baz: 'baz'
            };
            var paths = ['bar'];

            nest.retain(target, paths, source);

            expect(target).to.deep.equal({foo: 'foo', bar: 'bar'});
        });

        it('should not do anything if paths do not exist in source', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                bar: 'bar'
            };
            var paths = ['baz'];

            nest.retain(target, paths, source);

            expect(target).to.deep.equal({foo: 'foo'});
        });

        it('should throw an error when the source is not given', function(){
            var target = {
                foo: 'foo'
            };
            var paths = ['bar'];

            function retainFromUnexistingSource(){
                return nest.retain(target, paths);
            }

            expect(retainFromUnexistingSource).to.throw();
        });
    });

    describe('#replace()', function(){
        it('should return the given target', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                foo: 'foo'
            };
            var paths = ['foo'];

            expect(nest.replace(target, paths, source)).to.equal(target);
        });

        it('should replace non-nested values',function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                foo: 'foo source'
            };
            var paths = ['foo'];

            nest.replace(target, paths, source);

            expect(target).to.deep.equal({foo: 'foo source'});
        });

        it('should replace nested values', function(){
            var target = {
                foo: {
                    bar: 'bar'
                }
            };
            var source = {
                foo: {
                    bar: 'source bar'
                }
            };
            var paths = ['foo'];

            nest.replace(target, paths, source);

            expect(target).to.deep.equal({foo: {bar: 'source bar'}});
        });

        it('should do nothing if paths do not exist in source', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                bar: 'bar'
            };
            var paths = ['baz'];

            nest.replace(target, paths, source);

            expect(target).to.deep.equal({foo: 'foo'});
        });

        it('should do nothing if paths do not exist in target', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                bar: 'bar'
            };
            var paths = ['bar'];

            nest.replace(target, paths, source);

            expect(target).to.deep.equal({foo: 'foo'});
        });

        it('should throw an error if source is not given', function(){
            var target = {
                foo: 'foo'
            };
            var paths =  ['foo'];


            function replaceWithNonExistingSource(){
                return nest.replace(target, paths);
            }

            expect(replaceWithNonExistingSource).to.throw();
        });

        it('should throw an error if target is not given', function(){
            function replaceWithNoTarget(){
                return nest.replace();
            }

            expect(replaceWithNoTarget).to.throw();
        });
    });


    describe('#flatten()', function(){
        it('should return a flattened object if nested', function(){
            var object = {
                foo: {
                    bar: 'bar'
                }
            };

            expect(nest.flatten(object)).to.deep.equal({'foo.bar': 'bar'});
        });

        it('should return the object if not nested', function(){
            var object = {
                foo: 'foo'
            };

            expect(nest.flatten(object)).to.deep.equal({foo: 'foo'});
        });

        it('should throw an error if object is not given', function(){
            function flattenNothing(){
                return nest.flatten();
            }

            expect(flattenNothing).to.throw();
        });

        it('should flatten the keys with empty object', function(){
            var object = {
                foo: {
                    bar: {}
                }
            };

            expect(nest.flatten(object)).to.deep.equal({'foo.bar': {}});
        });
    });

    describe('#merge()', function(){
        it('should override values for non-nested paths', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                foo: 'foo source'
            };

            expect(nest.merge(target, source)).to.deep.equal({foo: 'foo source'});
        });

        it('should override values for nested paths', function(){
            var target = {
                foo: {
                    bar: 'bar'
                }
            };
            var source = {
                foo: {
                    bar: 'bar source'
                }
            };

            expect(nest.merge(target, source)).to.deep.equal({foo: {bar: 'bar source'}});
        });

        it('should add values for non-existing paths', function(){
            var target = {
                foo: 'foo'
            };
            var source = {
                bar: 'bar'
            };

            expect(nest.merge(target, source)).to.deep.equal({foo: 'foo', bar: 'bar'});
        });

        it('should throw an error if source not given', function(){
            var target = {
                foo: 'foo'
            };

            function mergeNonExistingSource(){
                return nest.merge(target);
            }

            expect(mergeNonExistingSource).to.throw();
        });

        it('should throw an error if target not given', function(){
            function mergeInNowExistingTarget(){
                return nest.merge();
            }

            expect(mergeInNowExistingTarget).to.throw();
        });
    });

    describe('#inflate()', function(){
        it('should return an inflated object', function(){
            var object = {
                'foo.bar': 'bar'
            };

            expect(nest.inflate(object)).to.deep.equal({foo: {bar: 'bar'}});
        });

        it('should return the given object if not flattened', function(){
            var object = {
                foo: 'foo'
            };

            expect(nest.inflate(object)).to.deep.equal({foo: 'foo'});
        });

        it('should throw an error if object is not given', function(){
            function inflateWithNoObject(){
                return nest.inflate();
            }

            expect(inflateWithNoObject).to.throw();
        });
    });
});
