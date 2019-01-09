const User = require('../../models/User')

module.exports = {
  addPosition(root, { email, ticker, quantity, price }) {
    const position = { ticker, quantity, price }

    return new Promise((resolve, reject) => {
      return User.findOneAndUpdate({ email }, { $push: { positions: position } }, { new: true })
        .exec((err, user) => {
          if (err) return reject('Error adding position')
          resolve(user)
        })
    })
  }
}