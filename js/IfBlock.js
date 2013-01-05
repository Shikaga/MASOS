var IfBlock = function() {
};

IfBlock.prototype.invoke = function(agent) {
	if (agent.state[this.field] == this.value) {
		this.doBlockIf.invoke(agent);
	} else {
		this.doBlockElse.invoke(agent);
	}
};

IfBlock.prototype.set = function (field, value, doBlockIf, doBlockElse) {
	this.field = field;
	this.value = value;
	this.doBlockIf = doBlockIf;
	this.doBlockElse = doBlockElse;
}
