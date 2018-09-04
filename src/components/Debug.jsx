import * as React from "react"
import DebugDoc from "./DebugDoc"
import DebugHome from "./DebugHome"
import DebugFeed from "./DebugFeed"

export default class Debug extends React.Component {
  state = { route: { type: "" }, docId: "" }

  componentDidMount() {
    const { hm } = this.props

    hm.on("ready", this.changed)
      .on("document:updated", this.changed)
      .on("document:ready", this.changed)
      .on("peer:added", this.changed)
      .on("peer:left", this.changed)

    window.addEventListener("hashchange", () => {
      this.setState({ route: parseRoute(location.hash) })
    })
  }

  render() {
    return (
      <div
        style={{
          userSelect: "text",
          overflow: "auto",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "white",
          padding: 20,
        }}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="" onClick={this.reload}>
              Reload
            </a>
          </li>
        </ul>
        <div>{this.renderRoute()}</div>
      </div>
    )
  }

  renderRoute() {
    const { hm } = this.props
    const { docId, route } = this.state

    switch (route.type) {
      case "":
        return <DebugHome hm={hm} />

      case "doc":
        return <DebugDoc hm={hm} id={route.id} />

      case "feed":
        return <DebugFeed hm={hm} id={route.id} />

      default:
        return (
          <div>
            Unknown route:
            {route.type}
          </div>
        )
    }
  }

  reload = event => {
    event.preventDefault()
    this.forceUpdate()
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
