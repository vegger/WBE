const renderSJDON = (element, appRoot) => {
  const [type, ...sjdon] = element
  const node = document.createElement(type)

  for (let item of sjdon) {
      if (item && typeof(item) == 'object' && !Array.isArray(item)) {
          for (let attributeName of Object.keys(item)) {
              node[attributeName] = item[attributeName]
          }
      } else if (Array.isArray(item)) {
          renderSJDON(item, node)
      } else {
          node.appendChild(document.createTextNode(item))
      }
  }

  appRoot.appendChild(node)
}

const element =
["div", {style: "background: salmon"},
["h1", "Hello World"],
["h2", {style: "text-align:right"}, "from our library"] ]

function initSJDON() {
    const appRoot = document.getElementsByClassName("sjdon")[0];
    renderSJDON(element, appRoot);
}
