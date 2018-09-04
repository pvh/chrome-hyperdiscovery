import * as React from "react"

export default class DebugLogger extends React.Component {
  render() {
    return (
      <span>
        (
        <a href="" onClick={this.log}>
          log
        </a>
        )
      </span>
    )
  }

  log = e => {
    e.preventDefault()
    const { get, tag } = this.props
    const val = get()

    if (!window.log) window.log = {}

    window.log[tag] = val
    console.log(`window.log.${tag}`, val)
  }
}
