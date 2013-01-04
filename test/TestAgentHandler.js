module("AgentHandlerTests", {
	setup: function() {
		this.mySpriteHandler = { createCircleSprite: function() {} };
		this.myAgentHandler = { spriteHandler: this.mySpriteHandler };
        this.myDoBlock = { invoke: function() {}};
    }, teardown: function() {

	}
});

test("AgentHandler can create a single agent",
	function() {
		var ah = new AgentHandler(this.myAgentHandler, 10,10,5);
		equal(1, ah.agents.length);
		equal(5, ah.agents[0].radius);
		equal(5, ah.agents[0].x);
		equal(5, ah.agents[0].y);
	});

test("AgentHandler can create a two agents",
	function() {
		var ah = new AgentHandler(this.myAgentHandler, 20,10,5);
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
		var ah = new AgentHandler(this.myAgentHandler, 20,20,5);
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

test("AgentHandler can apply a DoBlock to all sprites", function() {
	var mockSpriteHandler = this.mock(this.mySpriteHandler);
	var mockDoBlock = this.mock(this.myDoBlock);

	mockDoBlock.expects("invoke").exactly(4);

	var ah = new AgentHandler(this.mySpriteHandler, 40, 40, 10);
	ah.setDoBlock(this.myDoBlock);
	ah.step();

	mockDoBlock.verify();
});

test("AgentHandler does nothing if DoBlock not set when step invoked", function() {
	var mockSpriteHandler = this.mock(this.mySpriteHandler);
	var mockDoBlock = this.mock(this.myDoBlock);

	mockDoBlock.expects("invoke").exactly(0);

	var ah = new AgentHandler(this.mySpriteHandler, 40, 40, 10);
	ah.step();

	mockDoBlock.verify();
});

test("AgentHandler can applies the doBlock to each sprite every time step is invoked", function() {
	var mockSpriteHandler = this.mock(this.mySpriteHandler);
	var mockDoBlock = this.mock(this.myDoBlock);


	var ah = new AgentHandler(this.mySpriteHandler, 40, 40, 10);
	ah.setDoBlock(this.myDoBlock);
	ah.step();


	mockDoBlock.expects("invoke").exactly(4);
	ah.step();
	mockDoBlock.verify();
});

test("AgentHandler can find no adjacent agents", function() {
	var ah = new AgentHandler(this.mySpriteHandler,10,10,5);
	var agents = ah.getAdjacentAgents(ah.agents[0]);
	equal(0,agents.length);
});

test("AgentHandler can find one adjacent agent", function() {
	var ah = new AgentHandler(this.mySpriteHandler,20,10,5);
	var agents = ah.getAdjacentAgents(ah.agents[0]);
	equal(1,agents.length);
	equal(15, agents[0].x);
	equal(5, agents[0].y);
});


test("AgentHandler can find two adjacent agents and ignores diagonal agent", function() {
	var ah = new AgentHandler(this.mySpriteHandler,20,20,5);
	var agents = ah.getAdjacentAgents(ah.agents[0]);
	equal(2,agents.length);
});

test("AgentHandler doesn't broadcast until step", function() {
	var ah = new AgentHandler(this.mySpriteHandler,20,20,5);
	var db = new DoBlock();
	db.changeColor("red");
	ah.broadcast(ah.agents[0], db);

	equal("white", ah.agents[0].state.color);
	equal("white", ah.agents[1].state.color);
	equal("white", ah.agents[2].state.color);
	equal("white", ah.agents[3].state.color);
});

test("AgentHandler can broadcast to adjacent agents after step", function() {
	var ah = new AgentHandler(this.mySpriteHandler,20,20,5);
	var db = new DoBlock();
	db.changeColor("red");
	ah.broadcast(ah.agents[0], db);
	ah.step();

	equal("white", ah.agents[0].state.color);
	equal("red", ah.agents[1].state.color);
	equal("red", ah.agents[2].state.color);
	equal("white", ah.agents[3].state.color);
});

test("AgentHandler doesn't handle broadcasts until after a step is complete", function() {
	var ah = new AgentHandler(this.mySpriteHandler,20,20,5);

	var self = this;
	this.counter = 0;

	var testDoBlock =  {
		invoke : function(agent) {
			self.counter += 1;
			agent.agentHandler.broadcast(agent, {
				invoke: function() {
					equal(4, self.counter);
				}
			})
		}
	}

	var db = new DoBlock();
	//db.setBroadcast(testDoBlock);
	ah.setDoBlock(testDoBlock);
	ah.step();
	ah.step();
	equal(8, this.counter);
});

//test("AgentHandler doesn't handle broadcasts until after a step is complete", function() {
//	var ah = new AgentHandler(this.mySpriteHandler,20,20,5);
//
//	var self = this;
//	this.counter = 0;
//
//	var testDoBlock =  {
//		invoke : function(agent) {
//			self.counter += 1;
//			agent.agentHandler.broadcast(agent, {
//				invoke: function(agent) {
//					debugger
//					agent.agentHandler.broadcast(agent, {
//						invoke: function() {debugger}
//					});
//				}
//			})
//		}
//	}
//
//	var db = new DoBlock();
//	//db.setBroadcast(testDoBlock);
//	ah.setDoBlock(testDoBlock);
//	ah.step();
//});
