/*! atomicjs v2.1.0 | (c) 2016 @munkychop | github.com/munkychop/atomicjs */
!function() {
    "use strict";
    var exports = {}, options = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }, parse = function(req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [ result, req ];
    }, xhr = function(httpMethod, url, data) {
        var methods = {
            success: function() {},
            error: function() {}
        }, XHR = window.XMLHttpRequest || ActiveXObject, request = new XHR("MSXML2.XMLHTTP.3.0");
        request.open(httpMethod, url, !0);
        for (var k in options.headers) request.setRequestHeader(k, options.headers[k]);
        request.onreadystatechange = function() {
            4 === request.readyState && (request.status >= 200 && request.status < 300 ? methods.success.apply(methods, parse(request)) : methods.error.apply(methods, parse(request)));
        }, request.send(data);
        var callbacks = {
            success: function(callback) {
                return methods.success = callback, callbacks;
            },
            error: function(callback) {
                return methods.error = callback, callbacks;
            }
        };
        return callbacks;
    };
    exports.get = function(src) {
        return xhr("GET", src);
    }, exports.put = function(url, data) {
        return xhr("PUT", url, data);
    }, exports.post = function(url, data) {
        return xhr("POST", url, data);
    }, exports["delete"] = function(url) {
        return xhr("DELETE", url);
    }, exports.setHeaders = function(headers) {
        options.headers = headers;
    }, exports.getHeaders = function() {
        return options.headers;
    }, "undefined" != typeof define && define.amd ? define(function() {
        return exports;
    }) : "undefined" != typeof module && module.exports ? module.exports = exports : window.atomic = exports;
}();