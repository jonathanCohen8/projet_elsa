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
	var streetView = new google.maps.StreetViewPanorama(document.getElementById('street'), panoramaOptions);

	//animation
	//animation street
	var j = 0;
	rotation = setInterval(function() {
		var pov = streetView.getPov();
		pov.heading += 0.01;
		streetView.setPov(pov);
	}, 2);
}

function initialize() {
	//Coordonnée du joueur
	var myLatlng = new google.maps.LatLng(user.lat,user.lng);
	//définition Variable
	var moveRadius = user.features.endurance;

	//Génération de la carte
	var mapOptions = {
		zoom: user.features.sight,
		zoomControl: false,
		draggable: false,
		streetViewControl: false,
		mapTypeControl: false,
		scrollwheel: false,
		panControl: false,
		disableDoubleClickZoom: true,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
		{
		"stylers": [
			{ "saturation": -78 },
			{ "gamma": 0.6 },
			{ "lightness": 20 }
		]}
		]
	};
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
	for (i=0; i< players.length;i++)
	{
		player = new google.maps.Marker({
			position: new google.maps.LatLng(players[i]['lat'],players[i]['lng']),
			map: map,
			label: players[i].name,
			draggable: false,
		});
	}
	//Affichage menu au click sur l'avatar
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		google.maps.event.addListener(avatar, 'click', function() {
			$('#stats').animate({bottom:0},400);
			$('#timer').animate({bottom:-200},400);
		});
	}

	//Gestions des distances
	//Fonction de tracage du cercle-trou
	/*function drawCircle(point, radius, dir) { 
		var d2r = Math.PI / 180;   // degrees to radians 
		var r2d = 180 / Math.PI;   // radians to degrees 
		var earthsradius = 3963; // 3963 is the radius of the earth in miles
		var points = 128; 

		// find the raidus in lat/lon 
		var rlat = (radius / earthsradius) * r2d; 
		var rlng = rlat / Math.cos(point.lat() * d2r); 
		// alert(rlat + " " + rlng);
		var extp = []; 
		if (dir==1)   {var start=0;var end=points+1} // one extra here makes sure we connect the ends
		else      {var start=points+1;var end=0}
		for (var i=start; (dir==1 ? i < end : i > end); i=i+dir) { 
			var theta = Math.PI * (i / (points/2)); 
			ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
			ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
			extp.push(new google.maps.LatLng(ex, ey)); 
			bounds.extend(extp[extp.length-1]);
		} 
		return extp;
	}

	//Définition variables
	var bounds = new google.maps.LatLngBounds();
	var outerbounds = [
	new google.maps.LatLng(85,180),
    new google.maps.LatLng(85,90),
    new google.maps.LatLng(85,0),
    new google.maps.LatLng(85,-90),
    new google.maps.LatLng(85,-180),
    new google.maps.LatLng(0,-180),
    new google.maps.LatLng(-85,-180),
    new google.maps.LatLng(-85,-90),
    new google.maps.LatLng(-85,0),
    new google.maps.LatLng(-85,90),
    new google.maps.LatLng(-85,180),
    new google.maps.LatLng(0,180),
    new google.maps.LatLng(85,180)];
    */

	var moveOption = {
		strokeOpacity: 0.4,
		strokeWeight: 2,
		fillOpacity: 0.05,
		map: map,
		center:myLatlng,
		clickable: false,
		radius: moveRadius
	};

	/*
	var acuityOptions = {
		strokeColor: '#404040',
		strokeOpacity: 0.9,
		strokeWeight: 2,
		fillColor: '#404040',
		fillOpacity: 0.9,
		clickable: false,
		map: map,
		paths: [outerbounds,drawCircle(myLatlng,0.05,-1)]
		};
	*/

    //Ajout des cercle sur la carte
	var moveCircle = new google.maps.Circle(moveOption);
	//var acuityCircle = new google.maps.Polygon(acuityOptions);

	//systeme click map
	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event);
		});

	google.maps.Circle.prototype.contains = function(latLng) {
		return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
	};

	var target = null;
	function placeMarker(event) {
		if (target !== null) {target.setMap(null);}
		target = new google.maps.Marker({
			position: event.latLng,
			map: map
		});
		target.setVisible(false);
		var action_x = event.pixel.x - parseInt($("#mouse_context_move").width())/2;
		//test si compris dans cercle déplacement
		latLngA = new google.maps.LatLng(target.position.lat(), target.position.lng());
		$("#mouse_context_move").hide();
		if(moveCircle.contains(target.position)) {
			moveLatLng = event.latLng;
			$("#mouse_context_move").text("Ce déplacer ici").show();
			$("#mouse_context_move").css({left:action_x+'px',top:event.pixel.y+3+'px'});
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