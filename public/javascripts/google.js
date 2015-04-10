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

	//
	// Attention mec, street c'est aussi une fonction, ça va peut-être causer des problèmes
	//
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
		streetViewControl: false,
		mapTypeControl: false,
		scrollwheel: false,
		panControl: false,
		disableDoubleClickZoom: true,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	//Ajout marker position
	var icon = {
		url: '/images/Smiley Angry.png',
		scaledSize: new google.maps.Size(50, 50),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(25,25)
	};
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: icon,
		scaledSize: new google.maps.Size(20, 20),
		draggable: false,
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
		radius: acuity*15
	};
	
	var moveOption = {
		strokeOpacity: 0.4,
		strokeWeight: 2,
		fillOpacity: 0.1,
		map: map,
		center:myLatlng,
		radius: moveRadius
	};
	
	//Ajout des cercle sur la carte
	var acuityCircle = new google.maps.Circle(AcuityOption);
	var moveCircle = new google.maps.Circle(moveOption);
	
	//animation
	//animation cercle déplacement
	var i = 0;
	var intID = setInterval(function() {
		var radius = moveCircle.getRadius();
		if (i === 0) {
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
	}, 8);
}