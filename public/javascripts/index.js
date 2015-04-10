//Définition variable
var joueur1 = {
    x:     45.77832,
    y:   4.86936,
	acuity: 3,
	move:2
};
var rotation;

$(document).ready(function() {
	street(joueur1.x,joueur1.y);
	$("#run_btn").click(function(){
		initialize(joueur1.x,joueur1.y,joueur1.acuity,joueur1.move);
		$("#mask").fadeOut("slow");
		clearInterval(rotation);
		$("#street").remove();
	});
});