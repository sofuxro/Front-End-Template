(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dev/js/app.js":[function(require,module,exports){
/*!#############################
#                              #
#      by Claudiu Limban       #
#  http://sofuxro.elance.com   #
#                              #
################################*/


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
    document.querySelector('[data-role="main_menu"] button').addEventListener('click', function(e) {
        this.parentNode.classList.toggle('active');
        e.preventDefault();
    });


    /**
    * Go up (from the footer)
     */

    document.querySelector('footer [data-role="go_up"]').addEventListener('click', function(e) {
        $('html, body').animate({'scrollTop': '0px'}, 500);
        e.preventDefault();
    });

});
},{"./util.js":"M:\\Work\\work\\zzz___Template\\site + less\\dev\\js\\util.js"}],"M:\\Work\\work\\zzz___Template\\site + less\\dev\\js\\util.js":[function(require,module,exports){
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
    }
};
},{}]},{},["./dev/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk06XFxXb3JrXFx3b3JrXFx6enpfX19UZW1wbGF0ZVxcc2l0ZSArIGxlc3NcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9kZXYvanMvYXBwLmpzIiwiTTovV29yay93b3JrL3p6el9fX1RlbXBsYXRlL3NpdGUgKyBsZXNzL2Rldi9qcy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgYnkgQ2xhdWRpdSBMaW1iYW4gICAgICAgI1xuIyAgaHR0cDovL3NvZnV4cm8uZWxhbmNlLmNvbSAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbi8qKlxuKiBBIHV0aWxpdHkgb2JqZWN0IGhlbHBpbmcgd2l0aCB2YW5pbGxhIGphdmFzY3JpcHQgKHRyeWluZyB0byBtaW1pYyBqUXVlcnkpXG4gKi9cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cblxuLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKiBXaGVyZSBldmVyeXRoaW5nIGhhcHBlbnNcbiAqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAqIEFkZGluZyBGb250IEF3ZXNvbWUgYW5kIG1vc3QgdXNlZCBnb29nbGUgZm9udCBPcGVuIFNhbnNcbiAgICAgKi9cbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMC4zL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycpO1xuICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2FucycpO1xuXG5cbiAgICAvKipcbiAgICAqIE1lbnUgc2hvd2luZyAvIGhpZGRpbmcgb24gc21hbGwgc2NyZWVucyAoPDc2OHB4KSAtIGluIGFkZGl0aW9uIHdpdGggdGhlIGNzc1xuICAgICAqIGFuZCBhIHN0YW5kYXJkIGh0bWwgc3RydWN0dXJlIChuYXYgPiBidXR0b24gKyBhKm4pXG4gICAgICovXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcm9sZT1cIm1haW5fbWVudVwiXSBidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICogR28gdXAgKGZyb20gdGhlIGZvb3RlcilcbiAgICAgKi9cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogIyMjIEV4YW1wbGVzOlxyXG4gICAgICpcclxuICAgICAqICAgICB1dGlsLm9mZnNldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXlfZWxlbWVudCcpKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gYSB0b3AgLyBsZWZ0IG9iamVjdFxyXG4gICAgICovXHJcbiAgICBvZmZzZXQgOiBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICB2YXIgdG9wICA9IDAsXHJcbiAgICAgICAgICAgIGxlZnQgPSAwO1xyXG5cclxuICAgICAgICBpZihvYmoub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIHRvcCAgKz0gb2JqLm9mZnNldFRvcDtcclxuICAgICAgICAgICAgICAgIGxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKG9iaiA9IG9iai5vZmZzZXRQYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogQWRkaW5nIGR5bmFtaWNhbGx5IGEgbmV3IGV4dGVybmFsIHN0eWxlIGludG8gdGhlIGh0bWxcclxuICAgICAqXHJcbiAgICAgKiAjIyMgRXhhbXBsZXM6XHJcbiAgICAgKlxyXG4gICAgICogICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZSBhY3R1YWwgdXJsIChsb2NhbCBvciBodHRwKVxyXG4gICAgICovXHJcbiAgICBleHRyYV9zdHlsZSA6IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHZhciBsaW5rX2NzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cclxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xyXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua19jc3MpO1xyXG4gICAgfVxyXG59OyJdfQ==
