module("DoBlock Tests", {
	setup: function() {
		this.mySpriteHandler = { createCircleSprite: function() {} };
		this.myAgent = { setColor: function() {}};
	}, teardown: function() {

	}
});



test("DoBlock can change agents color",
	function() {
		var db = new DoBlock();
		db.changeColor("red");
		var agent = new Agent(this.mySpriteHandler, 10,10,10);
		db.invoke(agent);
		equal("red", agent.state.color);
	});

