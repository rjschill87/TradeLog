const User = require('../../models/User')

module.exports = {
  positions(root, args, req) {
    return new Promise((resolve) => {
      if (!req.user) {
        return resolve(null)
      }

      return User.findOne({ email: req.user.email })
        .then((user) => {
          resolve(user.positions)
        })
      })
  }
}