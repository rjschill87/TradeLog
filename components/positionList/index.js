import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Position from '../positionList/position'

const POSITION_QUERY = gql`
  query positions {
    positions {
      ticker
      price
      quantity
    }
  }
`

class PositionList extends Component {
  fetchPositions = () => {
    return(
      <Query query={POSITION_QUERY} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          const positions = data.positions || []

          return(
            <div>
              {positions.length > 0 && 
                positions.map((pos, i) => {
                  return <Position {...pos} key={i} />
                })
              }
            </div>
          )
        }}
      </Query>
    )
  }

  render() {
    return(
      <section>
        <div>
          <h2>
            Positions
          </h2>
        </div>
        <ul>
          {this.fetchPositions()}
        </ul>
        <style jsx>
        {`
          ul {
            list-style: none;
            padding-left: 0;
          }
        `}
        </style>
      </section>
    )
  }
}

export default PositionList
