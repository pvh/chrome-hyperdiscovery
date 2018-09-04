import * as React from "react"
import DebugLogger from "./DebugLogger"

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
                  <b>{k}</b>
                  <DebugLogger tag={k} get={() => obj[k]} />: {map(v)}
                </li>
              ))}
      </ul>
    )
  }
}
