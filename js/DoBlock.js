var DoBlock = function() {
    
};

DoBlock.prototype.changeColor = function(color) {
    this.color = color;
};

DoBlock.prototype.invoke = function(agent) {
    agent.setColor(this.color);
};
