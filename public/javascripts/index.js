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

//Fonction inventaire
	function inventory(user) {
		//Définition variable de départ
		var box1 = '#object1',
			box2 = '#object2',
			inv = '#table1',
			inv_check = [],
			table = user[0].bag,
			cell_size = 43;

		// Positionnement initial des objets
		//On recupere les coordonnées de la grille
		invPos= $(inv).position();
		var bag_size = table.length
		//On va lire le tableau et déposer les objet
		for (var i=0 ; i<bag_size ; i++) {
			for (var j=0 ;j<bag_size ; j++) {
				if (table[i][j] !== 0)
				{
					var y = 0;
					for (var k=0 ; k< inv_check.length ; k++) {
						if (inv_check[k] === table[i][j]){
							y = 1;
						}
					}
					if (y === 0){
						inv_check.push(table[i][j]);
						$('img[data-objectId='+table[i][j]+']').css('left',invPos.left + 4 + (cell_size * j));
						$('img[data-objectId='+table[i][j]+']').css('top',invPos.top + 4 + (cell_size * i));
					}
				}
			}
		}

		//On rend l'objet draggable
		$(box1).draggable({ grid: [ cell_size, cell_size ] },
		{
		    obstacle: "#object2",
		    preventCollision: true,
		    containment: "#table1"
		});
		$(box2).draggable({ grid: [ cell_size, cell_size ] },
		{
		    obstacle: "#object1",
		    preventCollision: true,
		    containment: "#table1"
		});

		$("#dragMe").draggable();

		//On execute la fonction pour chaque objet de l'inventaire
		collide(box1,1,table);
		collide(box2,2,table);
	}

	//Gestion collision des objets
	function collide(box, id, table){
		var drop = $('td');
		$(box).on('mousedown', function(e) {
			//On supprime du tableau table les case contenant le meme id que l'objet clicker
			for (var i=0 ; i<table.length ; i++) {
				for (var j=0 ; j<table.length ; j++) {
					if(table[i][j] === id)
						table[i][j] = 0;
					}
			}
			$(document).on('mousemove', function(e) {
				//Gestion de l'identifiant dans la table HTML
				$('#table1').find("tr").find("td").each(function(){
					if ($(this).hasClass('under') === true){
						$(this).html(id);
					}
					else{
						$(this).html(0);
					}
				});

				//Execution plugins jquery overlaps
				var collides = drop.overlaps(box);
				$(box)[collides.hits.length ? 'addClass' : 'removeClass']('over');
				drop.removeClass('under');
				$(collides.targets).addClass('under');

			}).on('mouseup', function() {
				$(this).off('mousemove');
				//Creation du tableau de valeur représentant la "carte"
				var tbl = $('#table1 tr').get().map(function(row) {
					return $(row).find('td').get().map(function(cell) {
						return parseInt($(cell).html());
					});
				});

				//On lit le tableau (tbl) et on le compare avec celui en mémoire (table)
				for (var i=0 ; i<table.length ; i++) {
					for (var j=0 ; j<table.length ; j++) {
						if (tbl[i][j] !== table[i][j]){
							if (table[i][j] === 0)
								table[i][j] = tbl[i][j];
						}
					}
				}
				$("#debug").html(JSON.stringify(table));
			});
			e.preventDefault();
		});
	}

//Initialisation
$(document).ready(function() {
	initialize(joueur1.x,joueur1.y,joueur1.acuity,joueur1.move);
	color_calc();
	color_timer();
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