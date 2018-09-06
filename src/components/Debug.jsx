import * as React from "react"
import { Inspector } from 'react-inspector'

export default class Debug extends React.Component {
  render() {
    const { value } = this.props

    return (
      <Inspector data={value} expandLevel={1} />
    )
  }
}
