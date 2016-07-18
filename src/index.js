var mindwave = require('./sources/mindwave')
var timeserver = require('./sources/timeserver')
var store = require('cycular').store
var level = require('level')
var hyperlog = require('hyperlog')

function setup (prefs) {
  var db = level(prefs.dbPath)
  var log = hyperlog(db, {
    valueEncoding: 'json'
  })
  var mwS = mindwave(prefs.mindwave.port,
                     prefs.mindwave.bufferSize)
  var tsS = timeserver(prefs.timeserver.url,
                       prefs.timeserver.interval)
  var savedDataS = store(log,  [
    mwS,
    tsS,
  ], prefs.bufferMs, prefs.bufferSize)

  return savedDataS
}

module.exports = setup
