
//
// Character module
//

function Character (character_name) {
	this.idUser = null;
	this.characterName	= character_name;
	this.equipment = [];
	this.features = {
		tiredness	: 0,
		endurance	: 0,
		sight		: 0,
		strengh		: 0
	};
}

User.prototype.getId = function() {
	return this.id;
};