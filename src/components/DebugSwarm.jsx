import * as React from "react"
import * as Dgram from 'chrome-dgram'
import * as Net from 'chrome-net'
import * as Link from '../data/Link'
import Debug from "./Debug"
import DebugLogger from "./DebugLogger"
import DebugConnection from "./DebugConnection";

export default class DebugSwarm extends React.Component {
  componentDidMount() {
    const { swarm } = this.props
  }

  render() {
    const { swarm } = this.props

    if (!swarm) return <div>Waiting for swarm...</div>

    const { connections = [] } = swarm

    return (
      <div>
        <h3>Connections:</h3>
        <ul>
          {connections.map((conn, idx) =>
            <li key={idx}>
              <DebugConnection connection={conn} />
            </li>
          )}
        </ul>

        <h3>Seen Peers:</h3>
      </div>
    )
  }

  changed = () => {
    this.forceUpdate()
  }
}
