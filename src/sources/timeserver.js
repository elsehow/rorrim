var kefir = require('kefir')
var request = require('request');
var source = require('cycular').source
var timestamp = require('unix-timestamp')
/*
  Takes `url` of the timeserver
  And an `interval` to fetch on, in ms
*/
function timeserver (url, interval) {

  function timeS () {
    var requestedAt = Date.now()
    return source('timeserver', function (emitter) {
      request(url, function (error, response, body) {
        if (error)
          emitter.error(error)
        else if (response.statusCode !== 200)
          emitter.error(response.statusCode)
        else
          emitter.emit({
            requestedAt: requestedAt,
            serverTime: timestamp.fromDate(body)*1000,
          })
      })
    })
  }

  return kefir.interval(interval, 1).flatMap(timeS)
}

module.exports = timeserver
