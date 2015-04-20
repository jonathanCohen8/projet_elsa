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
function color_timer(timer){
	var meta2 = $("#timer");
	console.log(timer + ' / '+ (100-timer));
	if (timer >= 50){
		meta2.css("background-image", "-webkit-gradient(linear, "+ timer + "% 0%, " + (100-timer) + "% " + (100-timer) + "%, color-stop("+ timer + "%, #5F4EED), color-stop(" + (100-timer) + "%, #ABA4ED))");
		meta2.css("background-image", "-webkit-linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + (100-timer) + "%)");
		meta2.css("background-image", "-moz-linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + (100-timer) + "%)");
		meta2.css("background-image", "-o-linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + (100-timer) + "%)");
		meta2.css("background-image", "linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + (100-timer) + "%)");
	}
	else{
		meta2.css("background-image", "-webkit-gradient(linear, "+ timer + "% 0%, " + timer + "% " + timer + "%, color-stop("+ timer + "%, #5F4EED), color-stop(" + timer + "%, #ABA4ED))");
		meta2.css("background-image", "-webkit-linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + timer + "%)");
		meta2.css("background-image", "-moz-linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + timer + "%)");
		meta2.css("background-image", "-o-linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + timer + "%)");
		meta2.css("background-image", "linear-gradient(to right, #5F4EED "+ timer + "%,#ABA4ED " + timer + "%)");
	}
}


//Initialisation
$(document).ready(function() {
	initialize(joueur1.x,joueur1.y,joueur1.acuity,joueur1.move);
	//Connection au socket io
	var socket = io.connect('http://localhost:3000');
	socket.on('timer', function(timer) {
		$("#timer").html('Temps restant avant prochain tour: ' + timer.timer + ' secondes');
		color_timer(timer.timer*10);
    })

	color_calc();
	$("#close_stats").click(function(){
		$('#stats').animate({bottom:-450},400);
		$('#timer').animate({bottom:0},400);
	});

	//Au click sur l'inventaire
	$('.action').click(function() {
		$('#equipment').animate({bottom:0},400);
	    $('#timer').animate({bottom:-200},400);
	    //On appel la fonction inventaire
		inventory(user);
	});

	//Au click sur la croix de l'inventaire
	$('#close_bag').click(function() {
		$('#equipment').animate({bottom:-450},400);
		$('#timer').animate({bottom:0},400);
	});
});