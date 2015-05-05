var table = user.inventory.order;
var moveLatLng;

//Initialisation
$(document).ready(function() {
	//On initialise la map google
	initialize();

	//Connection au socket io
	var socket = io.connect('http://localhost:3000');
	socket.on('timer', function(timer) {
		//Execution de l'affichage du timer en temps r�el
		// alert("execution du socket");
		$("#timer").html('Temps restant avant prochain tour: ' + timer.timer + ' secondes');
		color_timer(Math.round((timer.timer*100)/timer.max));

		if(timer.timer === 0) {

			// GET new position
			$.get('/position')
				.done(function(data) {
					console.log(data);
				}).fail(function(err) {
					console.log(err);
				});

			// GET neighboors positions
			$.get('/neighboors')
				.done(function(data) {
					console.log(data);
				}).fail(function(err) {
					console.log(err);
				});
		}
    });

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
			data : JSON.stringify(table)
		}).done(function(data) {
			//Action en cas de succes
		}).fail(function(data) {
			//Action en cas d'�chec
		});
	});

	//Au click sur ce d�placer
	$('#mouse_context_move').click(function() {
		$(this).hide();
		var move_options = {
			'type' : 'move',
			'options' : {
				'lat' : moveLatLng.lat(),
				'lng' : moveLatLng.lng()
			}
		};
		//Requete ajax de l'envoie des nouvelle coordonn�es
		$.ajax({
			url : '/action',
			type : 'POST',
			contentType: "application/json",
			data : JSON.stringify(move_options)
		}).done(function(data) {
			//Action en cas de succes
		}).fail(function(data) {
			//Action en cas d'�chec
		});
	});

});