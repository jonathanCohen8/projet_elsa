
//
// Projet Elsa
//

//
// User module
//

function User (username, password, mail) {
	this.id			= null;
	this.name		= username;
	this.password	= password;
	this.mail		= mail;
	this.characters	= [];
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