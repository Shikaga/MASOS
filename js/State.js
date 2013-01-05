var State = function(agent){
	this.color = "white";
	this.agent = agent;
};

State.getFields = function() {
	return ["color"];
}