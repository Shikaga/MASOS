module("IfBlock Tests", {
	setup: function() {
		this.state = new State();
		this.mySpriteHandler = { createCircleSprite: function() {} };
		this.myAgent = { setColor: function() {}};
	}, teardown: function() {

	}
});

test("IfBlock invokes DoBlock if color is correct",
	function() {
		var ib = new IfBlock();
		var dbRed = new DoBlock();
		dbRed.changeColor("red");
		var dbBlue = new DoBlock();
		dbBlue.changeColor("blue");

		var agent = new Agent(this.mySpriteHandler, 10,10,10);

		ib.ifColor("white");
		ib.invoke(agent, dbRed, dbBlue);

		equal("red", agent.state.color);
	});

test("IfBlock invokes DoBlock if color is wrong",
	function() {
		var ib = new IfBlock();
		var dbRed = new DoBlock();
		dbRed.changeColor("red");
		var dbBlue = new DoBlock();
		dbBlue.changeColor("blue");

		var agent = new Agent(this.mySpriteHandler, 10,10,10);

		ib.ifColor("red");
		ib.invoke(agent, dbRed, dbBlue);

		equal("blue", agent.state.color);
	});

