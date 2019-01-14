import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const mutator = gql`
  mutation addPosition($email: String!, $ticker: String!, $quantity: Int!, $price: Float!) {
    addPosition(email: $email, ticker: $ticker, quantity: $quantity, price: $price) {
      positions {
        ticker
        quantity
        price
      }
    }
  }
`

class PositionForm extends React.Component {
  state = {
    ticker: null,
    quantity: null,
    price: null,
    error: null
  }

  onFormSubmit = e => {
    e.preventDefault()
    let { ticker, quantity, price } = this.state
    let { email } = this.props.account

    ticker = ticker.trim()

    this.props.mutate({
      variables: {
        email,
        ticker,
        quantity,
        price
      }
    })
    .then(() => {
      this.setState({ error: null })
    })
    .catch(({ graphQLErrors: err }) => {
      console.log('>>> err', err)
      this.setState({ error: err[0].message })
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} key="form">
        <div>
          <span className="error">{this.state.error}</span>
          <label>Ticker</label>
          <input
            type="text"
            onInput={e => this.setState({ ticker: e.target.value})}
            placeholder="SPY"
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="int"
            onInput={e => this.setState({ quantity: parseInt(e.target.value) })}
            placeholder="1"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="int"
            onInput={e => this.setState({ price: parseFloat(e.target.value) })}
            placeholder="1.00"
          />
        </div>
        <div>
          <button type="submit">Purchase</button>
        </div>
        <style jsx>
					{`
						* {
							box-sizing: border-box;
							margin: 0;
						}

						label {
							display: block;
						}

						form > div {
							margin-top: 1rem;
            }
            
            input {
              width: 100%;
            }

						input,
						button {
							padding: 0.5rem;
						}

						button {
							width: 100%;
							border: none;
              cursor: pointer;
              border: 1px solid;
						}

						.out {
							display: block;
							margin: 1rem 0;
						}
					`}
				</style>
      </form>
    )
  }
}

export default graphql(mutator)(PositionForm)