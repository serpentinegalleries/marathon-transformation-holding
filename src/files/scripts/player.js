jQuery(document).ready(function( $ ) {

	/* Countdown */

	var saturday = 'October 17 2015 09:59:59 GMT+01:00';
	var sunday = 'October 18 2015 00:00:01 GMT+01:00';

	var timeLeft;

	function getTimeRemaining(endtime){
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor( (t/1000) % 60 );
		var minutes = Math.floor( (t/1000/60) % 60 );
		var hours = Math.floor( (t/(1000*60*60)) % 24 );
		var days = Math.floor( t/(1000*60*60*24) );
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function initializeHoursClock(id, endtime){
	  var clock = document.getElementById(id);
	  var timeinterval = setInterval(function(){
	    var t = getTimeRemaining(endtime);
	    clock.innerHTML = (t.hours<10?'0':'') + t.hours + ":" + (t.minutes<10?'0':'') + t.minutes + ":" + (t.seconds<10?'0':'') + t.seconds;
	    if(t.total<=0){
	      clearInterval(timeinterval);
	    }
	  },1000);
	}

	function initializeDaysClock(id, endtime){
	  var clock = document.getElementById(id);
	    var t = getTimeRemaining(endtime);
	    clock.innerHTML = "-" + t.days+ " DAYS";
	}


/**********
PLAYER
**********/

var hourScale = d3.scale.linear()
	.range([0,330])
	.domain([0,11])

	var width = 410,
	  height = 600,
	  τ = 2 * Math.PI;

	var dateVar = new Date();
	var minVar = dateVar.getMinutes();
	var hourVar = (((dateVar.getUTCHours() + 1) * 60) + minVar) / 1440;
	var halfdayVar = (((dateVar.getUTCHours() + 1) * 60) + minVar - 720) / 1440;

	var arc = d3.svg.arc()
	  .innerRadius(182)
	  .outerRadius(177)
	  .startAngle(0);

    var hourTickStart = 195;
    var hourTickLength = -5;

	/* Video player
	var video = d3.select("#videoPlayer").append("svg")
	  .attr("width", width)
	  .attr("height", height)
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")*/

	var video = d3.select("#video-viz")
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + 200 + ")")

	// Add the background arc, from 0 to 100% (τ).
	var background = video.append("path")
	  .datum({endAngle: τ})
	  .style("fill", "#FFF")
	  .attr("opacity",".5")
	  .attr("d", arc);

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -100)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .attr("id", "saturdayDays")

	initializeDaysClock('saturdayDays', saturday);

	// Day 1 Countdown text
	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 29)
		 .style("fill", "#FFF")
		 .attr("text-anchor", "middle")
		 .attr("stroke-width", -1)
		 .attr("class", "countdown")
		 .attr("id", "saturdayHours")

	initializeHoursClock('saturdayHours', saturday);

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 250)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "date-text")
		 .attr("text-anchor", "middle")
		 .text("Saturday October 17");

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 295)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Live feed from");

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 324)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Serpentine Sackler Gallery");

	video.selectAll('.hour-tick')
		.data(d3.range(0,12)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.style("stroke-width", "2px")
			.style("stroke", "#FFF")
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});

	// Radio Player
	var radio = d3.select("#radio-viz")
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + 200 + ")")

	var radioBackground = radio.append("path")
	  .datum({endAngle: τ})
	  .style("fill", "#FFF")
	  .attr("opacity",".5")
	  .attr("d", arc);

	// Day 1 Countdown text
	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -100)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .attr("id", "sundayDays");

	initializeDaysClock('sundayDays', sunday);

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 29)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "countdown")
		 .attr("id", "sundayHours");

	initializeHoursClock('sundayHours', sunday);


//... and hours
	radio.selectAll('.hour-tick')
		.data(d3.range(0,12)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.style("stroke-width", "2px")
			.style("stroke", "#FFF")
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 250)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "date-text")
		 .attr("text-anchor", "middle")
		 .text("Sunday October 18");

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 295)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Live streaming on");

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 324)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Serpentine Radio");

/*************
Resize player
*************/

	var aspect = width / height,
	    videoViz = $("#video-viz"),
	    radioViz = $("#radio-viz");
	/*$(window).on("load", function() {
	    var targetWidth = $( document ).height();
	    videoViz.attr("width", targetWidth * .2);
	    videoViz.attr("height", targetWidth * .2);
	    radioViz.attr("width", targetWidth * .2);
	    radioViz.attr("height", targetWidth * .2);
	});*/
	$(window).on("resize", function() {
	    var targetWidth = videoViz.parent().height();
	    videoViz.attr("width", targetWidth);
	    videoViz.attr("height", targetWidth / aspect);
	    radioViz.attr("width", targetWidth);
	    radioViz.attr("height", targetWidth / aspect);
	});
	$(window).on("load", function() {
	    var targetWidth = videoViz.parent().height();
	    videoViz.attr("width", targetWidth / aspect);
	    videoViz.attr("height", targetWidth);
	    radioViz.attr("width", targetWidth / aspect);
	    radioViz.attr("height", targetWidth);
	});
	/*
	$(window).on("resize", function() {
	    var targetWidth = $( document ).height();
	    videoViz.attr("width", targetWidth * .2);
	    videoViz.attr("height", targetWidth * .2);
	    radioViz.attr("width", targetWidth * .2);
	    radioViz.attr("height", targetWidth * .2);
	});	*/
});

