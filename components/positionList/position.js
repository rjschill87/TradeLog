import React, { Component } from 'react'

class Position extends Component {
  render() {
    const value = this.props.quantity * this.props.price

    return(
      <li>
        <h3>{this.props.ticker}</h3>
        <div>
          <span>qty: {this.props.quantity}</span>
          <span>value: {value}</span>
        </div>
      </li>
    )
  }
}

export default Position