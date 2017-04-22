var fs = require('fs');

//Constructor Cloze Card
var ClozeCard = function (text, cloze){
	this.text = text; 
	this.cloze = cloze;
}

//Method to replace answer by ...
ClozeCard.prototype.partialText = function () {

	var clozeText = this.cloze;
	return this.text.replace(clozeText, '...');
}

//Export and makes available to other modules
module.exports = ClozeCard; 