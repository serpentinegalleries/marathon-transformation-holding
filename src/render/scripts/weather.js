jQuery(document).ready(function( $ ) {

	var d = new Date();

	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	];

	var month = monthNames[d.getMonth()];
	var day = d.getDate();
	var weather;
	var wind;
	var showWeather = false;
	var showWind = false;
	var windDirection;

	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=21d88c5657030fc12d5d4a62dbf0f053", function( data ) {
		 weather = "London, " + month + " " + day + "<br>" + data.weather[0].main + ", " + data.main.temp + "°C" ;
		 setIcon(data.weather[0].icon);
		 setWindIcon(data.wind.deg);
		 wind = "London, " + month + " " + day + "<br>" + data.wind.speed + " m/s, " + windDirection ;
	})

	function setIcon(icon) {
		$("#icon-weather").attr("src", "/images/weather/white/" + icon + ".svg");
	}

	function setWindIcon(wind_direction) {
	    if (wind_direction > 337.5 || wind_direction <= 22.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/n.svg");
	        windDirection = 'North';
	    }
	    else if (22.5 < wind_direction && wind_direction <= 67.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/ne.svg");
	        windDirection = 'Northeast';
		}
	    else if (67.5 < wind_direction && wind_direction <= 112.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/e.svg");
	        windDirection = 'East';
		}
	    else if (112.5 < wind_direction && wind_direction <= 157.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/se.svg");
			        windDirection = 'Southeast';
		}
	    else if (157.5 < wind_direction && wind_direction <= 202.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/s.svg");
	        windDirection = 'South';
		}
	    else if (202.5 < wind_direction && wind_direction <= 247.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/sw.svg");
	        windDirection = 'Southwest';
		}
	    else if (247.5 < wind_direction && wind_direction <= 292.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/w.svg");
	        windDirection = 'West';
		}
	    else if (292.5 < wind_direction && wind_direction <= 337.5) {
	        $("#icon-wind").attr("src", "/images/wind/white/nw.svg");
	        windDirection = 'Northwest';
		}

	}

	$('#icon-weather').mouseenter(function() {
		$('#text-weather').html(weather);
	});
	$('#icon-weather').mouseout(function() {
		$('#text-weather').html("");
	});

	$('#icon-wind').mouseenter(function() {
		$('#text-weather').html(wind);
	});
	$('#icon-wind').mouseout(function() {
		$('#text-weather').html("");
	});

});

