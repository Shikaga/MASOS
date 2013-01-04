module("AndBlock Tests", {
	setup: function() {
		this.state = new State();
		this.myDoBlock1 = {invoke: function() {}};
		this.myDoBlock2 = {invoke: function() {}};
		this.mySpriteHandler = { createCircleSprite: function() {} };
		this.myAgent = { setColor: function() {}};
	}, teardown: function() {

	}
});

test("IfBlock invokes DoBlock if color is correct",
	function() {
		var mockDoBlock1 = this.mock(this.myDoBlock1);
		var mockDoBlock2 = this.mock(this.myDoBlock2);

		var ab = new AndBlock();
		ab.and(this.myDoBlock1, this.myDoBlock2);

		mockDoBlock1.expects("invoke").once();
		mockDoBlock2.expects("invoke").once();

		ab.invoke(this.myAgent);
	});
