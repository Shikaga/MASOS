module("AgentTests", {
	setup: function() {
		this.mySpriteHandler = { createCircleSprite: function() {} };
	}, teardown: function() {

	}
});



test("agent draws itself in correct location",
	function() {
		var mockSpriteHandler = this.mock(this.mySpriteHandler);

		var agent = new Agent(this.mySpriteHandler, 10,10,10);
		mockSpriteHandler.expects("createCircleSprite").once().withArgs(10,10,10);
		agent.draw();
		mockSpriteHandler.verify();

		var mockSpriteHandler2 = this.mock(this.mySpriteHandler);

		var agent2 = new Agent(this.mySpriteHandler, 20,20,20);
		mockSpriteHandler2.expects("createCircleSprite").once().withArgs(20,20,20);
		agent2.draw();
		mockSpriteHandler2.verify();
	});

