function renderSJDON(element, appRoot) { //TODO funktionskomponente (Vorlesung 11: S.40) NICHT implementiert
    //TODO funktionskomponente (Vorlesung 11: S.40) NICHT implementiert
    let node = document.createElement(element[0]);
    appRoot.appendChild(node);
    let currentElement = node;
    for (i in element) {
        if (typeof element[i] === "object" && !Array.isArray(element[i])) {
        //wenn object -> attribut z.B: style
        object = element[i];
        attributes = Object.keys(object);
        values = Object.values(object);
        for (attribute of attributes) {
            for (value of values) {
            console.log("CR", currentElement, attribute, value);
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
            if (Array.isArray(arrayElement[i])) {
            //HTML-Element in HTML-Element (nested elements)
            item = document.createElement(arrayElement[i][0]);
            item.textContent = arrayElement[i][1];
            console.log("TEXT: ");
            topItem.appendChild(item);
            }
        }
        }
    }  
}


const element =
["div", {style: "background: salmon"},
["h1", "Hello World"],
["h2", {style: "text-align:right"}, "from our library"] ]

window.onload = () => {
    const appRoot = document.getElementsByClassName("sjdon")[0];
    console.log(Array.from(document.getElementsByClassName("sjdon")));
    renderSJDON(element, appRoot);
}
