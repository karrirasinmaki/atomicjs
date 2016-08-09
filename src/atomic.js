(function () {

  'use strict';

  var exports = {};

  var options = {
    contentType : 'application/x-www-form-urlencoded'
  };

  var parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  };

  var xhr = function (httpMethod, url, data, contentType) {
    var contentTypeHeader = contentType || options.contentType;
    var methods = {
      success: function () {},
      error: function () {}
    };
    var XHR = window.XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open(httpMethod, url, true);
    request.setRequestHeader('Content-Type', contentTypeHeader);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          methods.success.apply(methods, parse(request));
        } else {
          methods.error.apply(methods, parse(request));
        }
      }
    };
    request.send(data);
    var callbacks = {
      success: function (callback) {
        methods.success = callback;
        return callbacks;
      },
      error: function (callback) {
        methods.error = callback;
        return callbacks;
      }
    };

    return callbacks;
  };

  exports['get'] = function (src) {
    return xhr('GET', src);
  };

  exports['put'] = function (url, data, contentType) {
    return xhr('PUT', url, data, contentType);
  };

  exports['post'] = function (url, data, contentType) {
    return xhr('POST', url, data, contentType);
  };

  exports['delete'] = function (url) {
    return xhr('DELETE', url);
  };

  exports['setContentType'] = function (contentType) {
    options.contentType = contentType;
  };

  // check for AMD/Module support, otherwise define Bullet as a global variable.
  if (typeof define !== 'undefined' && define.amd)
  {
    // AMD. Register as an anonymous module.
    define (function()
    {
      return exports;
    });

  }
  else if (typeof module !== 'undefined' && module.exports)
  {
    module.exports = exports;
  }
  else
  {
    window.atomic = exports;
  }

})();
