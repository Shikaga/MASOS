var SpriteHandler = function() {

}

SpriteHandler.prototype.createLeafSprite = function(x, y, size)
{
    var circle = paper.image("images/autumn_leaf.svg", x, y, 20, 20);
    return circle;
}

SpriteHandler.prototype.createCherryBlossomSprite = function(x, y, size)
{
    var circle = paper.image("images/cherry_blossom.svg", x, y, 20, 20);
    return circle;
}

SpriteHandler.prototype.createMoneySprite = function(x, y, size)
{
    var circle = paper.image("images/money.jpg", x, y, 40, 20);
    return circle;
}

SpriteHandler.prototype.createCircleSprite = function(x, y, size, color)
{
    var circle = paper.circle(x, y, size);    
    circle.attr("fill", color || "#fff");
    return circle;
}

SpriteHandler.prototype.animateSprite = function(sprite, x, y, timeToAnimate)
{
	if (sprite == null) return;
	var rotate =  Math.random() * 2000 - 1000;
    sprite.animate({transform: "t" + x + "," + y + "r" + rotate}, timeToAnimate, "");
	setTimeout(function() {sprite.remove()}, timeToAnimate);
}

var paper = Raphael(0, 0, "100%", "100%");
var svg = document.getElementsByTagName("svg")[0];
svg.setAttribute("pointer-events", "none");

