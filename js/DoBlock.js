var DoBlock = function() {
};

DoBlock.prototype.setField = function (field, value) {
	this.field = field;
	this.value = value;
};

DoBlock.prototype.invoke = function(agent) {
	if (this.value != null) {
		agent.state[this.field] = this.value;
	}
};

DoBlock.prototype.getStateFieldDropDown = function() {
	var selectElement = document.createElement("select");
	selectElement.add(new Option("undefined", "undefined"));
	var self = this;
	selectElement.onchange = function() {
		self.field = this.value;
	}
	var fields = State.getFields();
	for (var i=0; i < fields.length; i++) {
		selectElement.add(new Option(fields[i], fields[i]));
	}
	selectElement.value = this.field;
	return selectElement;
}

DoBlock.prototype.getFieldOptionsDropDown = function() {
	if (this.field == "color") {
		var selectElement = document.createElement("select");
		var self = this;
		selectElement.onchange = function() {
			self.value = this.value;
		}
		selectElement.add(new Option("undefined", "undefined"));
		var fields = ["red", "white", "blue", "green"];
		for (var i=0; i < fields.length; i++) {
			selectElement.add(new Option(fields[i], fields[i]));
		}
		selectElement.value = this.value;
		return selectElement;
	}
	return null;
}