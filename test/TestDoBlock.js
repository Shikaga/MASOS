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

test("DoBlock can invoke an IfBlock",
	function() {
		var ib = genericIfBlock();

		var db = new DoBlock();
		db.if(ib);

		var agent = new Agent(this.mySpriteHandler, 10,10,10);
		db.invoke(agent);
		equal("red", agent.state.color);
});

function genericIfBlock() {
	var ib = new IfBlock();
	var dbRed = new DoBlock();
	dbRed.changeColor("red");
	var dbBlue = new DoBlock();
	dbBlue.changeColor("blue");
	ib.ifColor("white", dbRed, dbBlue);
	return ib;
}

