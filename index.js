var fs = require('fs')
function copy(src, dist, cb) {
  fs.access(dist, function(err) {
    if (err) {
      fs.mkdir(dist)
    }
    fs.stat(src, function(err, stat) {
      if (!stat.isDirectory()) {
        throw 'error'
      }
    })
    _copy(null, src, dist)
  })
  function _copy(err, src, dist) {
    if (err) {
      cb(err)
    } else {
      fs.readdir(src, function(err, paths) {
        if (err) {
          cb(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' + path
            var _dist = dist + '/' + path
            fs.stat(_src, function(err, stat) {
              if (err) {
                cb(err)
              } else {
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src))
                } else if (stat.isDirectory()) {
                  copy(src, _dist, cb)
                }
              }
            })
          })
        }
      })
    }
  }
}
module.exports =  copy
