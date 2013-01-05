module("StateTests", {
	setup: function() {
		var self = this;
		this.myRaphaelSprite  = {remove: function() {}};
		this.mySpriteHandler = { createCircleSprite: function() {return self.myRaphaelSprite} };
		this.myDoBlock = { invoke: function() {}};
	}, teardown: function() {

	}
});

test("State color starts as white", function() {
	var state = new State();
	equal("white", state["color"]);
});

test("State returns all the fields it has", function() {
	var state = new State();
	deepEqual(["color"], state.getFields())
});
