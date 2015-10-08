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
	var weatherIcon;

	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=21d88c5657030fc12d5d4a62dbf0f053", function( data ) {
		 weather = "London, " + month + " " + day + "<br>" + data.weather[0].main + ", " + data.main.temp + "°C" ;
		 wind = "London, " + month + " " + day + "<br>" + data.wind.speed + ", " + data.wind.deg ;
		 weatherIcon = data.weather[0].icon;
		 setIcon(weatherIcon);
		 setWindIcon(data.wind.deg)
		 console.log(data);
	})

	function setIcon(icon) {
		$("#icon-weather").attr("src", "/images/weather/white/" + icon + ".svg");
	}

	function setWindIcon(wind_direction) {
		switch(windDeg) {
		    case (windDeg > 337.5 || windDeg <= 22.5):
		        $("#icon-wind").attr("src", "/images/wind/white/n.svg")
		        break;
		    case (22.5 < windDeg <= 67.5):
		        $("#icon-wind").attr("src", "/images/wind/white/ne.svg")
		        break;
		    case (67.5 < windDeg <= 112.5):
		        $("#icon-wind").attr("src", "/images/wind/white/e.svg")
		        break;
		    case (112.5 < windDeg <= 157.5):
		        $("#icon-wind").attr("src", "/images/wind/white/se.svg")
		        break;
		    case (157.5 < windDeg <= 202.5):
		        $("#icon-wind").attr("src", "/images/wind/white/s.svg")
		        break;
		    case (202.5 < windDeg <= 247.5):
		        $("#icon-wind").attr("src", "/images/wind/white/sw.svg")
		        break;
		    case (247.5 < windDeg <= 292.5):
		        $("#icon-wind").attr("src", "/images/wind/white/w.svg")
		        break;
		    case (292.5 < windDeg <= 337.5):
		        $("#icon-wind").attr("src", "/images/wind/white/nw.svg")
		        break;
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

