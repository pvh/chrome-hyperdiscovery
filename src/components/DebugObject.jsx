import * as React from "react"
import DebugDoc from "./DebugDoc"
import DebugSwarm from "./DebugSwarm"

export default class DebugObject extends React.Component {
  render() {
    const { obj, map = JSON.stringify } = this.props

    return (
      <ul>
        {obj === null
          ? "null"
          : obj === undefined
            ? "undefined"
            : Object.entries(obj).map(([k, v]) => (
                <li key={k}>
                  <b>{k}:</b> {map(v)}
                </li>
              ))}
      </ul>
    )
  }
}
