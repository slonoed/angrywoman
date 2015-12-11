(function() {
  function merge(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }

  //////

  function Angrywoman(options) {
    this.url = options.url;
    if (this.url[this.url.length - 1] !== '/') {
      this.url += '/';
    }

    this.project = options.project;
    this.debug = options.debug;
    this.meta = options.meta || {};
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

    if (Object.prototype.toString.call(meta) == '[object String]') {
      meta = {
        label: meta
      };
    }

    meta.errorMessage = e.toString();

    meta = merge(this.meta, meta);

    // Check meta can be serialized
    try { JSON.stringify(meta) }
    catch (e) { meta = { metaError: 'Meta can\'t be serialized' }; }
    var stack = e.stack.split('\n');
    var postData = JSON.stringify({
      throwableProxyStackTrace: stack,
      stFile: meta.label || meta.errorMessage,
      message: meta.label || meta.errorMessage,
      meta: meta,
      timestamp: Date.now()
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
