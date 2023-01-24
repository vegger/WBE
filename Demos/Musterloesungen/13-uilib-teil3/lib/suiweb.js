/**
 *  SuiWeb 
 *  Simple User Interface Tool for Web Exercises
 * 
 *  @author   bkrt
 *  @version  0.3.4
 *  @date     11.12.2021
 *
 *  0.3.4 - only null or undefined qualify as uninitialized state
 *  0.3.3 - parseSJDON rewritten to use createElement
 *        - flatten children array for props.children in JSX
 *  0.3.2 - save and restore of active element improved 
 *  0.3.1 - parseSJDON rewritten 
 *  0.3.0 - style property 
 *  0.2.3 - ES6 modules
 *  0.2.2 - component state and hooks
 *  0.2.1 - parse SJDON rewritten, function components 
 *  0.2.0 - render single SJDON structures to DOM
 * 
 *  Based on ideas and code from 
 *  Rodrigo Pombo: Build your own React
 *  https://pomb.us/build-your-own-react/
 * 
 *  Thanks to Rodrigo Pombo for a great tutorial and for sharing the 
 *  code of the Didact library. Didact is a much more sophisticated
 *  re-implementtation of React's basics than the simple SuiWeb.
 */

/* =====================================================================
 *  SJDON - Conversion
 * =====================================================================
*/

//  parseSJDON: convert SJDON to createElement calls
//
//  note: this function can also help to use React with SJDON syntax
//
//  to simplify calls add something like this to your components:
//  let s = (data) => reactFromSJDON(data, React.createElement)
// 
function parseSJDON ([type, ...rest], create=createElement) {
  const isObj = (obj) => typeof(obj)==='object' && !Array.isArray(obj)
  const children = rest.filter(item => !isObj(item))
  const repr = create(type, 
    Object.assign({}, ...rest.filter(isObj)),
    ...children.map(ch => Array.isArray(ch) ? parseSJDON(ch, create) : ch)
  )
  repr.sjdon = children
  return repr
}


//  create an element representation
// 
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.flat().map(child => 
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}


//  create a text element representation
//
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

/* =====================================================================
 *  Render node tree to DOM
 * =====================================================================
*/

//  global context
let contextStore = createStore();


//  remove children and render new subtree
//
function render(element, container) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  renderInit(element, container, 0);
}


//  render subtree
//  and call effects after rendering
//
function renderInit(element, container, n, childIndex) {
  contextStore("effects", []);
  
  // save focus and cursor position of active element
  let [focusSelector, position] = getFocusInput();
  
  // ** render the element **
  renderElem(element, container, n, childIndex);
  
  // restore focus and cursor position of active element
  setFocusInput(focusSelector, position);
  
  // run effects
  contextStore("effects").forEach(fun => fun());
  contextStore("effects", []);
}


//  render an element
//  - if it is in SJDON form: parse first
//  - render function or host component
//
function renderElem(element, container, n, childIndex) {
  if (Array.isArray(element)) {
    element = parseSJDON(element);
  }
  
  if (element.type instanceof Function) {
    updateFunctionComponent(element, container, n, childIndex);
  } else {
    updateHostComponent(element, container, childIndex);
  }
}


//  function component
//  - run function to get child node
//  - render child node
//
function updateFunctionComponent(element, container, n, childIndex) {
  // save re-render function to context
  contextStore("re-render", () => renderInit(element, container, n, n));
  let children = element.sjdon ?? element.props.children;
  let node = element.type({...element.props, children});
  renderElem(node, container, n, childIndex);
}


//  host component
//  - create dom node
//  - assign properties
//  - render child nodes
//  - add host to dom
//
function updateHostComponent(element, container, childIndex) {
  
  // create DOM node
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
  
  // assign the element props
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      if (name=="style") {
        updateStyleAttribute(dom, element.props.style);
      } else {
        dom[name] = element.props[name];
      }
    })
  
  // render children
  element.props.children.forEach((child, index) => {
    renderElem(child, dom, index);
  });
  
  if (typeof(childIndex) == 'number') {
    // re-render: replace node
    container.replaceChild(dom, container.childNodes[childIndex]);
  } else {
    // add node to container
    container.appendChild(dom);
  }
}


//  update style attribute, value can be:
//  - a CSS string: set to style attribute
//  - an object: merged to style attribute
//  - an array of objects: merged to style attribute
//
function updateStyleAttribute(dom, styles) {
  if (typeof(styles)=="string") {
    dom.style = styles;
  } else if (Array.isArray(styles)) {
    Object.assign(dom.style, ...styles);
  } else if (typeof(styles)=="object") {
    Object.assign(dom.style, styles);
  }
}


/* =====================================================================
 *  Handling state
 * =====================================================================
*/

//  element state
let stateHooks = createStore();


//  state hook
//  - access state via id and key
//  - return state and update function
//
function useState(id, key, init) {
  let idKey = "id:" + id + "-key:" + key;
      
  //  prepare render function 
  let renderFunc = contextStore("re-render");

  //  define function to update state
  function updateValue(updateFun, rerender=true) {
    stateHooks(idKey, updateFun(stateHooks(idKey)));
    if (rerender) renderFunc();
  }

  //  new state: set initial value
  if ([undefined, null].includes(stateHooks(idKey))) {
    stateHooks(idKey, init);
  }
  
  return [stateHooks(idKey), updateValue];
}


//  effect hook
//  add function to effects array
//
function useEffect(fun) {
  contextStore("effects", [...contextStore("effects"), fun]);
}


//  create a key-value-store
//  return accessor function
//
function createStore() {
  let data = {};
  function access(key, ...value) {
    if (value.length === 0) {
      return data[key];
    } else {
      data[key] = value[0];
      return value[0];
    }
  }
  return access;
}


/* =====================================================================
 *  Get and set focus and position in certain elements
 *  Note: this is a quick&dirty solution that probably fails when 
 *  elements are added or removed
 * =====================================================================
*/

//  create a CSS selector for a given node
//
function getSelectorOf(node) {
  let selector = ""
  while (node != document.body) {
    if (selector != "") selector = ">" + selector
    
    if (node.id) {
      selector = "#"+node.id + selector
      break
    }
    
    let index = Array.from(node.parentNode.children)
      .filter(item=>item.tagName==node.tagName)
      .findIndex(item=>item==node)
    
    selector = node.tagName + ":nth-of-type(" + (index+1) + ")" + selector
    node = node.parentNode
  }
  return selector
}

//  find a selector for the element that has focus and the cursor 
//  position in the element
//
function getFocusInput() {
  const active = document.activeElement;
  let sel = active ? getSelectorOf(active) : undefined
  let position = active ? active.selectionStart : undefined;
  return [sel, position];
}

//  set focus to an element in a list of elements matching a 
//  selector and position cursor in the element
//
function setFocusInput(selector, position) {
  if (selector && typeof(selector) == 'string') {
    console.log("Sel:"+selector)
    let el = document.querySelector(selector);
    if (el) el.focus();
    if (el && "selectionStart" in el 
        && "selectionEnd" in el 
        && position !== undefined) {
      el.selectionStart = position;
      el.selectionEnd = position;
    }
  }
}


/* =====================================================================
 *  Module export
 * =====================================================================
*/

export { render, createElement, useState, useEffect };


/* =====================================================================
 *  EOF
 * =====================================================================
*/
