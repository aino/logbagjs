var _ = require('underscore')
  , request = require('request')


var Logger = function(url, user, log) {
  var L = {}
  L.log = function(level, message, options) {
      var form = options || {}
      _.extend(form, { user: user, log: log, level: level, message: message })
      request({
          url: url
        , method: 'POST'
        , form: form
      })
    }
  L.debug =    function(message, options) { L.log('debug',    message, options) }
  L.info =     function(message, options) { L.log('info',     message, options) }
  L.warning =  function(message, options) { L.log('warning',  message, options) }
  L.error =    function(message, options) { L.log('error',    message, options) }
  L.critical = function(message, options) { L.log('critical', message, options) }
  return L
}

exports.Logger = Logger
