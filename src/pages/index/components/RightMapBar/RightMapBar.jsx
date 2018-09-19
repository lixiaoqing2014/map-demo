import React, { Component } from "react";
import { connect } from "react-redux"
import { handleMove } from "../../../../store/map/action"
import "./RightMapBar.scss"

@connect(
  state => state.map,
  { handleMove }
)

export default class RightMapBar extends Component {
  constructor(props) {
    super(props);
    this.move = this.move.bind(this)
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }


  componentWillMount() {

  }
  move() {
    var viewProperties = { center: [200, 39.92] }
    this.props.handleMove(viewProperties)
  }

  render() {
    return (
      <div onClick={this.move}>Right</div>
    )

  }
}