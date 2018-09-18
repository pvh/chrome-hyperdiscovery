import * as React from "react"
import * as Dgram from 'chrome-dgram'
import * as Net from 'chrome-net'
import * as Link from '../data/Link'
import Debug from "./Debug"
import DebugLogger from "./DebugLogger"

export default class DebugConnection extends React.Component {
  render() {
    const { connection } = this.props

    const { status, type, local, remote, feedIds } = getInfo(connection)

    switch (status) {
      case "Connected":
        return (
          <div>
            <div>
              {type}
              <DebugLogger get={() => connection} />
            </div>
            {local.ip}:{local.port} -> {remote.ip}:{remote.port}
            <ul>
              {feedIds.map(id =>
                <li key={id}>{id}</li>
              )}
            </ul>
          </div>
        )
    }

  }

  changed = () => {
    this.forceUpdate()
  }
}

const getInfo = prot => {
  const { feeds } = prot
  const { pipes } = prot._readableState

  const feedIds = feeds.map(feed =>
    Link.hexTo58(feed.key)
  )

  if (pipes) {
    const type = pipes instanceof Dgram.Socket
      ? "UTP"
      : pipes instanceof Net.Socket
        ? "TCP"
        : "unknown"

    return {
      status: "Connected",
      type,
      feedIds,
      local: {
        ip: pipes.localAddress,
        port: pipes.localPort,
      },
      remote: {
        ip: pipes.remoteAddress,
        port: pipes.remotePort,
      },
      received: {
        bytes: pipes.bytesRead
      }
      sent: {
        bytes: pipes._bytesDispatched
      }
    }
  } else {
    return {
      status: ""
    }
  }
}
