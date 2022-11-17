let state = Array(6).fill("").map(() => Array(7).fill("b"))

window.onload = () => {
  boardToDOM(state)
  makeItMagic(state)
}

function boardToDOM(fields) { //Fields is 2D Array like state
  let nodes = []
  for(let row of fields) {
    for(let field of row) {
      const node = elt("div", {"class": "field"}, "")
      
      if(field == "b") {
        node.append(elt("div", {"class": "piece blue"}, ""))
      } else if (field == "r") {
        node.append(elt("div", {"class": "piece red"}, ""))
      }
      nodes.push(node)
    }
  }
  document.getElementsByClassName("board")[0].append(...nodes)
}

function makeItMagic(fields) {
  const row = 6// Math.random()*6
  const column = 2
  fields[row][column] = 'r'
  boardToDOM(fields)
}

function elt (type, attrs, ...children) {
  let node = document.createElement(type)
  for (a in attrs) {
    node.setAttribute(a, attrs[a])
  }
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child)
    else node.appendChild(document.createTextNode(child))
  }
  return node
}