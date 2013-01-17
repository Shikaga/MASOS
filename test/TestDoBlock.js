module("DoBlock Tests", {
	setup: function() {
		var self = this;
		this.mySpriteHandler = { createCircleSprite: function() {} };
		this.myAgentHandler = { spriteHandler: this.mySpriteHandler, broadcast : function() {}};
		this.myAgent = { setColor: function() {}};
	}, teardown: function() {

	}
});

test("DoBlock can change agents color",
	function() {
		var db = new DoBlock();
		db.setField("color", "red");
		var agent = new Agent(this.mySpriteHandler, 10,10,10);
		db.invoke(agent);
		equal("red", agent.state.color);
	});

test("DoBlock can broadcast", function() {
	var mockAgentHandler = this.mock(this.myAgentHandler);
	mockAgentHandler.expects("broadcast").once();

	var dbColor = new DoBlock();
	dbColor.setField("color", "red");
	var dbBroadcast = new BroadcastBlock();
	dbBroadcast.setBroadcast(dbColor);

	var agent = new Agent(this.myAgentHandler, 10,10,10);
	agent.receiveBlock(dbBroadcast);
	agent.step();

	mockAgentHandler.verify();
});

test("DoBlock StateField Dropdown contains all states and undefined", function() {
	var dbColor = new DoBlock();
	var dropDown = dbColor.getStateFieldDropDown();
	equal(2, dropDown.options.length);
	dropDownContains(dropDown, "color", "color");
	dropDownContains(dropDown, "undefined", "undefined");
});

test("DoBlock stateField dropdown starts as undefined", function() {
	var dbColor = new DoBlock();
	var dropDown = dbColor.getStateFieldDropDown();
	equal(1, dropDown.selectedOptions.length);
	equal("undefined", dropDown.selectedOptions[0].value);
	equal("undefined", dropDown.selectedOptions[0].innerHTML);
});

test("DoBlock stateField dropdown switches to color when it is set", function() {
	var dbColor = new DoBlock();
	dbColor.setField("color");
	var dropDown = dbColor.getStateFieldDropDown();
	equal(1, dropDown.selectedOptions.length);
	equal("color", dropDown.selectedOptions[0].value);
	equal("color", dropDown.selectedOptions[0].innerHTML);
});

test("DoBlock stateField changes state onchange", function() {
	var dbColor = new DoBlock();
	var dropDown = dbColor.getStateFieldDropDown();
	dropDown.options[1].selected = true;
	dropDown.onchange();
	equal("color", dbColor.field);
});

test("DoBlock fieldOptions dropdown is null when stateField not set", function() {
	var dbColor = new DoBlock();
	var dropDown = dbColor.getFieldOptionsDropDown();
	equal(null, dropDown);
});

test("DoBlock fieldOptions dropdown lists colors and undefined when set", function() {
	var dbColor = new DoBlock();
	dbColor.setField("color");
	var dropDown = dbColor.getFieldOptionsDropDown();
	equal(5, dropDown.options.length);
	dropDownContains(dropDown, "red", "red");
	dropDownContains(dropDown, "undefined", "undefined");
});

test("DoBlock colorOptions defaults to undefined", function() {
	var dbColor = new DoBlock();
	dbColor.setField("color");
	var dropDown = dbColor.getFieldOptionsDropDown();
	equal(1, dropDown.selectedOptions.length);
	equal("undefined", dropDown.selectedOptions[0].value);
	equal("undefined", dropDown.selectedOptions[0].innerHTML);
});

test("DoBlock colorOptions changes when set to color", function() {
	var dbColor = new DoBlock();
	dbColor.setField("color", "red");
	var dropDown = dbColor.getFieldOptionsDropDown();
	equal(1, dropDown.selectedOptions.length);
	equal("red", dropDown.selectedOptions[0].value);
	equal("red", dropDown.selectedOptions[0].innerHTML);
});

test("DoBlock colorOptions changes state onchange", function() {
	var dbColor = new DoBlock();
	dbColor.setField("color", null);
	var dropDown = dbColor.getFieldOptionsDropDown();
	dropDown.options[1].selected = true;
	dropDown.onchange();
	equal("red", dbColor.value);
});



function genericIfBlock() {
	var ib = new IfBlock();
	var dbRed = new DoBlock();
	dbRed.setField("color", "red");
	var dbBlue = new DoBlock();
	dbBlue.setField("color", "blue");
	ib.set("color", "white", dbRed, dbBlue);
	return ib;
}

function dropDownContains(dropdown, value, innerHTML) {
	for (var i=0; i < dropdown.length; i++) {
		if (dropdown[i].innerHTML == innerHTML  && dropdown[i].value == value) return;
	}
	ok(false, "Option [" + value + "|" + innerHTML + "] could not be found in select");
}