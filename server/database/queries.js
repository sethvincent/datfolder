module.exports = function Queries (knex, models) {
  return {
    getDatByShortname: function (params, cb) {
      models.users.get({username: params.username}, function (err, results) {
        if (err) return cb(err)
        if (!results.length) return cb(new Error('Username not found.'))
        var user = results[0]
        models.dats.get({user_id: user.id, name: params.dataset}, function (err, results) {
          if (err) return cb(err)
          if (!results.length) return cb(new Error('Dat with that name not found.'))
          var dat = results[0]
          return cb(null, dat)
        })
      })
    }
  }
}
