(function() {
  function Angrywoman(options) {
    this.url = options.url;
    this.project = options.project;
    this.debug = options.debug;
  };

  // Send exception to Angryman
  Angrywoman.prototype.shout = function shout(e, meta) {
    var req = new XMLHttpRequest();
    if (!req) return;

    var method = 'POST';
    var url = this.url + this.project;
    req.open(method, url, true);

    req.onreadystatechange = function () {
      if (req.readyState != 4) return;
      if (req.status != 200 && req.status != 304) {
        if (this.debug) console.warn('Angryman not responeded');
        return;
      }
    }

    if (req.readyState == 4) return;

    var postData = JSON.stringify({
      throwableProxyStackTrace: e.stack.split('\n'),
      message: e.toString()
    });
    req.send(postData);
  };


  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Angrywoman;
  }
  else {
    window.Angrywoman = Angrywoman;
  }
})();
