import * as React from "react"
import Debug from "./Debug"

export default class DebugSwarm extends React.Component {
  componentDidMount() {
    const { swarm } = this.props
  }

  render() {
    const { swarm } = this.props

    return (
      <div>
        <h3>Connections:</h3>
        <Debug value={swarm && swarm.connections} />

        <h3>Seen Peers:</h3>
      </div>
    )
  }

  changed = () => {
    this.forceUpdate()
  }
}
