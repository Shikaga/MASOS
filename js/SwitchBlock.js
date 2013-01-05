var SwitchBlock = function() {
};

SwitchBlock.prototype.invoke = function(agent) {
	var agentValueForField = agent.state[this.field];
	var doBlock = this.switches[agentValueForField];
	doBlock.invoke(agent);
};

SwitchBlock.prototype.set = function (field, switches) {
	this.field = field;
	this.switches = switches;
}
