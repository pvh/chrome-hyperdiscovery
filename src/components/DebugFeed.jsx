import * as React from "react"
import DebugObject from "./DebugObject"

export default class DebugFeed extends React.Component {
  componentDidMount() {
    const { hm, id } = this.props
    this.feed = hm._trackedFeed(id)
    this.forceUpdate()
  }

  render() {
    const { hm, id } = this.props
    const { feed } = this

    if (!feed) return <div>No feed</div>

    return (
      <div>
        <h3>Feed id:</h3>
        <div>{id}</div>

        <DebugObject obj={feed} />
      </div>
    )
  }
}
