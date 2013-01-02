var IfBlock = function() {
};

IfBlock.prototype.invoke = function(agent, doBlockIf, doBlockElse) {
	if (agent.state.color == this.color) {
		agent.receiveBlock(doBlockIf);
	} else {
		agent.receiveBlock(doBlockElse);
	}
};

IfBlock.prototype.ifColor = function(color) {
	this.color = color;
}
