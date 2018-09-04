import * as React from "react"
import DebugDoc from "./DebugDoc"

export default class DebugSwarm extends React.Component {
  componentDidMount() {
    const { swarm } = this.props
  }

  render() {
    const { swarm } = this.props

    return (
      <div>
        <h3>Connections:</h3>

        <h3>Seen Peers:</h3>
      </div>
    )
  }

  changed = () => {
    this.forceUpdate()
  }
}
