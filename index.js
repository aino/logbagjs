var _ = require('underscore')
  , request = require('request')


var levels = ['debug', 'info', 'warning', 'error', 'critical']


var Logger = function(url, user, log, minLevel) {
  var L = {}
  L.log = function(level, message, options) {
    var idx = levels.indexOf(level)
    if ( !minLevel || idx == -1 || idx >= levels.indexOf(minLevel) ) {
      var form = options || {}
      _.extend(form, { user: user, log: log, level: level, message: message })
      request({ url: url , method: 'POST' , form: form })
    }
  }
  levels.forEach(function(level) {
    L[level] = function(message, options) { L.log(level, message, options) }
  })
  return L
}

exports.Logger = Logger
