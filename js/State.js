var State = function(agent){
	this.color = "white";
	this.agent = agent;
};

State.prototype.getFields = function() {
	return ["color"];
}