(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * DOM Ready v1.0.6
 * https://github.com/noordawod/dom-ready
 *
 * Copyright (C) 2013-2014 Noor Dawod.
 * All rights reserved.
 *
 * Released under the MIT license
 * http://en.wikipedia.org/wiki/MIT_License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

;var domReady = (function(window, FALSE) {
  'use strict';

  var DOCUMENT = 'document',
      ELEMENT = 'Element',
      DOSCROLL = 'doScroll',
      CALL = 'call',
      DOMCONTENTLOADED = 'DOMContentLoaded',
      ONREADYSTATECHANGE = 'onreadystatechange',
      LOAD = 'load',
      ONLOAD = 'on' + LOAD,
      ADDEVENTLISTENER = 'addEventListener',
      REMOVEEVENTLISTENER = 'removeEventListener',
      ATTACHEVENT = 'attachEvent',
      DETACHEVENT = 'detachEvent',

      document = window[DOCUMENT],
      domReady = FALSE,
      windowOnLoad,
      callbacksList = [],

      // Fire the callbacks that were queued.
      fireCallbacks = function(callback) {
        if(!domReady) {
          domReady = !FALSE;

          // Update the document, just in case.
          document = window[DOCUMENT];

          // Call old onload handler for old browsers.
          if('function' === typeof windowOnLoad)
            windowOnLoad = windowOnLoad[CALL](window, document, window);

          // Call the list of callbacks, each in its own scope.
          // If a callback returns FALSE, stop firing the rest of the callbacks.
          while(FALSE !== windowOnLoad && !!(callback = callbacksList.shift()))
            windowOnLoad = callback[0][CALL](callback[1], document, window);

          // GC.
          callbacksList = null;
        }
      },

      // Trick by Diego Perini
      // http://javascript.nwbox.com/IEContentLoaded/
      tryScroll = function() {
        if(!domReady)
          try {
            document[DOCUMENT + ELEMENT][DOSCROLL]('left');
            fireCallbacks();
          } catch (e) {
            setTimeout(tryScroll, 50);
          }
      },

      // Main handler.
      handler = function(callback) {
        if(domReady)
          // DOM already ran once; just run the callback immediately.
          callback[CALL](this);
        else {
          // When first handler is added, attach the cross-browser DOM ready handler.
          if(!callbacksList.length)
            // Mature browsers.
            if(document[ADDEVENTLISTENER])
              document[ADDEVENTLISTENER](DOMCONTENTLOADED, function() {
                document[REMOVEEVENTLISTENER](DOMCONTENTLOADED, handler, FALSE);
                fireCallbacks();
              }, FALSE);

            // Internet Explorer.
            else if(document[ATTACHEVENT]) {
              // IE supports onreadystatechange event.
              document[ATTACHEVENT](ONREADYSTATECHANGE, function() {
                if('complete' === document.readyState) {
                  document[DETACHEVENT](ONREADYSTATECHANGE, handler);
                  fireCallbacks();
                }
              });

              // Very reliable when not inside a frame.
              if(document[DOCUMENT + ELEMENT][DOSCROLL] && window === window.top)
                tryScroll();

            // Old browsers.
            } else if(window[ADDEVENTLISTENER])
              window[ADDEVENTLISTENER](LOAD, function() {
                window[REMOVEEVENTLISTENER](LOAD, handler, FALSE);
                fireCallbacks();
              }, FALSE);
            else if(window[ATTACHEVENT])
              window[ATTACHEVENT](ONLOAD, function() {
                window[DETACHEVENT](ONLOAD, handler);
                fireCallbacks();
              });

            // Historic browsers.
            else {
              windowOnLoad = window[ONLOAD];
              window[ONLOAD] = fireCallbacks;
            }

          // Queue the callback along with its scope.
          callbacksList.push([callback, this]);
        }
      };

  // Expose main handler to global scope.
  return handler;
})(window, !1);

},{}],2:[function(require,module,exports){
var GTI = require("./internals/controller.js");

require("dom-ready")(function () {
    window.gti = new GTI().run();
}); 

},{"./internals/controller.js":3,"dom-ready":1}],3:[function(require,module,exports){
module.exports = function () {
    this.run = function () {
        /* @TODO esquema de módulos piratas */
    };
    return this;
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZG9tLXJlYWR5L2RvbS1yZWFkeS5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9pbnRlcm5hbHMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIERPTSBSZWFkeSB2MS4wLjZcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ub29yZGF3b2QvZG9tLXJlYWR5XG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDEzLTIwMTQgTm9vciBEYXdvZC5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVJcbiAqIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG47dmFyIGRvbVJlYWR5ID0gKGZ1bmN0aW9uKHdpbmRvdywgRkFMU0UpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBET0NVTUVOVCA9ICdkb2N1bWVudCcsXG4gICAgICBFTEVNRU5UID0gJ0VsZW1lbnQnLFxuICAgICAgRE9TQ1JPTEwgPSAnZG9TY3JvbGwnLFxuICAgICAgQ0FMTCA9ICdjYWxsJyxcbiAgICAgIERPTUNPTlRFTlRMT0FERUQgPSAnRE9NQ29udGVudExvYWRlZCcsXG4gICAgICBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJyxcbiAgICAgIExPQUQgPSAnbG9hZCcsXG4gICAgICBPTkxPQUQgPSAnb24nICsgTE9BRCxcbiAgICAgIEFEREVWRU5UTElTVEVORVIgPSAnYWRkRXZlbnRMaXN0ZW5lcicsXG4gICAgICBSRU1PVkVFVkVOVExJU1RFTkVSID0gJ3JlbW92ZUV2ZW50TGlzdGVuZXInLFxuICAgICAgQVRUQUNIRVZFTlQgPSAnYXR0YWNoRXZlbnQnLFxuICAgICAgREVUQUNIRVZFTlQgPSAnZGV0YWNoRXZlbnQnLFxuXG4gICAgICBkb2N1bWVudCA9IHdpbmRvd1tET0NVTUVOVF0sXG4gICAgICBkb21SZWFkeSA9IEZBTFNFLFxuICAgICAgd2luZG93T25Mb2FkLFxuICAgICAgY2FsbGJhY2tzTGlzdCA9IFtdLFxuXG4gICAgICAvLyBGaXJlIHRoZSBjYWxsYmFja3MgdGhhdCB3ZXJlIHF1ZXVlZC5cbiAgICAgIGZpcmVDYWxsYmFja3MgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICBpZighZG9tUmVhZHkpIHtcbiAgICAgICAgICBkb21SZWFkeSA9ICFGQUxTRTtcblxuICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgZG9jdW1lbnQsIGp1c3QgaW4gY2FzZS5cbiAgICAgICAgICBkb2N1bWVudCA9IHdpbmRvd1tET0NVTUVOVF07XG5cbiAgICAgICAgICAvLyBDYWxsIG9sZCBvbmxvYWQgaGFuZGxlciBmb3Igb2xkIGJyb3dzZXJzLlxuICAgICAgICAgIGlmKCdmdW5jdGlvbicgPT09IHR5cGVvZiB3aW5kb3dPbkxvYWQpXG4gICAgICAgICAgICB3aW5kb3dPbkxvYWQgPSB3aW5kb3dPbkxvYWRbQ0FMTF0od2luZG93LCBkb2N1bWVudCwgd2luZG93KTtcblxuICAgICAgICAgIC8vIENhbGwgdGhlIGxpc3Qgb2YgY2FsbGJhY2tzLCBlYWNoIGluIGl0cyBvd24gc2NvcGUuXG4gICAgICAgICAgLy8gSWYgYSBjYWxsYmFjayByZXR1cm5zIEZBTFNFLCBzdG9wIGZpcmluZyB0aGUgcmVzdCBvZiB0aGUgY2FsbGJhY2tzLlxuICAgICAgICAgIHdoaWxlKEZBTFNFICE9PSB3aW5kb3dPbkxvYWQgJiYgISEoY2FsbGJhY2sgPSBjYWxsYmFja3NMaXN0LnNoaWZ0KCkpKVxuICAgICAgICAgICAgd2luZG93T25Mb2FkID0gY2FsbGJhY2tbMF1bQ0FMTF0oY2FsbGJhY2tbMV0sIGRvY3VtZW50LCB3aW5kb3cpO1xuXG4gICAgICAgICAgLy8gR0MuXG4gICAgICAgICAgY2FsbGJhY2tzTGlzdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIFRyaWNrIGJ5IERpZWdvIFBlcmluaVxuICAgICAgLy8gaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0lFQ29udGVudExvYWRlZC9cbiAgICAgIHRyeVNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighZG9tUmVhZHkpXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvY3VtZW50W0RPQ1VNRU5UICsgRUxFTUVOVF1bRE9TQ1JPTExdKCdsZWZ0Jyk7XG4gICAgICAgICAgICBmaXJlQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0cnlTY3JvbGwsIDUwKTtcbiAgICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBNYWluIGhhbmRsZXIuXG4gICAgICBoYW5kbGVyID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgaWYoZG9tUmVhZHkpXG4gICAgICAgICAgLy8gRE9NIGFscmVhZHkgcmFuIG9uY2U7IGp1c3QgcnVuIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseS5cbiAgICAgICAgICBjYWxsYmFja1tDQUxMXSh0aGlzKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gV2hlbiBmaXJzdCBoYW5kbGVyIGlzIGFkZGVkLCBhdHRhY2ggdGhlIGNyb3NzLWJyb3dzZXIgRE9NIHJlYWR5IGhhbmRsZXIuXG4gICAgICAgICAgaWYoIWNhbGxiYWNrc0xpc3QubGVuZ3RoKVxuICAgICAgICAgICAgLy8gTWF0dXJlIGJyb3dzZXJzLlxuICAgICAgICAgICAgaWYoZG9jdW1lbnRbQURERVZFTlRMSVNURU5FUl0pXG4gICAgICAgICAgICAgIGRvY3VtZW50W0FEREVWRU5UTElTVEVORVJdKERPTUNPTlRFTlRMT0FERUQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50W1JFTU9WRUVWRU5UTElTVEVORVJdKERPTUNPTlRFTlRMT0FERUQsIGhhbmRsZXIsIEZBTFNFKTtcbiAgICAgICAgICAgICAgICBmaXJlQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAgIH0sIEZBTFNFKTtcblxuICAgICAgICAgICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIuXG4gICAgICAgICAgICBlbHNlIGlmKGRvY3VtZW50W0FUVEFDSEVWRU5UXSkge1xuICAgICAgICAgICAgICAvLyBJRSBzdXBwb3J0cyBvbnJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQuXG4gICAgICAgICAgICAgIGRvY3VtZW50W0FUVEFDSEVWRU5UXShPTlJFQURZU1RBVEVDSEFOR0UsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKCdjb21wbGV0ZScgPT09IGRvY3VtZW50LnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50W0RFVEFDSEVWRU5UXShPTlJFQURZU1RBVEVDSEFOR0UsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgZmlyZUNhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgLy8gVmVyeSByZWxpYWJsZSB3aGVuIG5vdCBpbnNpZGUgYSBmcmFtZS5cbiAgICAgICAgICAgICAgaWYoZG9jdW1lbnRbRE9DVU1FTlQgKyBFTEVNRU5UXVtET1NDUk9MTF0gJiYgd2luZG93ID09PSB3aW5kb3cudG9wKVxuICAgICAgICAgICAgICAgIHRyeVNjcm9sbCgpO1xuXG4gICAgICAgICAgICAvLyBPbGQgYnJvd3NlcnMuXG4gICAgICAgICAgICB9IGVsc2UgaWYod2luZG93W0FEREVWRU5UTElTVEVORVJdKVxuICAgICAgICAgICAgICB3aW5kb3dbQURERVZFTlRMSVNURU5FUl0oTE9BRCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2luZG93W1JFTU9WRUVWRU5UTElTVEVORVJdKExPQUQsIGhhbmRsZXIsIEZBTFNFKTtcbiAgICAgICAgICAgICAgICBmaXJlQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAgIH0sIEZBTFNFKTtcbiAgICAgICAgICAgIGVsc2UgaWYod2luZG93W0FUVEFDSEVWRU5UXSlcbiAgICAgICAgICAgICAgd2luZG93W0FUVEFDSEVWRU5UXShPTkxPQUQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvd1tERVRBQ0hFVkVOVF0oT05MT0FELCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBmaXJlQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBIaXN0b3JpYyBicm93c2Vycy5cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB3aW5kb3dPbkxvYWQgPSB3aW5kb3dbT05MT0FEXTtcbiAgICAgICAgICAgICAgd2luZG93W09OTE9BRF0gPSBmaXJlQ2FsbGJhY2tzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUXVldWUgdGhlIGNhbGxiYWNrIGFsb25nIHdpdGggaXRzIHNjb3BlLlxuICAgICAgICAgIGNhbGxiYWNrc0xpc3QucHVzaChbY2FsbGJhY2ssIHRoaXNdKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAvLyBFeHBvc2UgbWFpbiBoYW5kbGVyIHRvIGdsb2JhbCBzY29wZS5cbiAgcmV0dXJuIGhhbmRsZXI7XG59KSh3aW5kb3csICExKTtcbiIsInZhciBHVEkgPSByZXF1aXJlKFwiLi9pbnRlcm5hbHMvY29udHJvbGxlci5qc1wiKTtcblxucmVxdWlyZShcImRvbS1yZWFkeVwiKShmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93Lmd0aSA9IG5ldyBHVEkoKS5ydW4oKTtcbn0pOyBcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvKiBAVE9ETyBlc3F1ZW1hIGRlIG3Ds2R1bG9zIHBpcmF0YXMgKi9cbiAgICB9O1xuICAgIHJldHVybiB0aGlzO1xufTtcbiJdfQ==
