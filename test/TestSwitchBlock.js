module("IfBlock Tests", {
	setup: function() {
		this.state = new State();
		this.mySpriteHandler = { createCircleSprite: function() {} };
		this.myAgent = { setColor: function() {}};
	}, teardown: function() {

	}
});

test("SwitchBlock invokes DoBlock if color is correct",
	function() {
		var sb = new SwitchBlock();
		var dbRed = new DoBlock();
		var dbBlue = new DoBlock();

		dbRed.setField("color", "red");
		dbBlue.setField("color", "blue");
		var agent = new Agent(this.mySpriteHandler, 10,10,10);

		sb.set("color", {
			"white": dbRed,
			"blue": dbBlue
		})
		sb.invoke(agent);

		equal("red", agent.state.color);
	});


test("SwitchBlock does nothing if color not matched",
	function() {
		var sb = new SwitchBlock();
		var dbRed = new DoBlock();
		var dbBlue = new DoBlock();

		dbRed.setField("color", "red");
		dbBlue.setField("color", "blue");
		var agent = new Agent(this.mySpriteHandler, 10,10,10);

		sb.set("color", {
			"red": dbRed,
			"blue": dbBlue
		})
		sb.invoke(agent);

		equal("white", agent.state.color);
	});
