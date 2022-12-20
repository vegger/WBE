"use strict"
import { App } from './components/App.js'
import { render } from "./lib/suiweb.js"

/*
  *  This solution sould be considered as a proof of concept – the code
  *  definitely needs some cleanup and documentation
  */
window.onload = () => {
  const app = document.querySelector(".app")
  render([App], app)
  return app
}
