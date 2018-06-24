var ActionContextDecorator = requireImpl('/lib/context-factory/action-context-decorator.js');

describe('ActionContextDecorator', function(){
	describe('constructor', function (){
		it('should not throw an error when no action is given', function (){
			function createActionContextDecoratorWithoutAction(){
				return new ActionContextDecorator();
			}

			expect(createActionContextDecoratorWithoutAction).to.not.throw();
		});
	});

	describe('#decorate()', function(){
		it('should not throw an error if the given action has no init function', function(){
			var action = {};
			var context = {};

			function callDecorateForActionWithoutInit(){
				return new ActionContextDecorator(action).decorate(context);
			}

			expect(callDecorateForActionWithoutInit).to.not.throw();
		});

		it('should decorate the context by calling the action init function', function(){
			var action = {
				init: function(context){
					context.bar = 'foo';
				}
			};
			var context = {};
			var actionContextDecorator = new ActionContextDecorator(action);

			return expect(actionContextDecorator.decorate(context)).to.deep.equal({
				bar: 'foo'
			});
		});
	});
});