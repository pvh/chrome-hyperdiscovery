import * as React from "react"
import Debug from "./Debug"

export default class App extends React.Component {
  render() {
    const { hm } = this.props
    return <Debug hm={hm} />
  }
}
