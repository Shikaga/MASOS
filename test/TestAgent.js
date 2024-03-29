module("AgentTests", {
	setup: function() {
		var self = this;
		this.myRaphaelSprite  = {remove: function() {}};
		this.mySpriteHandler = { createCircleSprite: function() {return self.myRaphaelSprite} };
		this.myAgentHandler = { spriteHandler: this.mySpriteHandler };
		this.myDoBlock = { invoke: function() {}};
	}, teardown: function() {

	}
});



test("agent draws itself in correct location",
	function() {
		var mockSpriteHandler = this.mock(this.mySpriteHandler);

		var agent = new Agent(this.myAgentHandler, 10,10,10);
		mockSpriteHandler.expects("createCircleSprite").once().withArgs(10,10,10);
		agent.draw();
		mockSpriteHandler.verify();

		var mockSpriteHandler2 = this.mock(this.mySpriteHandler);

		var agent2 = new Agent(this.myAgentHandler, 20,20,20);
		mockSpriteHandler2.expects("createCircleSprite").once().withArgs(20,20,20);
		agent2.draw();
		mockSpriteHandler2.verify();
	});
	
test("agent can draw itself with a color", function() {
	
	var mockSpriteHandler = this.mock(this.mySpriteHandler);
	mockSpriteHandler.expects("createCircleSprite").once().withArgs(10,10,10, "red");
	
	var agent = new Agent(this.myAgentHandler, 10,10,10);
	agent.state.color ="red";
	agent.draw();
	
	mockSpriteHandler.verify();
	
});

test("agent doesn't invoke doBlock before step",
	function() {
		var mockSpriteHandler = this.mock(this.mySpriteHandler);
		var agent = new Agent(this.myAgentHandler, 10,10,10);

		var mockDoBlock = this.mock(this.myDoBlock);
		agent.receiveBlock(this.myDoBlock);
		mockDoBlock.verify();
	});

test("agent invokes DoBlocks on step",
	function() {
		var mockSpriteHandler = this.mock(this.mySpriteHandler);
		var agent = new Agent(this.myAgentHandler, 10,10,10);

		var mockDoBlock = this.mock(this.myDoBlock);
		mockDoBlock.expects("invoke").once().withArgs(agent);
		agent.receiveBlock(this.myDoBlock);
		agent.step();
		mockDoBlock.verify();
	});

	
test("agent redraws itself after a doBlock", function() {
	var mockSpriteHandler = this.mock(this.mySpriteHandler);
	var mockRaphaelSprite = this.mock(this.myRaphaelSprite);
	var agent = new Agent(this.myAgentHandler, 10,10,10);


	mockRaphaelSprite.expects("remove").once();
	//mockSpriteHandler.expects("createCircleSprite").once();

	agent.draw();
	agent.receiveBlock(this.myDoBlock);
	agent.step();

	mockSpriteHandler.verify();
	mockRaphaelSprite.verify();
});

test("agent invokes a broadcast block on receipt", function() {
	var agent = new Agent(this.myAgentHandler, 10,10,10);

	var mockDoBlock = this.mock(this.myDoBlock);
	mockDoBlock.expects("invoke").once().withArgs(agent);
	agent.receiveBroadcast(this.myDoBlock);
	mockDoBlock.verify();
});