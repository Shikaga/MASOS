module("StateTests", {
	setup: function() {
		var self = this;
		this.myRaphaelSprite  = {remove: function() {}};
		this.mySpriteHandler = { createCircleSprite: function() {return self.myRaphaelSprite} };
		this.myDoBlock = { invoke: function() {}};
	}, teardown: function() {

	}
});

test("BlockHandler supports doAndIf", function() {
	var bs = BlockHandler.getBlocksSupported();
	deepEqual(["do", "if"], bs);
});

test("BlockHandler starts empty", function() {
	var bh = new BlockHandler();
	var blocks = bh.getBlocks();
	equal(0, blocks.length);
});

test("BlockHandler can add a new DoBlock", function() {
	var bh = new BlockHandler();
	bh.add("do");
	var blocks = bh.getBlocks();
	equal(1, blocks.length);
	equal("doBlock1", blocks[0]["name"]);
	equal(true, blocks[0]["block"] instanceof DoBlock);
});


test("BlockHandler can two new DoBlocks", function() {
	var bh = new BlockHandler();
	bh.add("do");
	bh.add("do");
	var blocks = bh.getBlocks();
	equal(2, blocks.length);
	equal("doBlock1", blocks[0]["name"]);
	equal(true, blocks[0]["block"] instanceof DoBlock);
	equal("doBlock2", blocks[1]["name"]);
	equal(true, blocks[1]["block"] instanceof DoBlock);
});

test("BlockHandler can add a new IfBlock", function() {
	var bh = new BlockHandler();
	bh.add("if");
	var blocks = bh.getBlocks();
	equal(1, blocks.length);
	equal("ifBlock1", blocks[0]["name"]);
	equal(true, blocks[0]["block"] instanceof IfBlock);
});

