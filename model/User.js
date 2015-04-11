
//
// Projet Elsa
//

//
// User module
//

function User (user_name) {
	this.id		= null;
	this.name	= user_name;
	this.password = null;
	this.characters = [];
}

User.prototype.getId = function() {
	return this.id;
};

User.prototype.getName = function() {
	return this.name;
};

User.prototype.getPassword = function() {
	return this.password;
};

User.prototype.getCharacters = function() {
	return this.characters;
};

module.exports = User;