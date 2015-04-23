//Définition variable
var joueur1 = {
    x:     45.77832,
    y:   4.86936,
    acuity: 3,
    move:2
};
var table = user[0].bag;

//Initialisation
$(document).ready(function() {
	//On initialise la map google
	initialize(joueur1.x,joueur1.y,joueur1.acuity,joueur1.move);

	//Connection au socket io
	var socket = io.connect('http://localhost:3000');
	socket.on('timer', function(timer) {
		//Execution de l'affichage du timer en temps réel
		alert("execution du socket");
		$("#timer").html('Temps restant avant prochain tour: ' + timer.timer + ' secondes');
		color_timer(Math.round((timer.timer*100)/timer.max));
    })

	//Colorisation fiche statistique
	color_calc();

	//Au click sur la croix des statistiques (Mobile seul)
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
		//Requete ajax de l'envoie de la nouvelle organisation du sac
		$.ajax({
			url : '/inventory',
			type : 'PUT',
			contentType: "application/json",
			data : 'bag=' + JSON.stringify(table)
    	}).done(function(data) {
			//Action en cas de succes
		}).fail(function(data) {
			//Action en cas d'échec
		});
	});
});