// Stupid tests fails without this because i don't understund how automock
// works, I tink.
var audio = {
  addEventListener: function () {}
};

if (typeof window.Audio !== 'undefined') {
  audio = new Audio();
}

module.exports = audio;
