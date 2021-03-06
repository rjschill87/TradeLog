import React, { Component, Fragment } from 'react'
import Link from 'next/link'

import withData from '../lib/withData'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'
import Layout from '../components/layout'
import IVCalculator from '../components/forms/ivCalc'
import PositionForm from '../components/forms/position'
import PositionList from '../components/positionList'

class Index extends Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    return { loggedInUser }
  }

  render() {
    const { account } = this.props.loggedInUser
    if (account) {
      return (
        <Layout account={account} title="TradeLog">
          <div className='container'>
            <div className='container__left'>
              <h1> Hello {account.name}! </h1>
              <div>
                <h2>Convert Implied Volatility to Price Action Range</h2>
                <IVCalculator />
              </div>
            </div>
            <div className='container__right'>
              <h2>Add Position</h2>
              <PositionForm account={account} />
              <br />
              <PositionList account={account} />
            </div>
          </div>
          <footer>
            <button onClick={() => redirect({}, '/logout')}>Logout</button>
            <Link href='/profile'>
              <a>Go to Profile</a>
            </Link>
          </footer>
          <style jsx>
            {`
            .container {
              display: flex;
              justify-content: space-around;
            }
            `}
          </style>
        </Layout>
      )
    }

    return (
      <div>
        <h1> Auth Example with Next.js and Apollo </h1>
        <Link href='/login'>
          <a>Login</a>
        </Link>{' '}
        or{' '}
        <Link href='/signup'>
          <a>Signup</a>
        </Link>{' '}
        to view hidden resources
        <br /> <br />
      </div>
    )
  }
}

export default withData(Index)
