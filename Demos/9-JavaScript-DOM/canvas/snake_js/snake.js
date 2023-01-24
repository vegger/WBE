/**
 *  Snake-Programmierbeispiel
 *
 *  Dieses Beispiel dient zum Vergleich mit einer Java-Implementierung derselben
 *  Anwendung. Es zeigt somit Unterschiede zwischen dem objektorientierten und dem
 *  funktionalen Paradigma, aber auch Vor- und Nachteile eines dynamischen Typen-
 *  systems.
 *  
 *  @author  Gerrit Burkert 
 *  @version 31-MAR-2013
 */


/**
 *  Es wird eine rekursive Datenstruktur verwendet: Eine Schlange ist entweder ein
 *  Schlangenkopf oder ein Schlangensegment, das (in einer bestimmten Richtung) an
 *  einer Schlange hängt. Über die prev-Attribute gelangt man vom Schlangenende zum
 *  Kopf der Schlange.
 */
//var sampleSnake = {
//    relPos: SOUTH,
//    prev: {
//        relPos: EAST,
//        prev: {
//            relPos: EAST,
//            prev: {
//                relPos: SOUTH,
//                prev: {
//                    relPos: EAST,
//                    prev: {
//                        dir: WEST,
//                        pos: { x: 10, y : 10 }
//}}}}}};


/**
 *  Die Funktion makeSnake erzeugt ein snake-Objekt, das eine Reihe von Funktionen
 *  zur Verfügung stellt. Gleichzeitig wird der Kopf der Schlange auf einer bestimmten
 *  Position und mit einer bestimmten Bewegungsrichtung angelegt.
 *
 *  @param	xpos		x-Koordinate des Schlangenkopfs
 *  @param	ypos		y-Koordinate des Schlangenkopfs
 *  @param	hdir		Bewegungsrichtung
 *  					NORTH=0, EAST=1, SOUTH=2, WEST=3
 *  @param	sview		hier kann optional bereits eine View übergeben werden, das
 *						ist aber optional, denn die View kann später auch mit setview
 *						gesetzt oder der draw-FUnktion übergeben werden
 *
 *	@returns			snake-Objekt
 */
function makeSnake (xpos, ypos, hdir, sview) {

	var NORTH=0, EAST=1, SOUTH=2, WEST=3;
	var snake = { pos: { x: xpos, y: ypos} , dir: hdir };
	var view = sview;

	/**
	 *  Schlangensegment hinzufügen
	 */
	function snAdd (relDir) {
		snake = { relPos: relDir, prev: snake };
	}
	
	/**
	 *  View-Objekt setzen
	 */
	function snView (sview) {
		view = sview;
	}

	/**
	 *  Schlange um eine Position weiter bewegen
	 */
	function snMove () {
		snake = move(snake);
	}

	/**
	 *  Bewegungsrichtung (Ausrichtung des Schlangenkopfs) um 90 Grad nach rechts
	 *  anpassen; dazu muss zunächst der Kopf der Schlange gesucht werden
	 *
	 *  Achtung: Direkte Anpassung der Datenstruktur
	 */
	function snRight () {
		var hd = head(snake);
		hd.dir = (hd.dir + 1) % 4;
	}

	/**
	 *  Bewegungsrichtung (Ausrichtung des Schlangenkopfs) um 90 Grad nach links
	 *  anpassen; dazu muss zunächst der Kopf der Schlange gesucht werden
	 *
	 *  Achtung: Direkte Anpassung der Datenstruktur
	 */
	function snLeft () {
		var hd = head(snake);
		hd.dir = (hd.dir + 3) % 4;
	}

	/**
	 *  Schlange über die eingestellte oder eine als Parameter übergebene View
	 *  ausgeben
	 *
	 *  @param	sview		zu verwendendes View-Objekt, Default: eingestelltes View
	 *  					Objekt, ist keines vorhanden macht die Funktion nichts
	 */
	function snDraw(sview) {
		var currview = sview || view;
		if (currview) {
			currview.clear();
			draw(snake, currview);
		}
	}

	/**
	 *  ---- Beginn der internen Funktionen ----
	 *
	 *  Position des Schlangensegments bestimmen: für den Schlangenkopf ist diese
	 *  gespeichert, für die anderen Segmente wird diese relativ zum Vorgängersegment
	 *  festgelegt
	 *
	 *  @param	sn			Segment der Schlange
	 */
	function position (sn) {
		if (sn.pos !== undefined) return sn.pos;
		else return inDirection(position(sn.prev), sn.relPos);
	}
	
	/**
	 *  Position um ein Feld in der angegebenen Richtung verschieben
	 *
	 *  @param	pos			gegebene Position
	 *  @param	dir			Richtung
	 *  @returns			neue Position
	 */
	function inDirection(pos, dir) {
		switch (dir) {
			case NORTH: return { x: pos.x, y: pos.y+1 };
			case EAST:  return { x: pos.x+1, y: pos.y };
			case SOUTH: return { x: pos.x, y: pos.y-1 };
			case WEST:  return { x: pos.x-1, y: pos.y };
		}
		return { x: 0, y: 0 };
	}
	
	/**
	 *  Schlange um eine Feld verschieben
	 *
	 *  @param	sn			Segment der Schlange
	 */
	function move (sn) {
		if (sn.pos !== undefined) {
			return { dir: sn.dir, pos: inDirection(sn.pos, sn.dir) };
		} else {
			return { relPos: relToPrev(sn.prev), prev: move(sn.prev) };
		}
	}

	/**
	 *  In welcher Richtung befindet sich das Segment vom vorhergehenden Element aus?
	 *  Für normale Segmente ist das einfach der Wert von relPos, für den Kopf die
	 *  entgegengesetzte Richtung zur Bewegungsrichtung
	 */
	function relToPrev(sn) {
		if (sn.relPos !== undefined) return sn.relPos;
		else return oppositeDir(sn.dir);
	}
	
	/**
	 *  Gegenrichtung bestimmen
	 */
	function oppositeDir(dir) {
		return (dir + 2) % 4;
	}

	/**
	 *  Kopf der Schlange suchen
	 */
	function head(sn) {
		if (sn.pos !== undefined) return sn;
		else return head(sn.prev);
	}

	/**
	 *  Schlange ausgeben, rekursiv von hinten nach vorne
	 */
	function draw(sn, view) {
		if (sn.pos !== undefined) {
			view.drawHead(sn.pos, sn.dir);
		} else {
			view.drawSeg(position(sn));
			draw(sn.prev, view);
		}
	}

	/**
	 *  Öffentliche Funktionen in einem Objekt zurückgeben
	 */
	return {
		add: snAdd,
		move: snMove,
		draw: snDraw,
		left: snLeft,
		right: snRight,
		setview: snView
	};
}


/**
 *  Die Funktion makeSnakeView erzeugt eine View in verbindung mit einem HTML5-
 *  canvas-Element und stellt die eigentlichen Zeichenfunktionen bereit.
 *
 *  Entsprechend der Grösse des canvas-Elements und der angegebenen Grösse eines
 *  Felds wird die Anzahl der Felder in x- und y-Richtung bestimmt.
 *
 *  @param	canvasid		id-Attribut des canvas-Elements
 *  @param	fieldSize		Seitenlänge eines (quadratischen) Felds in px
 *  @returns				View-Objekt für die Ausgabe
 */
function makeSnakeView (canvasid, fieldSize) {

	var ctx, width, height;
	var canvas = document.getElementById(canvasid);

	/**
	 *  Zeichenkontext und Dimensionen bestimmen
	 */
	if (canvas && canvas.getContext){
		ctx = canvas.getContext('2d');
		width = ctx.canvas.width / fieldSize;
		height = ctx.canvas.height / fieldSize;
	}

	/**
	 *  Canvas-Inhalt löschen
	 */
	function snClear() {
		if (ctx) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
	}

	/**
	 *  Schlangenkopf zeichnen
	 */
	function snHead (pos, dir) {
		if (ctx) {
			drawPart(pos, "orange");
			drawEyes(pos, dir, "red")
		}
	}
	
	/**
	 *  Schlangensegent zeichnen
	 */
	function snSeg (pos) {		
		if (ctx) {
			drawPart(pos, "blue");
		}
	}

	/**
	 *  ---- Beginn der internen Funktionen ----
	 *
	 *  Ausgefüllten Kreis mit bestimmter Farbe an der Position zeichnen
	 */
	function drawPart (pos, color) {
		var x = pos.x;
		var y = pos.y;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc((x+0.5)*fieldSize, (height-0.5-y)* fieldSize, fieldSize/2, 0, Math.PI*2, true);
		ctx.fill();
	}

	/**
	 *  Augen des Schlangenkopfs zeichnen; diese werden zunächst in Nordrichtung
	 *  gezeichnet und dann mit einer rotate-Operation ausgerichtet
	 */
	function drawEyes (pos, dir, color) {
		var x = pos.x;
		var y = pos.y;
		ctx.save(); 
		ctx.translate((x+0.5)*fieldSize, (height-0.5-y)*fieldSize);
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rotate(Math.PI/2*dir);
		ctx.arc(-0.25*fieldSize, -0.25*fieldSize, fieldSize/5, 0, Math.PI*2, true);
		ctx.arc( 0.25*fieldSize, -0.25*fieldSize, fieldSize/5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.restore();
	}

	/**
	 *  Öffentliche Funktionen in einem Objekt zurückgeben
	 */
	return { 
		clear: snClear, 
		drawHead: snHead, 
		drawSeg: snSeg 
	};
}

