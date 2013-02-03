var BlockHandler = function(element){
	this.main = undefined;
	this.element = element;
	this.doBlocks = [];
	this.ifBlocks = [];
};

BlockHandler.getBlocksSupported = function() {
	return ["do", "if"];
}

BlockHandler.prototype.getBlocks = function() {
	return this.doBlocks.concat(this.ifBlocks)
}

BlockHandler.prototype.add = function(type) {
	if (type == "do") {
		this.doBlocks.push({"name": "doBlock" + (this.doBlocks.length+1), "block": new DoBlock()});
	} else if (type == "if") {
		this.ifBlocks.push({"name": "ifBlock" + (this.ifBlocks.length+1), "block": new IfBlock()});
	}
}

BlockHandler.prototype.render = function() {
	this.element.innerHTML = "";
	this.interface = document.createElement("div");
	this.interface.appendChild(this.renderMainSelector())
	this.interface.appendChild(this.renderDoBlocks());
	this.interface.appendChild(this.renderIfBlocks());
	this.interface.appendChild(this.renderDoGenerator());
	this.interface.appendChild(this.renderIfGenerator());
	this.element.appendChild(this.interface);
}

BlockHandler.prototype.renderMainSelector = function() {
	var blocksSelectorThen = this.getBlockSelector();
	blocksSelectorThen.add(new Option("undefined", "undefined"));
	blocksSelectorThen.value = this.getNameFromBlock(this.main);
	blocksSelectorThen.env = this;
	blocksSelectorThen.onchange = function() {
		var doBlock = this.env.getBlockFromName(this.value);
		this.env.main = doBlock;
	//debugger;
	}
	return blocksSelectorThen;
}


BlockHandler.prototype.renderDoBlocks = function() {
	var self = this;
	var blocksDiv = document.createElement("div");

	for (var i=0; i < this.doBlocks.length; i++) {
		var blockDiv = document.createElement("div");
		var spanName = document.createElement("span");
		var fieldSelect = this.getDoFieldSelector();
		fieldSelect.add(new Option("undefined", "undefined"));
		fieldSelect.value = this.doBlocks[i]["block"].field;
		fieldSelect.env = this.doBlocks[i];
		fieldSelect.onchange = function() {
			this.env.block.setField(this.value, this.env.block.value);
		}

		var colorSelect = this.getColorSelect();
		colorSelect.add(new Option("undefined", "undefined"));
		colorSelect.value = this.doBlocks[i]["block"].value;
		colorSelect.env = this.doBlocks[i];
		colorSelect.onchange = function() {
			this.env.block.setField(this.env.block.field, this.value);
		}

		spanName.innerHTML  = this.doBlocks[i]["name"];
		blockDiv.appendChild(spanName);
		blockDiv.appendChild(fieldSelect);
		blockDiv.appendChild(colorSelect);
		blocksDiv.appendChild(blockDiv);
		console.log(this.doBlocks[i]["name"]);
	}
	return blocksDiv;
}

BlockHandler.prototype.renderIfBlocks = function() {
	var self = this;
	var blocksDiv = document.createElement("div");

	for (var i=0; i < this.ifBlocks.length; i++) {
		var blockDiv = document.createElement("div");
		var spanName = document.createElement("span");

		var fieldSelect = this.getDoFieldSelector();
		fieldSelect.add(new Option("undefined", "undefined"));
		fieldSelect.value = this.ifBlocks[i]["block"].field;
		fieldSelect.env = this.ifBlocks[i];
		fieldSelect.onchange = function() {
			this.env.block.set(this.value, this.env.block.value, this.env.block.doBlockIf, this.env.block.doBlockElse);
		}

		var colorSelect = this.getColorSelect();
		colorSelect.add(new Option("undefined", "undefined"));
		colorSelect.value = this.ifBlocks[i]["block"].value;
		colorSelect.env = this.ifBlocks[i];
		colorSelect.onchange = function() {
			this.env.block.set(this.env.block.field, this.value, this.env.block.doBlockIf, this.env.block.doBlockElse);

		}

		var blocksSelectorThen = this.getBlockSelector();
		blocksSelectorThen.add(new Option("undefined", "undefined"));
		blocksSelectorThen.value = this.getNameFromBlock( this.ifBlocks[i]["block"].doBlockIf);
		blocksSelectorThen.env = this;
		blocksSelectorThen.block = this.ifBlocks[i].block
		blocksSelectorThen.onchange = function() {
			var doBlock = this.env.getBlockFromName(this.value);
			this.block.set(this.block.field, this.block.value, doBlock, this.block.doBlockElse);
		}

		var blocksSelectorElse = this.getBlockSelector();
		blocksSelectorElse.add(new Option("undefined", "undefined"));
		blocksSelectorElse.value = this.getNameFromBlock( this.ifBlocks[i]["block"].doBlockElse);
		blocksSelectorElse.env = this;
		blocksSelectorElse.block = this.ifBlocks[i].block
		blocksSelectorElse.onchange = function() {
			var doBlock = this.env.getBlockFromName(this.value);
			this.block.set(this.block.field, this.block.value, this.block.doBlockIf, doBlock);
		}

		spanName.innerHTML  = this.ifBlocks[i]["name"];
		blockDiv.appendChild(spanName);

		blockDiv.appendChild(fieldSelect);
		blockDiv.appendChild(colorSelect);
		blockDiv.appendChild(blocksSelectorThen);
		blockDiv.appendChild(blocksSelectorElse);

		blocksDiv.appendChild(blockDiv);



	}
	return blocksDiv;
}

BlockHandler.prototype.getNameFromBlock = function(block) {
	var blocks = this.getBlocks();
	for (var i=0; i < blocks.length; i++) {
		if (blocks[i].block == block) return blocks[i].name;
	}
}

BlockHandler.prototype.getBlockFromName = function(name) {
	var blocks = this.getBlocks();
	for (var i=0; i < blocks.length; i++) {
		if (blocks[i].name == name) return blocks[i].block;
	}
}

BlockHandler.prototype.getDoFieldSelector = function() {
	var selectElement = document.createElement("select");
	var fields = State.getFields();
	for (var i=0; i < fields.length; i++) {
			selectElement.options[i] = new Option(fields[i], fields[i])
			}
	return selectElement;
}

BlockHandler.prototype.getColorSelect = function() {
	var selectElement = document.createElement("select");
	var fields = ["red", "white", "blue", "green"];
	for (var i=0; i < fields.length; i++) {
			selectElement.options[i] = new Option(fields[i], fields[i])
			}
	return selectElement;
}


BlockHandler.prototype.renderDoGenerator = function() {
	var renderSpan = document.createElement("div");
	var selectElement = this.getDoFieldSelector();

	renderSpan.appendChild(document.createTextNode("DO: "));
	renderSpan.appendChild(selectElement);

	var addButton = document.createElement("button");
	addButton.innerHTML = "Add";
	var self = this;
	addButton.onclick = function() {
		self.add("do");
		self.render();
	}
	renderSpan.appendChild(addButton);
	return renderSpan;
}

BlockHandler.prototype.renderIfGenerator = function() {
	var renderSpan = document.createElement("div");


	renderSpan.appendChild(document.createTextNode("IF: "));



	var addButton = document.createElement("button");
	addButton.innerHTML = "Add";
	var self = this;
	addButton.onclick = function() {
		self.add("if");
		self.render();
	}
	renderSpan.appendChild(addButton);
	return renderSpan;
}

BlockHandler.prototype.getBlockSelector = function() {
	var selectElement = document.createElement("select");
	var blocks = this.getBlocks();
	for (var i=0; i < blocks.length; i++) {
		selectElement.options[i] = new Option(blocks[i].name, blocks[i].name);
	}
	return selectElement;
}
