function testOffset()
{
	test("agent draws itself in correct location",
		function() {

			var mySpriteHandler = { createCircleSprite: function() {} };

			var mock = this.mock(mySpriteHandler);
			mock.expects("createCircleSprite").once().withArgs(10,10,10);
			var agent = new Agent(mySpriteHandler);
			agent.draw();
			mock.verify();
		});
}

testOffset();
