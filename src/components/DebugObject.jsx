import * as React from "react"
import DebugLogger from "./DebugLogger"

export default class DebugObject extends React.Component {
  render() {
    const { obj, map = inspect } = this.props

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

function inspect(x) {
  switch (typeof x) {
    case "undefined": return "undefined"
    case "string": return `"${x}"`
    case "number": return String(x)
    case "array": return `[${x.map()}]`
    default:
      if (x === null) {
        return "null"
      } else if (Array.isArray(x)) {
        return `[${x.map(inspect).join(', ')}]`
      } else {
        return "Object"
      }
  }
}
