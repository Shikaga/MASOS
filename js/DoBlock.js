var DoBlock = function() {
};

DoBlock.prototype.changeColor = function(color) {
	this.color = color;
};

DoBlock.prototype.setBroadcast = function(broadcastBlock) {
	this.broadcastBlock = broadcastBlock;
};

DoBlock.prototype.if = function(ifBlock) {
	this.ifBlock = ifBlock;
};

DoBlock.prototype.invoke = function(agent) {
	if (this.ifBlock != null) {
		this.ifBlock.invoke(agent);
	} else if (this.color != null) {
		agent.state.color = this.color;
	} else if (this.broadcastBlock != null) {
		agent.agentHandler.broadcast(agent, this.broadcastBlock);
	}
};
