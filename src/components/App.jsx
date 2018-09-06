import * as React from "react"
import Debugger from "./Debugger"

export default class App extends React.Component {
  render() {
    const { hm } = this.props
    return <Debugger hm={hm} />
  }
}
