module("AgentHandlerTests", {
	setup: function() {
		this.mySpriteHandler = { createCircleSprite: function() {} };
	}, teardown: function() {

	}
});



test("AgentHandler can create a single agent",
	function() {
		var ah = new AgentHandler(this.mySpriteHandler, 10,10,5);
		equal(1, ah.agents.length);
		equal(5, ah.agents[0].radius);
		equal(5, ah.agents[0].x);
		equal(5, ah.agents[0].y);
	});

test("AgentHandler can create a two agents",
	function() {
		var ah = new AgentHandler(this.mySpriteHandler, 20,10,5);
		equal(2, ah.agents.length);
		equal(5, ah.agents[0].radius);
		equal(5, ah.agents[0].x);
		equal(5, ah.agents[0].y);
		equal(5, ah.agents[1].radius);
		equal(15, ah.agents[1].x);
		equal(5, ah.agents[1].y);
	});

test("AgentHandler can create a four agents",
	function() {
		var ah = new AgentHandler(this.mySpriteHandler, 20,20,5);
		equal(4, ah.agents.length);

		equal(5, ah.agents[0].radius);
		equal(5, ah.agents[0].x);
		equal(5, ah.agents[0].y);

		equal(5, ah.agents[1].radius);
		equal(5, ah.agents[1].x);
		equal(15, ah.agents[1].y);

		equal(5, ah.agents[2].radius);
		equal(15, ah.agents[2].x);
		equal(5, ah.agents[2].y);

		equal(5, ah.agents[3].radius);
		equal(15, ah.agents[3].x);
		equal(15, ah.agents[3].y);
	});

test("AgentHandler can draw one sprite", function() {
	var mockSpriteHandler = this.mock(this.mySpriteHandler);
	mockSpriteHandler.expects("createCircleSprite").once().withArgs(5,5,5);

	var ah = new AgentHandler(this.mySpriteHandler, 10, 10, 5);
	ah.draw();

	mockSpriteHandler.verify();

});

test("AgentHandler can draw four sprites", function() {
	var mockSpriteHandler = this.mock(this.mySpriteHandler);
	mockSpriteHandler.expects("createCircleSprite").once().withArgs(10,10,10);
	mockSpriteHandler.expects("createCircleSprite").once().withArgs(10,30,10);
	mockSpriteHandler.expects("createCircleSprite").once().withArgs(30,10,10);
	mockSpriteHandler.expects("createCircleSprite").once().withArgs(30,30,10);

	var ah = new AgentHandler(this.mySpriteHandler, 40, 40, 10);
	ah.draw();

	mockSpriteHandler.verify();
});

