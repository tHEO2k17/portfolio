var mergePrototypes = requireImpl('/lib/utils/merge-prototypes');

describe('mergePrototypes', function(){
    var Constructor;
    var ConstructorToMerge;

    beforeEach(function(){
        Constructor = function(){};
        ConstructorToMerge = function(){};
        ConstructorToMerge.prototype.property = 'property content';
    });

    describe('basic behavior', function(){
        it('should return the constructor', function(){
            mergePrototypes(Constructor);

            expect(Constructor).to.equal(Constructor);
        });

        it('should leave a constructor unchanged when merging it with nothing else', function(){
            mergePrototypes(Constructor);

            expect(Constructor.prototype).to.deep.equal({});
        });

        it('should retain prototype.constructor', function(){
            mergePrototypes(Constructor);

            expect(Constructor.prototype.constructor).to.equal(Constructor);
        });

        it('should throw if no arguments are passed', function(){
            function invokeMergePrototypesWithoutArgument(){
                return mergePrototypes();
            }

            expect(invokeMergePrototypesWithoutArgument).to.throw();
        });
    });

    describe('merging', function(){
        it('should merge another constructor\'s prototype', function(){
            mergePrototypes(Constructor, ConstructorToMerge);

            var mergedProperty = Constructor.prototype.property;
            expect(mergedProperty).to.equal('property content');
        });

        it('should merge an object', function(){
            mergePrototypes(Constructor, {property: 'property content'});

            var mergedProperty = Constructor.prototype.property;
            expect(mergedProperty).to.equal('property content');
        });

        it('should override existing properties on the target', function(){
            Constructor.prototype.property = 'property content';

            mergePrototypes(Constructor, {property: 'property overriden content'});

            var mergedProperty = Constructor.prototype.property;
            expect(mergedProperty).to.equal('property overriden content');
        });
    });

    describe('accessors', function(){
        var getter;
        var setter;
        var accessorsToMerge;

        beforeEach(function(){
            getter = function(){};
            setter = function(value){};
            accessorsToMerge = {};
            Object.defineProperty(accessorsToMerge, 'property', {
                get: getter,
                set: setter
            });
        });

        it('should merge accessors', function(){
            mergePrototypes(Constructor, accessorsToMerge);

            var mergedGetter = Constructor.prototype.__lookupGetter__('property');
            var mergedSetter = Constructor.prototype.__lookupSetter__('property');
            expect(mergedGetter).to.equal(getter);
            expect(mergedSetter).to.equal(setter);
        });

        it('should override previous properties with just a getter', function(){
            Constructor.prototype.property = 'property content';
            accessorsToMerge = {};
            Object.defineProperty(accessorsToMerge, 'property', {
                get: getter
            });

            mergePrototypes(Constructor, accessorsToMerge);

            var mergedGetter = Constructor.prototype.__lookupGetter__('property');
            var mergedSetter = Constructor.prototype.__lookupSetter__('property');
            expect(mergedGetter).to.equal(getter);
            expect(mergedSetter).to.not.exist;
        });

        it('should override previous properties with just a setter', function(){
            Constructor.prototype.property = 'property content';
            accessorsToMerge = {};
            Object.defineProperty(accessorsToMerge, 'property', {
                set: setter
            });

            mergePrototypes(Constructor, accessorsToMerge);

            var mergedGetter = Constructor.prototype.__lookupGetter__('property');
            var mergedSetter = Constructor.prototype.__lookupSetter__('property');
            expect(mergedGetter).to.not.exist;
            expect(mergedSetter).to.equal(setter);
        });
    });
});