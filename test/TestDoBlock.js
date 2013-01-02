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
		var mockAgent = this.mock(this.myAgent);
		mockAgent.expects("setColor").once().withArgs("red");
		db.invoke(this.myAgent);
		mockAgent.verify();
	});

