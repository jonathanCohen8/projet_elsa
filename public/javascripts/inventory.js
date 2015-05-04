//------------------------------------Fonction inventaire------------------------------------//

//Définition variable globales
var revert = false;

function inventory(user) {
	var i;
	//Définition variable de départ
	var inv = '#bag_content',
		inv_check = [],
		object_in_bag = user.inventory,
		cell_size = 43;

	// Positionnement initial des objets
	//On recupere les coordonnées de la grille
	invPos= $(inv).position();
	var bag_size = table.length;
	//On dépose les objet
	for (i=0; i < object_in_bag.length; i++){
		$(inv).prepend(
			"<img src='images/" + object_in_bag[i].picture +
			"' alt='" + object_in_bag[i].picture +
			"' data-objectId='" + object_in_bag[i].bag_id +
			"' class='draggable ui-widget-content'/>"
		);
	}

	//On redimensionne les objet d'apres leur tailles
	for (i=0; i < object_in_bag.length; i++){
		$('img[data-objectId='+object_in_bag[i].bag_id+']')
			.css('width',38*object_in_bag[i].size[0])
			.css('height',40*object_in_bag[i].size[1]);
	}
	//On va lire le tableau et déposer les objet
	for (i=0 ; i<bag_size ; i++) {
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
					//On positionne un à un les objets
					$('img[data-objectId='+table[i][j]+']')
						.css('left',invPos.left + 4 + (cell_size * j))
						.css('top',invPos.top + 4 + (cell_size * i));
				}
			}
		}
	}

	//On rend l'objet draggable et on gère les collision
	$(inv).droppable({
            tolerance: 'fit'
    });
    $('.draggable').draggable({
            zIndex: 2700,
            grid: [43,43],
            // containment:inv,
            scroll: false,
            revert: 'invalid',
            stop: function(){
                $(this).draggable('option','revert','invalid');
                setTimeout(function(){ revert = false; },1);
            }
    });
    $('.draggable').droppable({
            greedy: true,
            tolerance: 'touch',
            drop: function(event,ui){
                ui.draggable.draggable('option','revert',true);
                revert = true;
            }
    });
    //Correction bug jqueryUI
    $( ".draggable" ).bind( "dragstart", function(event, ui) {
            ui.originalPosition.top = $(this).position().top;
            ui.originalPosition.left = $(this).position().left;
    });

	//On execute la fonction pour chaque objet de l'inventaire
	for (i=0; i < object_in_bag.length; i++){
		collide('img[data-objectId='+object_in_bag[i].bag_id+']',object_in_bag[i].bag_id,table);
	}
	
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

		//Au mouvement de la souris
		$(document).on('mousemove', function(e) {
			//Gestion de l'identifiant dans la table HTML
			$('#bag_content').find("tr").find("td").each(function(){
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

		//Au relacher de la souris
		}).on('mouseup', function() {
			$(this).off('mousemove');
			setTimeout(function(){
				if (revert === false){
					//Creation du tableau de valeur représentant la "carte"
					var tbl = $('#bag_content tr').get().map(function(row) {
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
				}
			},1);
		});
		e.preventDefault();
	});
}
