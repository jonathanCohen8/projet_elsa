//Définition variable
var joueur1 = {
    x:     45.77832,
    y:   4.86936,
    acuity: 3,
    move:2
};

//Fonction calcule dégrader des statistiques
function color_calc(){
	var meta = $("#stats #stats_percent li");
	meta.css("background-image", "-webkit-gradient(linear, 70% 0%, 30% 30%, color-stop(70%, #5F4EED), color-stop(30%, #ABA4ED))");
	meta.css("background-image", "-webkit-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
	meta.css("background-image", "-moz-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
	meta.css("background-image", "-o-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
	meta.css("background-image", "linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
};
	
//Fonction de calcule du dégrader du timer
function color_timer(){
	var meta2 = $("#timer");
	meta2.css("background-image", "-webkit-gradient(linear, 70% 0%, 30% 30%, color-stop(70%, #5F4EED), color-stop(30%, #ABA4ED))");
	meta2.css("background-image", "-webkit-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
	meta2.css("background-image", "-moz-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
	meta2.css("background-image", "-o-linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
	meta2.css("background-image", "linear-gradient(to right, #5F4EED 70%,#ABA4ED 30%)");
}

$(document).ready(function() {
	initialize(joueur1.x,joueur1.y,joueur1.acuity,joueur1.move);
	color_calc();
	color_timer();
	$("#close_stats").click(function(){
		$('#stats').animate({bottom:-450},400);
		$('#timer').animate({bottom:0},400);
	});
});