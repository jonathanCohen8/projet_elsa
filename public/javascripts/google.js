function street(x,y){
	//Coordonnée du joueur
	var myLatlng = new google.maps.LatLng(x,y);
	var panoramaOptions = {
		position: myLatlng,
		pov: {
			heading: 34,
			pitch: 5
		},
		disableDefaultUI: true
	};
	var street = new google.maps.StreetViewPanorama(document.getElementById('street'), panoramaOptions);

	//animation
	//animation street
	var j = 0;
	rotation = setInterval(function() {
		var pov = street.getPov();
		pov.heading += 0.01;
		street.setPov(pov);
	}, 2); 
}

function initialize(x,y,acuity,move) {
	//Coordonnée du joueur
	var myLatlng = new google.maps.LatLng(x,y);
	//définition Variable
	var moveRadius = move*15;
	
	//Génération de la carte
	var mapOptions = {
		zoom: 19,
		zoomControl: false,
		draggable: false,
		streetViewControl: false,
		mapTypeControl: false,
		scrollwheel: false,
		panControl: false,
		disableDoubleClickZoom: true,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	//gestion label pour le marker
	google.maps.Marker.prototype.setLabel = function(label){
        this.label = new MarkerLabel({
          map: this.map,
          marker: this,
          text: label
        });
        this.label.bindTo('position', this, 'position');
    };

    var MarkerLabel = function(options) {
        this.setValues(options);
        this.span = document.createElement('span');
        this.span.className = 'map-marker-label';
    };

    MarkerLabel.prototype = $.extend(new google.maps.OverlayView(), {
        onAdd: function() {
            this.getPanes().overlayImage.appendChild(this.span);
            var self = this;
            this.listeners = [
            google.maps.event.addListener(this, 'position_changed', function() { self.draw();    })];
        },
        draw: function() {
            var text = String(this.get('text'));
            var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
            this.span.innerHTML = text;
            this.span.style.left = (position.x -10) - (text.length * 3) + 10 + 'px';
            this.span.style.top = (position.y + 25) + 'px';
        }
    });

	//Ajout marker joueur
	var icon = {
		url: 'images/RICK-GRIMES-2.png',
		scaledSize: new google.maps.Size(60, 50),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(30,25)
	};
	var avatar = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: icon,
		label: 'Vous',
		scaledSize: new google.maps.Size(20, 20),
		draggable: false,
	});

	//Ajout marker des autre joueur
	var player;
	for (i=0; i<= players.length;i++)
	{
		player = new google.maps.Marker({
			position: new google.maps.LatLng(players[i].x,players[i].y),
			map: map,
			label: players[i].name,
			draggable: false,
		});
	}
	//Affichage menu au click sur l'avatar
	google.maps.event.addListener(avatar, 'click', function() {
	    $('#stats').animate({bottom:0},400);
	    $('#timer').animate({bottom:-200},400);
  	});

	//Gestions des distances
	//Définition des variable
	var AcuityOption = {
		strokeOpacity: 0.1,
		strokeWeight: 2,
		fillColor: '#89F0B5',
		fillOpacity: 0.35,
		map: map,
		center:myLatlng,
		clickable: false,
		radius: acuity*15

	};
	
	var moveOption = {
		strokeOpacity: 0.4,
		strokeWeight: 2,
		fillOpacity: 0.1,
		map: map,
		center:myLatlng,
		clickable: false,
		radius: moveRadius
	};
	
	//Ajout des cercle sur la carte
	var acuityCircle = new google.maps.Circle(AcuityOption);
	var moveCircle = new google.maps.Circle(moveOption);

	//systeme click map
	google.maps.event.addListener(map, 'click', function(event) {
   	placeMarker(event);
	});

	google.maps.Circle.prototype.contains = function(latLng) {
  return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
}

	var target = null;
	function placeMarker(event) {
		if (target !== null) {target.setMap(null);}
    	target = new google.maps.Marker({
        position: event.latLng, 
        map: map
	    });
	    //test si compris dans cercle déplacement
		latLngA = new google.maps.LatLng(target.position.lat(), target.position.lng());
		$("#action").hide();
		/*alert((target.getPosition().lat()-x)*(target.getPosition().lat()-x)+(target.getPosition().lng()-y)*(target.getPosition().lng()-y));
		if((target.getPosition().lat()-x)*(target.getPosition().lat()-x)+(target.getPosition().lng()-y)*(target.getPosition().lng()-y) < (moveCircle.getRadius())*(moveCircle.getRadius())){
			$("#action").text("Ce déplacer").show();
			var action_x = event.pixel.x - parseInt($("#action").width())/2;
			$("#action").css({left:action_x+'px',top:event.pixel.y+'px'});
		} else alert("yolo");*/

		if(moveCircle.contains(target.position)) {
			$("#action").text("Ce déplacer").show();
			var action_x = event.pixel.x - parseInt($("#action").width())/2;
			$("#action").css({left:action_x+'px',top:event.pixel.y+'px'});
		}
	}
    

	//animation
	//animation cercle déplacement
	/*var i = 0;
	var intID = setInterval(function() {
		var radius = moveCircle.getRadius();
		if (i == 0) {
			moveCircle.setRadius(radius-0.02);
			if (radius <= moveRadius-2) {
				i = 1;
			}
		}
		if (i == 1) {
			moveCircle.setRadius(radius+0.02);
			if (radius >= moveRadius) {
				i = 0;
			}
		}
	}, 8);     */   
}