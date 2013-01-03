var IfBlock = function() {
};

IfBlock.prototype.invoke = function(agent) {
	if (agent.state.color == this.color) {
		this.doBlockIf.invoke(agent);
	} else {
		this.doBlockElse.invoke(agent);
	}
};

IfBlock.prototype.ifColor = function(color, doBlockIf, doBlockElse) {
	this.color = color;
	this.doBlockIf = doBlockIf;
	this.doBlockElse = doBlockElse;
}
