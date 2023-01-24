// ==================================================================
//  Grafische Anzeige der aktuellen Uhrzeit
//  WWD-Praktikum zum Thema HTML5 canvas (bkrt, 07-APR-2010)
// ==================================================================

var timer, ctx;

function init() {
	var canvas = document.getElementById('wwdsample');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		timer = window.setInterval(draw, 1000);
	}
}

// Zeit bestimmen und Uhrzeit zeichnen
function draw() {
		var tm = new Date();
		var tmh = tm.getHours() % 12;
		var tmm = tm.getMinutes();
		var tms = tm.getSeconds();
		
		// Elemente zeichnen
		ctx.clearRect(0, 0, 400, 400);
		drawWatch(ctx);
		drawHand(ctx, 2*Math.PI*(tmh+tmm/60)/12, 
		         {width: 8, len: 0.75, linecap: 'round'} );
		drawHand(ctx, 2*Math.PI*tmm/60);
		drawHand(ctx, 2*Math.PI*tms/60, {width: 1, color: "#ff0000"} );
}

//  Zifferblatt zeichnen
function drawWatch(ctx) {
	ctx.fillStyle = "#abe";
	ctx.beginPath();
	ctx.moveTo(400, 200);
	ctx.arc(200, 200, 200, 0, 2*Math.PI, true);
	ctx.fill();
	
	// Einteilung der Stunden und Minuten: Zur Demonstration 
	// werden hier die Transformationen translate() und rotate() 
	// verwendet 
	ctx.save();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#000000";
	ctx.translate(200,200);
	for (i=0; i<60; i++) {
		ctx.beginPath();
		if (i%5==0) {
			ctx.moveTo(180, 0);
		} else {
			ctx.moveTo(195, 0);
		}
		ctx.lineTo(200, 0);
		ctx.stroke();
		ctx.rotate(Math.PI/30);
	}
	ctx.restore();
}

//  Uhrzeiger zeichnen: Als zweites Argment wird der Winkel 
//  übergeben, zwischen 0 und 2*Math.PI, als drittes Argument 
//  können weitere Angaben zur Darstellung als Objekt übergeben
//  werden (len: Länge mit Default 1.0, width, color)
function drawHand(ctx, val, specification) {
	
	// Parameter auswerten, Darstellung
	var spec = specification || {};
	var len = spec.len || 1.0;
	ctx.lineWidth = spec.width || 5;
	ctx.strokeStyle = spec.color || "#000000";
	ctx.lineCap = spec.linecap || 'butt';
	
	// Uhrzeiger zeichnen
	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo((1+Math.sin(val)*len)*200, (1-Math.cos(val)*len)*200);
	ctx.stroke();
}

window.onload = init;
