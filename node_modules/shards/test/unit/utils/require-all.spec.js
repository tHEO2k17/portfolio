/*
var mockFs = require('mock-fs');
var path = require('path');

var requireAll = requireImpl('./lib/utils/require-all.js');

describe('requireAll', function(){
    afterEach(function(){
        mockFs.restore();
    });

    function mockRequiredFiles(fileDescriptors){
        Object.keys(fileDescriptors)
            .forEach(appendModuleExports);
        mockFs(fileDescriptors);

        function appendModuleExports(filePath){
            var content = fileDescriptors[filePath];
            content = (typeof fileDescriptors[filePath] == 'string')? '\'' + content + '\'' : content;
            fileDescriptors[filePath] = 'module.exports = ' + content;
        }
    }

    describe('basic behavior', function(){
        it('should require a file', function(){
            mockRequiredFiles({
                'foo.js': 'foo content'
            });

            return expect(requireAll('foo.js')).to.become({
                foo: 'foo content'
            });
        });

        it('should create properties from the file name', function(){
            mockRequiredFiles({
                'dir/foo.js': 'foo content'
            });

            return expect(requireAll('dir')).to.eventually.have.property('foo');
        });

        it('should throw an error unless the path exists', function(){
            mockRequiredFiles({});

            return expect(requireAll('invalid-path')).to.be.rejected;
        });

        it('should normalize the provided path', function(){
            mockRequiredFiles({
                'dir/foo.js': 'foo content'
            });

            return expect(requireAll('./dir/../dir')).to.become({ foo: 'foo content' });
        });

        it('should return a blank object for an empty directory', function(){
            mockFs({
                dir: {}
            });

            return expect(requireAll('dir')).to.become({});
        });

        it('should ignore files and directories with name starting with a dot.', function(){
            mockRequiredFiles({
                'dir/.foo/baz.js': 'foo content',
                'dir/.bar.js': 'bat content'
            });

            return expect(requireAll('dir')).to.become({});
        })
    });

    describe('directory', function(){
        it('should require a directory files contents', function(){
            mockRequiredFiles({
                'dir/bar.js': 'bar content',
                'dir/baz.js': 'baz content'
            });

            return expect(requireAll('dir')).to.become({
                bar: 'bar content',
                baz: 'baz content'
            });
        });

        it('should require a directory nested files contents', function(){
            mockRequiredFiles({
                'dir/foo.js': 'foo content',
                'dir/bar/baz.js': 'baz content'
            });

            return expect(requireAll('dir')).to.become({
                foo: 'foo content',
                bar: {
                    baz: 'baz content'
                }
            });
        });

        it('should require the file when a file and a directory share the same name', function(){
            mockRequiredFiles({
                'dir/foo.js': 'foo content',
                'dir/foo/bar.js': 'foo/bar content'
            });

            return expect(requireAll('dir')).to.become({foo: 'foo content'});
        });
    });

    describe('index', function(){
        it('should require only the index.js inside a directory', function(){
            mockRequiredFiles({
                'dir/foo.js': 'foo content',
                'dir/index.js': 'index content'
            });

            return expect(requireAll('dir')).to.become('index content');
        });

        it('should require only the index.js inside a nested directory', function(){
            mockRequiredFiles({
                'dir/nested/foo.js': 'foo content',
                'dir/nested/index.js': 'index content'
            });

            return expect(requireAll('dir')).to.become({ nested: 'index content'});
        });
    });

    describe('config', function(){
        describe('flatten', function(){
            it('should create flattened object keys from the path', function(){
                mockRequiredFiles({
                    'dir/nested/foo.js': 'foo content',
                    'dir/nested/bar/baz.js': 'baz content'
                });

                return expect(requireAll('dir', {flatten: true})).to.become({
                    'nested.foo': 'foo content',
                    'nested.bar.baz': 'baz content'
                });
            });
        });
    });
});
    */