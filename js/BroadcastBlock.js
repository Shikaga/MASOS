var BroadcastBlock = function() {
};

BroadcastBlock.prototype.setBroadcast = function(broadcastBlock) {
	this.broadcastBlock = broadcastBlock;
};

BroadcastBlock.prototype.invoke = function(agent) {
	if (this.broadcastBlock != null) {
		agent.agentHandler.broadcast(agent, this.broadcastBlock);
	}
};
