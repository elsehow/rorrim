var Mindwave = require('mindwave2')
var kefir = require('kefir')
var source = require('cycular').source

function toObj (objs) {
  return objs.reduce(function (acc,o) {
    var k = Object.keys(o)[0]
    acc[k] = o[k]
    return acc
  }, {})
}

function prop (p) {
  return (v) => {
    var r = {}
    r[p] = v
    return r
  }
}

module.exports = (port, buffSize) => {

  var mw = new Mindwave();
  function asProp (ev) {
    return kefir.fromEvents(mw, ev).map(prop(ev))
  }
  var waveS = kefir.fromEvents(mw, 'wave').bufferWithCount(buffSize).map(prop('wave'))
  var outS = kefir.zip([
    asProp('eeg'),
    asProp('signal'),
    asProp('meditation'),
    asProp('attention'),
    //waveS,
  ]).map(toObj)

  mw.connect(port);
  return source('mindwave', function (emitter) {
    outS.onValue(emitter.emit)
    outS.onError(emitter.error)
  })
}
