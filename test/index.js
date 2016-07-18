var rorrim = require('..')
var prefs = {
  dbPath: '/tmp/rorrim',   // level db path
  bufferMs: 20,            // ms to store in buffer before hitting disk
  bufferSize: 100,         // # to store buffer before hitting disk
  mindwave: {
    port: '/dev/cu.MindWaveMobile-DevA',
    bufferSize: 256,
  },
  timeserver: {
    url: 'http://indra.webfactional.com/timeserver',
    interval: 1000,
  },
}
var savedDataS = rorrim(prefs)

// TODO
// write a frontend
// with specific requirements!
// driven by specs of the frontend tools
// i am done on this end!
savedDataS.log()
