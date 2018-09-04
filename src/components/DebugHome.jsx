import * as React from "react"
import DebugSwarm from "./DebugSwarm"
import DebugObject from "./DebugObject"

export default class DebugHome extends React.Component {
  state = { docId: "" }

  render() {
    const { hm } = this.props
    const { docId } = this.state

    const feedIds = Object.keys(hm.feeds)
    const orphanedFeedIds = feedIds.filter(id => !(id in hm.docIndex))

    return (
      <div>
        <button onClick={this.createEmptyDoc}>Create new doc</button>

        <h3>Add Doc Id:</h3>
        <form onSubmit={this.submitDocId}>
          <input
            placeholder="abc123"
            size="64"
            onChange={this.docIdChange}
            value={docId}
          />
        </form>

        <h3>Docs:</h3>
        <ul>
          {Object.entries(hm.docs).map(([id, doc]) => (
            <li key={id}>
              <a href={`#doc/${id}`}>
                <DebugDocId id={id} />
              </a>
              <DebugClock doc={doc} />
            </li>
          ))}
        </ul>

        <DebugSwarm swarm={hm.swarm} />

        <h3>Swarm:</h3>
        <DebugObject obj={hm.swarm} />

        <h3>Orphaned feeds:</h3>
        <ul>
          {orphanedFeedIds.map(feedId => (
            <li key={feedId}>
              <a href={`#feed/${feedId}`}>{feedId}</a>
            </li>
          ))}
          <DebugSwarm swarm={hm.swarm} />
        </ul>
      </div>
    )
  }

  changed = () => {
    this.forceUpdate()
  }

  docIdChange = event => {
    const docId = event.target.value
    this.setState({ docId })
  }

  submitDocId = event => {
    event.preventDefault()
    const { docId } = this.state

    if (!docId) return

    this.props.hm.openHandle(docId)

    this.setState({ docId: "" })
  }

  createEmptyDoc = () => {
    const { hm } = this.props

    hm.change(hm.create(), doc => {
      doc.updatedAt = new Date().toISOString()
    })
  }
}

const DebugDocId = ({ id }) => `${id.slice(0, 4)}..${id.slice(-4)}`

const DebugClock = ({ doc }) => {
  const clock = doc._state.getIn(["opSet", "clock"])

  return (
    <div>
      {clock.keySeq().map(id => (
        <div key={id}>
          <DebugDocId id={id} />: {clock.get(id)}
        </div>
      ))}
    </div>
  )
}
