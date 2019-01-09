const userTypes = `
  type Position {
    price: Float!
    ticker: String!
    quantity: Int!
  }
`

const userQueries = `
  user: User
  positions: [Position]
`

const userMutations = `
  addPosition(email: String!, ticker: String!, quantity: Int!, price: Float!): User
`

module.exports = {
  userTypes,
  userQueries,
  userMutations
}