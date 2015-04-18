
//
// Character module
//

function Character (character_name) {
	this.x		= null;
	this.y		= null;
	this.idUser = null;
	this.level	= 1;
	this.characterName	= character_name;
	this.equipment = [];
	this.features = {
		tiredness	: 0,
		endurance	: 0,
		sight		: 0,
		strengh		: 0
	};
}