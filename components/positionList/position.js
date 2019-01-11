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
        <style jsx>
        {`
          li {
            display: flex;
            flex-direction: row;
            align-items: center;

            >*:not(:last-child) {
              margin-right: 1rem;
            }
          }

          h3 {
            margin: 0.25rem;
          }

          span {
            margin: 0.25rem;
          }
        `}
        </style>
      </li>
    )
  }
}

export default Position