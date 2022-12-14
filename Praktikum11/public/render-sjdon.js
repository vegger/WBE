function renderSJDON(element, appRoot) {
    //TODO funktionskomponente (Vorlesung 11: S.40) NICHT implementiert
    let node = document.createElement(element[0]);
    appRoot.appendChild(node);
    let currentElement = node;
    for (i in element) {
      if (typeof element[i] === "object" && !Array.isArray(element[i])) { //good 
        //wenn object -> attribut z.B: style
        let object = element[i];
        let attributes = Object.keys(object);
        let values = Object.values(object);
        for (attribute of attributes) {
          for (value of values) {
            //console.log("CR", currentElement, attribute, value);
            currentElement.setAttribute(attribute, value);
            break; //nötig, weil sonst wenn mehrere attribute im object vorheriges immer überschrieben wird
          }
        }
      }
      if (Array.isArray(element[i])) {
        //wenn array -> neues HTML element
        array = element[i];
        topItem = document.createElement(array[0]);
        currentElement.appendChild(topItem);
        for (arrayElement of array) {
          if(typeof arrayElement === "string") {
            topItem.textContent = arrayElement
          }
          if(typeof arrayElement === "object" && !Array.isArray(arrayElement)) {
            //console.log(arrayElement)
            let object = arrayElement;
            let attributes = Object.keys(object);
            let values = Object.values(object);
            for (attribute of attributes) {
              for (value of values) {
                //console.log("CR", currentElement, attribute, value);
                topItem.setAttribute(attribute, value);
                break; //nötig, weil sonst wenn mehrere attribute im object vorheriges immer überschrieben wird
              }
            }
          }
          // weiss nicht ob man das braucht Zeile 221 ff. für verschachtelte Elemente... jedoch sowiso refactoring nötig hier dann einfach nochmals element-erzeugungsmethode aufrufen
          /*if (Array.isArray(arrayElement[i])) {
            console.log("in Zeile 205")
            //HTML-Element in HTML-Element (nested elements)
            item = document.createElement(arrayElement[i][0]);
            item.textContent = arrayElement[i][1];
            console.log("TEXT: ");
            topItem.appendChild(item);
          }*/
        }
      }
    }
  }

const element =
["div", {style: "background: salmon"},
["h1", "Hello World"],
["h2", {style: "text-align:right"}, "from our library"] ]

function initSJDON() {
    const appRoot = document.getElementsByClassName("sjdon")[0];
    renderSJDON(element, appRoot);
}

