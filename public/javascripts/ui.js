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