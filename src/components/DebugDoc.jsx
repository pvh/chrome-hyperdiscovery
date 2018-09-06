import * as React from "react"
import Debug from "./Debug"

export default class DebugDoc extends React.Component {
  state = { doc: null }

  componentDidMount() {
    const { hm, id } = this.props
    this.handle = hm.openHandle(id)
    this.handle.onChange(doc => {
      this.setState({ doc })
    })
  }

  render() {
    const { hm, id } = this.props
    const { doc } = this.state
    if (!doc) return null

    return (
      <div>
        <h3>Id:</h3>
        <div>{id}</div>

        <h3>Doc:</h3>
        <div>
          <Debug value={doc} />
        </div>

        <h3>Vector clock:</h3>
        <DebugClock doc={doc} />

        <h3>Metadata:</h3>
        <Debug value={hm.metadata(id)} />
      </div>
    )
  }
}

const DebugClock = ({ doc }) => {
  const clock = doc._state.getIn(["opSet", "clock"])

  return (
    <ul>
      {clock.keySeq().map(id => (
        <li key={id}>
          {id}: {clock.get(id)}
        </li>
      ))}
    </ul>
  )
}
