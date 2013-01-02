var IfBlock = function() {
};

IfBlock.prototype.invoke = function(agent) {
	if (agent.state.color == this.color) {
		agent.receiveBlock(this.doBlockIf);
	} else {
		agent.receiveBlock(this.doBlockElse);
	}
};

IfBlock.prototype.ifColor = function(color, doBlockIf, doBlockElse) {
	this.color = color;
	this.doBlockIf = doBlockIf;
	this.doBlockElse = doBlockElse;
}
