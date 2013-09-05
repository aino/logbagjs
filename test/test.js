var should = require('should')
  , proxyquire = require('proxyquire')
  , assert = require('assert')



var req
  , requestStub = function(options) { req = options }
  , logbag = proxyquire('../index', { 'request': requestStub })


var consolelog = console.log

var replaceConsoleLog = function(f, obj) {
  console.log = function() {
    var args = Array.prototype.slice.call(arguments)
    obj['res'] = args.join(', ')
  }
  f()
  console.log = consolelog
}


describe('Logger', function() {
  describe('.log()', function() {
    var log = logbag.Logger('url', 'user', 'log')
    log.log('test', 'hello')

    it('it should POST', function() {
      req.method.should.equal('POST')
    })
    it('it should go to url url', function() {
      req.url.should.equal('url')
    })
    it('it should log a hello message', function() {
      req.form.user.should.equal('user')
      req.form.log.should.equal('log')
      req.form.level.should.equal('test')
      req.form.message.should.equal('hello')
    })
    it('it should log to debug level', function() {
      log.debug('hi')
      req.form.level.should.equal('debug')
    })

    it('it should not log', function() {
      log = logbag.Logger('url', 'user', 'log', 'info')
      req = null
      log.debug('hi')
      assert.equal(req, null)
    })
  })
})


describe('ConsoleLogger', function() {
  describe('.log()', function() {
    var log = logbag.ConsoleLogger()
      , obj = {}
      , obj2 = {}

    replaceConsoleLog(function() {
      log.log('debug', 'hello', {'me': 'you'})
    }, obj)
    it('is should log debug', function() {
      obj['res'].should.equal('debug: hello, {"me":"you"}')
    })

    replaceConsoleLog(function() {
      log.error('err')
    }, obj2)
    it('is should log err', function() {
      obj2['res'].should.equal('error: err')
    })

  })
})


