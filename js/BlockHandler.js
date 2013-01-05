var BlockHandler = function(){
	this.blocks = [];
};

BlockHandler.prototype.getBlocks = function() {
	return this.blocks;
}

BlockHandler.prototype.addDoBlock = function() {
	this.blocks = [{"name": "doBlock1", "block": new DoBlock()}];
}
