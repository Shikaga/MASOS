var IfBlock = function() {
};

IfBlock.prototype.invoke = function(agent) {
	if (agent.state[this.field] == this.value) {
		if (this.doBlockIf != null) {
			this.doBlockIf.invoke(agent);
		}
	} else {
		if (this.doBlockElse != null ) {
			this.doBlockElse.invoke(agent);
		}
	}
};

IfBlock.prototype.set = function (field, value, doBlockIf, doBlockElse) {
	this.field = field;
	this.value = value;
	this.doBlockIf = doBlockIf;
	this.doBlockElse = doBlockElse;
}
