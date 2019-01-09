import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import cookie from 'cookie'

import withData from '../lib/withData'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'
import Layout from '../components/layout'
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
        <Layout account={account}>
          <div className='container'>
            <h1> Hello {account.name}! </h1>
            <PositionForm account={account} />
            <br />
            <PositionList account={account} />
            <button onClick={() => redirect({}, '/logout')}>Logout</button>
            <Link href='/profile'>
              <a>Go to Profile</a>
            </Link>
          </div>
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
