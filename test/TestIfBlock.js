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

		ib.ifColor("white", dbRed, dbBlue);
		ib.invoke(agent);

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

		ib.ifColor("red", dbRed, dbBlue);
		ib.invoke(agent);

		equal("blue", agent.state.color);
	});

test("IfBlock color rotator",
	function() {
		var dbRed = new DoBlock();
		dbRed.changeColor("red");
		var dbBlue = new DoBlock();
		dbBlue.changeColor("blue");
		var dbWhite = new DoBlock();
		dbWhite.changeColor("white");

		var ibWhite = new IfBlock();
		var ibRed = new IfBlock();
		var ibBlue = new IfBlock();

		ibWhite.ifColor("white", dbRed, ibRed);
		ibRed.ifColor("red", dbBlue, ibBlue);
		ibBlue.ifColor("blue", dbWhite, ibWhite);

		var agent = new Agent(this.mySpriteHandler, 10,10,10);


		ibWhite.invoke(agent);
		equal("red", agent.state.color);

		ibWhite.invoke(agent);
		equal("blue", agent.state.color);

		ibWhite.invoke(agent);
		equal("white", agent.state.color);

		ibWhite.invoke(agent);
		equal("red", agent.state.color);
	});
