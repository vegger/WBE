
function log(text) {
  var logElem = document.getElementById("log");
  logElem.innerHTML += text + "\n";
  return true;
}

var Plotter = (function () {

  /* Objekte für Canvas und Context */
  var plotterCanvas = document.getElementById("plotter");
  var  ctx = plotterCanvas.getContext('2d');
  var  w = plotterCanvas.width;
  var  h = plotterCanvas.height;

  /* Methode zum Löschen des Canvas */
  var clear = function () {
    plotterCanvas.width = plotterCanvas.width;
  };


  /* Methode zum Zeichnen der mathematischen Funktion
   *
   * Parameter sind die Zeichenkette mit der math.Funktion,
   * sowie Definitionsbereich (xMin, xMax) und
   * Zielbereich (yMin, yMax)
   *
   * */
  var draw = function (functionString, xMin, xMax, yMin, yMax) {

    /*
     * Ermitteln der Intervallgröße und Schrittgröße je Canvas-Pixel
     */
    var xIntervalSize = xMax - xMin;
    var yIntervalSize = yMax - yMin;

    var xStepPerPixel = xIntervalSize / w;

    /* Im Folgenden wird aus der vom Benutzer als String
     * eingegebenen Funktion eine "echte"
     * Javascript-Funktion.
     */
    var customFunction = function(x) {
      try{
	var result = eval("(" + functionString + ")" );
	return result;
      } catch (e) {
	log("Fehler beim Evaluieren der Funktionsdefinition " + functionString + " für den Wert x=" + x);
	log("Fehlermeldung: " + e.message);
	return 0;
      }
    };


    /* Folgende Funktion liefert für eine Koordinate (x,y)
     * aus der Definitions- und der Zielmenge der
     * math.Funktion die entsprechende
     * x,y-Koordinate des Canvas.
     */
    var getCanvasCoordinate = function (x, y) {
      var xCoord = Math.round(( (x - xMin) / xIntervalSize) * w);
      var yCoord = h - Math.round(( (y - yMin) / yIntervalSize) * h);

      return normalizeCanvasCoordinates(xCoord, yCoord);
    };



    var normalizeCanvasCoordinates = function (x, y) {
      x = Math.max(0, x);
      x = Math.min(w, x);
      y = Math.max(0, y);
      y = Math.min(h, y);

	return {
	  x: x,
	  y: y
	};
    };

    /* Hier beginnen die Canvas-Operationen */

    /* Achsen einzeichnen */
    ctx.strokeStyle = "#000";
    ctx.lineWidth   = 1;

    /* x-Achse */
    ctx.beginPath();
    ctx.moveTo(0, getCanvasCoordinate(0,0).y);
    ctx.lineTo(w-1, getCanvasCoordinate(0,0).y);
    ctx.stroke();
    ctx.closePath();

    /* y-Achse */
    ctx.beginPath();
    ctx.moveTo(getCanvasCoordinate(0,0).x, 0);
    ctx.lineTo(getCanvasCoordinate(0,0).x, h);
    ctx.stroke();
    ctx.closePath();



    ctx.strokeStyle = document.getElementById("color").value;
    ctx.lineWidth   = 2;
    ctx.beginPath();

    /* Ab hier Durchlauf durch das Intervall,
     * Berechnen der Funktionswerte,
     * Umwandeln in Canvas-Koordinaten
     * und Ziehen der Linie
     */
    var startX = xMin;
    var startY = customFunction(startX);

    /* Zum Startpunkt */
    ctx.moveTo(0, getCanvasCoordinate(0,startY).y);

    /* Pixelweiser Durchlauf über die x-Achse des Canvas */
    for (var xi = 1; xi < w; xi++) {

      /* x/y-Werte im mathematischen Intervall */
      var currentX = Number(xMin + ( xi * xStepPerPixel ));
      var currentY = customFunction(currentX);

      /* Linie zu neuer Koordinate */
      var canvasCoords = getCanvasCoordinate(currentX, currentY);
      ctx.lineTo(canvasCoords.x, canvasCoords.y);
    }

    /* Linie sichtbar machen */
    ctx.stroke();

    /* Linienzug abschließen */
    ctx.closePath();
    return true;
  };


  return {
    draw: draw,
    clear: clear
  };

}());
