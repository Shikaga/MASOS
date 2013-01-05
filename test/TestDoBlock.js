module("DoBlock Tests", {
	setup: function() {
		var self = this;
		this.mySpriteHandler = { createCircleSprite: function() {} };
		this.myAgentHandler = { spriteHandler: this.mySpriteHandler, broadcast : function() {}};
		this.myAgent = { setColor: function() {}};
	}, teardown: function() {

	}
});



test("DoBlock can change agents color",
	function() {
		var db = new DoBlock();
		db.setField("color", "red");
		var agent = new Agent(this.mySpriteHandler, 10,10,10);
		db.invoke(agent);
		equal("red", agent.state.color);
	});

test("DoBlock can broadcast", function() {
	var mockAgentHandler = this.mock(this.myAgentHandler);
	mockAgentHandler.expects("broadcast").once();

	var dbColor = new DoBlock();
	dbColor.setField("color", "red");
	var dbBroadcast = new BroadcastBlock();
	dbBroadcast.setBroadcast(dbColor);

	var agent = new Agent(this.myAgentHandler, 10,10,10);
	agent.receiveBlock(dbBroadcast);
	agent.step();

	mockAgentHandler.verify();
});

function genericIfBlock() {
	var ib = new IfBlock();
	var dbRed = new DoBlock();
	dbRed.setField("color", "red");
	var dbBlue = new DoBlock();
	dbBlue.setField("color", "blue");
	ib.set("color", "white", dbRed, dbBlue);
	return ib;
}

