/**
 * atomic.js
 */

function successCallback (data, xhr) {}
function errorCallback (data, xhr) {}

describe('atomic', function () {

  /**
   * xhr
   */
  describe('xhr', function () {

    beforeEach(function () {
      spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
      spyOn(XMLHttpRequest.prototype, 'send');
      spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
    });

    describe('XMLHttpRequest.open', function (){
      it('should open an XMLHttpRequest', function () {
        atomic.get('')
          .success(successCallback)
          .error(errorCallback);

        expect(XMLHttpRequest.prototype.open)
          .toHaveBeenCalled();
      });
    });

    describe('XMLHttpRequest.send', function (){
      it('should send an XMLHttpRequest', function () {
        atomic.get('')
          .success(successCallback)
          .error(errorCallback);

        expect(XMLHttpRequest.prototype.send)
          .toHaveBeenCalled();
      });
    });

    describe('XMLHttpRequest.setRequestHeader', function (){
      it('should set the request header', function(){
        atomic.get('')
          .success(successCallback)
          .error(errorCallback);

        expect(XMLHttpRequest.prototype.setRequestHeader)
          .toHaveBeenCalled();
      });
    });

    describe('Content-Type header', function (){
      it('should use "application/x-www-form-urlencoded" as the default Content-Type', function(){
        atomic.get('');

        expect(XMLHttpRequest.prototype.setRequestHeader)
          .toHaveBeenCalledWith('Content-Type', 'application/x-www-form-urlencoded');
      });

      it('should update the default Content-Type header', function() {
        atomic.setHeaders({
          'Content-Type': 'application/json'
        });
        atomic.get('');

        expect(XMLHttpRequest.prototype.setRequestHeader)
          .toHaveBeenCalledWith('Content-Type', 'application/json');
      });
    });
  });
});
