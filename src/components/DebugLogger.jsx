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

    window[tag] = val
    console.log(`window.${tag}`, val)
  }
}
