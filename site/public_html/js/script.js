(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dev/js/app.js":[function(require,module,exports){
/*!###############################
#                                #
#      by Claudiu Limban         #
# http://www.teranacreative.com  #
#                                #
##################################*/


'use strict';


/**
* A utility object helping with vanilla javascript (trying to mimic jQuery)
 */
var util = require('./util.js');


/** =======================================================================================
* Where everything happens
 */
document.addEventListener("DOMContentLoaded", function() {

    /**
    * Adding Font Awesome and most used google font Open Sans
     */
    util.extra_style('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');
    util.extra_style('http://fonts.googleapis.com/css?family=Open+Sans');


    /**
    * Menu showing / hidding on small screens (<768px) - in addition with the css
     * and a standard html structure (nav > button + a*n)
     */
    if(ocument.querySelector('[data-role="main_menu"] button')) {
        document.querySelector('[data-role="main_menu"] button').addEventListener('click', function(e) {
            this.parentNode.classList.toggle('active');
            e.preventDefault();
        });
    }


    /**
    * Go up (from the footer)
     */
    if(document.querySelector('footer [data-role="go_up"]')) {
        document.querySelector('footer [data-role="go_up"]').addEventListener('click', function(e) {
            $('html, body').animate({'scrollTop': '0px'}, 500);
            e.preventDefault();
        });
    }

});
},{"./util.js":"M:\\Work\\work\\zzz___Template\\site\\dev\\js\\util.js"}],"M:\\Work\\work\\zzz___Template\\site\\dev\\js\\util.js":[function(require,module,exports){
'use strict';

module.exports = {
    /**
    * Getting the offset of a DOM element
     *
     * ### Examples:
     *
     *     util.offset(document.querySelector('.my_element'));
     *
     * @param {Object} dom element (not jquery element)
     * @return {Object} a top / left object
     */
    offset : function(obj) {
        var top  = 0,
            left = 0;

        if(obj.offsetParent) {
            do {
                top  += obj.offsetTop;
                left += obj.offsetLeft;
            } while (obj = obj.offsetParent);
        }
        return { top: top, left: left };
    },


    /**
    * Adding dynamically a new external style into the html
     *
     * ### Examples:
     *
     *     util.extra_style('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');
     *
     * @param {String} the actual url (local or http)
     */
    extra_style : function(url) {
        var link_css = document.createElement("link");

        link_css.setAttribute("rel", "stylesheet");
        link_css.setAttribute("href", url);
        document.getElementsByTagName("head")[0].appendChild(link_css);
    },


    /**
    * Looping through DOM NodeList
     *
     * ### Examples:
     *
     *  utils.forEach(document.querySelectorAll('li'), function (index, element) { console.log(index, element); });
     *
     * @param {Array, Function, Scope}
     */
    forEach: function (array, callback, scope) {
        for (var i = 0, len = array.length; i < len; i++) {
            callback.call(scope, i, array[i]);
        }
    },


    /**
    * AJAX
     *
     * ### Examples:
     *
     *      utils.ajax.get({
     *          url:     '/test.php',
     *          data:    {foo: 'bar'},
     *          success: function() { // what to do on success; },
     *          error:   function() { // what to do on error; }
     *      });
     */
    ajax: function() {
        var http_req = new XMLHttpRequest(),
            get_fn   = null,
            post_fn  = null,
            send_fn  = null;

        send_fn = function(url, data, method, success_fn, error_fn, sync) {
            var x = http_req;
            x.open(method, url, sync);
            x.onreadystatechange = function() {
                if (x.readyState == 4) {
                    if(x.status === 200) {
                        success_fn(x.responseText)
                    } else {
                        error_fn();
                    }
                }
            };
            if(method === 'POST') {
                x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            x.send(data);
        };

        get_fn = function(obj) {
            var query = [];

            for(var key in obj.data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
            }
            //              url              data  method    success_fn     error_fn        sync
            send_fn(obj.url + '?' + query.join('&'), null, 'GET', obj.success, obj.error, obj.sync);
        };

        post_fn = function(obj) {
            var query = [];

            for(var key in obj.data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
            }
            //    url         data         method    success_fn     error_fn        sync
            send_fn(obj.url, query.join('&'), 'POST', obj.success, obj.error, obj.sync);
        };

        return {get: get_fn, post: post_fn};
    }
};
},{}]},{},["./dev/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiZGV2XFxqc1xcYXBwLmpzIiwiZGV2XFxqc1xcdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgIGJ5IENsYXVkaXUgTGltYmFuICAgICAgICAgI1xuIyBodHRwOi8vd3d3LnRlcmFuYWNyZWF0aXZlLmNvbSAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbi8qKlxuKiBBIHV0aWxpdHkgb2JqZWN0IGhlbHBpbmcgd2l0aCB2YW5pbGxhIGphdmFzY3JpcHQgKHRyeWluZyB0byBtaW1pYyBqUXVlcnkpXG4gKi9cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cblxuLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKiBXaGVyZSBldmVyeXRoaW5nIGhhcHBlbnNcbiAqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAqIEFkZGluZyBGb250IEF3ZXNvbWUgYW5kIG1vc3QgdXNlZCBnb29nbGUgZm9udCBPcGVuIFNhbnNcbiAgICAgKi9cbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMC4zL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycpO1xuICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2FucycpO1xuXG5cbiAgICAvKipcbiAgICAqIE1lbnUgc2hvd2luZyAvIGhpZGRpbmcgb24gc21hbGwgc2NyZWVucyAoPDc2OHB4KSAtIGluIGFkZGl0aW9uIHdpdGggdGhlIGNzc1xuICAgICAqIGFuZCBhIHN0YW5kYXJkIGh0bWwgc3RydWN0dXJlIChuYXYgPiBidXR0b24gKyBhKm4pXG4gICAgICovXG4gICAgaWYob2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yb2xlPVwibWFpbl9tZW51XCJdIGJ1dHRvbicpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBHbyB1cCAoZnJvbSB0aGUgZm9vdGVyKVxuICAgICAqL1xuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXIgW2RhdGEtcm9sZT1cImdvX3VwXCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6ICcwcHgnfSwgNTAwKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBHZXR0aW5nIHRoZSBvZmZzZXQgb2YgYSBET00gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgICAgdXRpbC5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvbSBlbGVtZW50IChub3QganF1ZXJ5IGVsZW1lbnQpXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcclxuICAgICAqL1xyXG4gICAgb2Zmc2V0IDogZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgdmFyIHRvcCAgPSAwLFxyXG4gICAgICAgICAgICBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYob2JqLm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICB0b3AgICs9IG9iai5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xyXG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBZGRpbmcgZHluYW1pY2FsbHkgYSBuZXcgZXh0ZXJuYWwgc3R5bGUgaW50byB0aGUgaHRtbFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlIGFjdHVhbCB1cmwgKGxvY2FsIG9yIGh0dHApXHJcbiAgICAgKi9cclxuICAgIGV4dHJhX3N0eWxlIDogZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgdmFyIGxpbmtfY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblxyXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIik7XHJcbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1cmwpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rX2Nzcyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogTG9vcGluZyB0aHJvdWdoIERPTSBOb2RlTGlzdFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgdXRpbHMuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHsgY29uc29sZS5sb2coaW5kZXgsIGVsZW1lbnQpOyB9KTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5LCBGdW5jdGlvbiwgU2NvcGV9XHJcbiAgICAgKi9cclxuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogQUpBWFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgICAgIHV0aWxzLmFqYXguZ2V0KHtcclxuICAgICAqICAgICAgICAgIHVybDogICAgICcvdGVzdC5waHAnLFxyXG4gICAgICogICAgICAgICAgZGF0YTogICAge2ZvbzogJ2Jhcid9LFxyXG4gICAgICogICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7IC8vIHdoYXQgdG8gZG8gb24gc3VjY2VzczsgfSxcclxuICAgICAqICAgICAgICAgIGVycm9yOiAgIGZ1bmN0aW9uKCkgeyAvLyB3aGF0IHRvIGRvIG9uIGVycm9yOyB9XHJcbiAgICAgKiAgICAgIH0pO1xyXG4gICAgICovXHJcbiAgICBhamF4OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaHR0cF9yZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSxcclxuICAgICAgICAgICAgZ2V0X2ZuICAgPSBudWxsLFxyXG4gICAgICAgICAgICBwb3N0X2ZuICA9IG51bGwsXHJcbiAgICAgICAgICAgIHNlbmRfZm4gID0gbnVsbDtcclxuXHJcbiAgICAgICAgc2VuZF9mbiA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgbWV0aG9kLCBzdWNjZXNzX2ZuLCBlcnJvcl9mbiwgc3luYykge1xyXG4gICAgICAgICAgICB2YXIgeCA9IGh0dHBfcmVxO1xyXG4gICAgICAgICAgICB4Lm9wZW4obWV0aG9kLCB1cmwsIHN5bmMpO1xyXG4gICAgICAgICAgICB4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoeC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzX2ZuKHgucmVzcG9uc2VUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yX2ZuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZihtZXRob2QgPT09ICdQT1NUJykge1xyXG4gICAgICAgICAgICAgICAgeC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeC5zZW5kKGRhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGdldF9mbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iai5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgICBkYXRhICBtZXRob2QgICAgc3VjY2Vzc19mbiAgICAgZXJyb3JfZm4gICAgICAgIHN5bmNcclxuICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsICsgJz8nICsgcXVlcnkuam9pbignJicpLCBudWxsLCAnR0VUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvciwgb2JqLnN5bmMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHBvc3RfZm4gPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBvYmouZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgdXJsICAgICAgICAgZGF0YSAgICAgICAgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mbiAgICAgICAgc3luY1xyXG4gICAgICAgICAgICBzZW5kX2ZuKG9iai51cmwsIHF1ZXJ5LmpvaW4oJyYnKSwgJ1BPU1QnLCBvYmouc3VjY2Vzcywgb2JqLmVycm9yLCBvYmouc3luYyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtnZXQ6IGdldF9mbiwgcG9zdDogcG9zdF9mbn07XHJcbiAgICB9XHJcbn07Il19
