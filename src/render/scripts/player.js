jQuery(document).ready(function( $ ) {

	/* Countdown */

	var saturday = 'October 17 2015 09:59:59 GMT+01:00';
	var sunday = 'October 18 2015 11:59:59 GMT+01:00';

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
	    clock.innerHTML = t.hours + ":" + (t.minutes<10?'0':'') + t.minutes + ":" + (t.seconds<10?'0':'') + t.seconds;
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

	/*face.selectAll('.hour-tick')
		.data(d3.range(0,12)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});*/

	var width = 500,
	  height = 425,
	  τ = 2 * Math.PI;

	var dateVar = new Date();
	var minVar = dateVar.getMinutes();
	var hourVar = (((dateVar.getUTCHours() + 1) * 60) + minVar) / 1440;
	var halfdayVar = (((dateVar.getUTCHours() + 1) * 60) + minVar - 720) / 1440;

	var arc = d3.svg.arc()
	  .innerRadius(190)
	  .outerRadius(185)
	  .startAngle(0);

	/* Video player
	var video = d3.select("#videoPlayer").append("svg")
	  .attr("width", width)
	  .attr("height", height)
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")*/

	var video = d3.select("#video-viz")
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

	// Add the background arc, from 0 to 100% (τ).
	var background = video.append("path")
	  .datum({endAngle: τ})
	  .style("fill", "#FFF")
	  .attr("d", arc);

	// Add the foreground arc
	var videoForeground = video.append("path")
	  .datum({endAngle: hourVar * τ})
	  .style("fill", "#FFF")
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

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 29)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "countdown")
		 .attr("id", "saturdayHours")

	initializeHoursClock('saturdayHours', saturday);


	// Use transition.call
	// (identical to selection.call) so that we can encapsulate the logic for
	// tweening the arc in a separate function below.
	setInterval(function() {
	videoForeground.transition()
	    .duration(100)
	    .call(arcTween, hourVar * τ);
	}, 1500);

	// Radio Player
	var radio = d3.select("#radio-viz")
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

	var background = radio.append("path")
	  .datum({endAngle: τ})
	  .style("fill", "#FFF")
	  .attr("d", arc);

	var radioForeground = radio.append("path")
	  .datum({endAngle: .127 * τ})
	  .style("fill", "#FFF") 
	  .attr("d", arc);

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -100)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .attr("id", "sundayDays")

	initializeDaysClock('sundayDays', sunday);

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 29)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "countdown")
		 .attr("id", "sundayHours")

	initializeHoursClock('sundayHours', sunday);


	setInterval(function() {
	radioForeground.transition()
	    .duration(d3.time.minute)
	    .call(arcTween, halfdayVar * τ);
	}, 1500);


	function arcTween(transition, newAngle) {

	transition.attrTween("d", function(d) {

	  var interpolate = d3.interpolate(d.endAngle, newAngle);

	  return function(t) {

	    d.endAngle = interpolate(t);

	    return arc(d);
	  };
	});
	}

/*************
Resize player
*************/

var aspect = 500 / 425,
    videoViz = $("#video-viz"),
    radioViz = $("#radio-viz");
$(window).on("resize", function() {
    var targetWidth = videoViz.parent().width();
    videoViz.attr("width", targetWidth);
    videoViz.attr("height", targetWidth / aspect);
    radioViz.attr("width", targetWidth);
    radioViz.attr("height", targetWidth / aspect);
});

});
