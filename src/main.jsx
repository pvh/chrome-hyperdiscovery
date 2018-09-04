import * as React from "react"
import { render } from "react-dom"
import App from "./components/App"

process.hrtime = require("browser-process-hrtime")

setTimeout(() => {
  let Hypermerge = require("../src/hypermerge/index")
  let racf = require("random-access-chrome-file")
  //  var raf = require('random-access-file')
  //  var ram = require('random-access-memory')

  let hm = new Hypermerge({ storage: racf })
  window.hm = hm

  render(<App hm={hm} />, window.app)

  hm.once("ready", () => {
    hm.joinSwarm()
  })
}, 1000)
