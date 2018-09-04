import * as React from "react"
import DebugDoc from "./DebugDoc"
import DebugSwarm from "./DebugSwarm"

export default class Debug extends React.Component {
  state = { route: { type: "" }, docId: "" }

  componentDidMount() {
    const { hm } = this.props

    hm.on("ready", this.changed)
      .on("document:updated", this.changed)
      .on("peer:added", this.changed)
      .on("peer:left", this.changed)

    window.addEventListener("hashchange", () => {
      this.setState({ route: parseRoute(location.hash) })
    })
  }

  render() {
    const { hm } = this.props
    const { docId, route } = this.state

    switch (route.type) {
      case "":
        return (
          <div style={{ userSelect: "text" }}>
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
              <DebugSwarm swarm={hm.swarm} />
            </ul>
          </div>
        )

      case "doc":
        return (
          <div style={{ userSelect: "text" }}>
            <a href="#">Back</a>
            <DebugDoc hm={hm} id={route.id} />
          </div>
        )

      default:
        return (
          <div>
            Unknown route:
            {route.type}
          </div>
        )
    }
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

const parseRoute = hash => {
  const [type, id] = hash.slice(1).split("/")
  return { type, id }
}
