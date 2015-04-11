//Définition variable
var rotation;
var joueur1 = {
    x:     45.77832,
    y:   4.86936,
    acuity: 3,
    move:2
};

//Fonction calcule dégrader des statistiques
	function color_calc(){
		var meta = $("#stats ul li");
		meta.css("background-image", "-webkit-gradient(linear, 70% 0%, 30% 30%, color-stop(70%, #5F4EED), color-stop(30%, #ABA4ED))");
		meta.css("background-image", "-webkit-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
		meta.css("background-image", "-moz-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
		meta.css("background-image", "-o-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
		meta.css("background-image", "linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
	};
	
$(document).ready(function() {
	street(joueur1.x,joueur1.y);
	$("#run_btn").click(function(){
		initialize(joueur1.x,joueur1.y,joueur1.acuity,joueur1.move);
		color_calc();
		$("#mask").fadeOut("slow", function(){ $("#stats").fadeIn("slow")});
		clearInterval(rotation);
		$("#street").remove();
	});
	
	
});