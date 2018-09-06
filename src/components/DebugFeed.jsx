import * as React from "react"
import Debug from "./Debug"

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

        <Debug value={feed} />
      </div>
    )
  }
}
