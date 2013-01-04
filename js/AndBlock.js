var AndBlock = function() {
};

AndBlock.prototype.and = function(doBlock1, doBlock2) {
	this.doBlock1 = doBlock1;
	this.doBlock2 = doBlock2;
};

AndBlock.prototype.invoke = function(agent) {
	this.doBlock1.invoke(agent);
	this.doBlock2.invoke(agent);
};