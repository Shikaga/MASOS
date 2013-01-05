var DoBlock = function() {
};

DoBlock.prototype.setField = function (field, value) {
	this.field = field;
	this.value = value;
};

DoBlock.prototype.setBroadcast = function(broadcastBlock) {
	this.broadcastBlock = broadcastBlock;
};

DoBlock.prototype.invoke = function(agent) {
	if (this.value != null) {
		agent.state[this.field] = this.value;
	} else if (this.broadcastBlock != null) {
		agent.agentHandler.broadcast(agent, this.broadcastBlock);
	}
};
