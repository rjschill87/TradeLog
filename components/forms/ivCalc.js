import React, { Component } from 'react'

class IVCalcForm extends Component {
  state = {
    underlying: 0,
    strike: 0,
    iv: 0,
    expiry: 0,
    output: null
  }

  onFormSubmit = e => {
    e.preventDefault()
    let { underlying, iv, expiry, strike } = this.state
    underlying = parseFloat(underlying)
    const ev = (iv / 100) * Math.sqrt(expiry / 365)
    const range = (underlying * ev).toFixed(2)
    const low = (underlying - (range / 2)).toFixed(2)
    const high = (underlying + (range / 2)).toFixed(2)
    const fv = (high - strike).toFixed(2)
    const output = `The stock has a range of ${range}, with possible price action of $${low} - $${high}. Fair value = $${fv}`
    
    this.setState({ output })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} key="form">
        <div>
          <span className="output">{this.state.output}</span>
          <label>Underlying</label>
          <input
            type="int"
            onInput={e => this.setState({ underlying: e.target.value})}
            placeholder="45.00"
          />
        </div>
        <div>
          <label>Strike Price</label>
          <input
            type="int"
            onInput={e => this.setState({ strike: e.target.value })}
            placeholder="105.50"
          />
        </div>
        <div>
          <label>Implied Volatility (%)</label>
          <input
            type="int"
            onInput={e => this.setState({ iv: e.target.value })}
            placeholder="134"
          />
        </div>
        <div>
          <label>Days Til Experiation</label>
          <input
            type="int"
            onInput={e => this.setState({ expiry: e.target.value })}
            placeholder="30"
          />
        </div>
        <div>
          <button type="submit">Calculate</button>
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

						input,
						button {
							padding: 0.5rem;
						}

						button {
							width: 12rem;
							border: none;
							cursor: pointer;
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

export default IVCalcForm