module("StateTests", {
	setup: function() {
		var self = this;
		this.myRaphaelSprite  = {remove: function() {}};
		this.mySpriteHandler = { createCircleSprite: function() {return self.myRaphaelSprite} };
		this.myDoBlock = { invoke: function() {}};
	}, teardown: function() {

	}
});

test("BlockHandler starts empty", function() {
	var bh = new BlockHandler();
	var blocks = bh.getBlocks();
	equal(0, blocks.length);
});

test("BlockHandler can add a new DoBlock", function() {
	var bh = new BlockHandler();
	bh.addDoBlock();
	var blocks = bh.getBlocks();
	equal(1, blocks.length);
	equal("doBlock1", blocks[0]["name"]);
	equal(true, blocks[0]["block"] instanceof DoBlock);
});

