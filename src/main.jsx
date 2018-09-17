
import * as React from "react"
import { render } from "react-dom"
import App from "./components/App"
import racf from 'random-access-chrome-file'

process.hrtime = require("browser-process-hrtime")
let hd = require('hyperdiscovery')
import Hypermerge from "./hypermerge"

setTimeout(() => {
  let hm = new Hypermerge({ storage: racf })
  hm.joinSwarm({ chrome: true })

  window.hm = hm

  render(<App hm={hm} />, window.app)
}, 1000)

