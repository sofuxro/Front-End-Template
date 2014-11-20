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
    }
};
},{}]},{},["./dev/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk06XFxXb3JrXFx3b3JrXFx6enpfX19UZW1wbGF0ZVxcc2l0ZVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCIuL2Rldi9qcy9hcHAuanMiLCJNOi9Xb3JrL3dvcmsvenp6X19fVGVtcGxhdGUvc2l0ZS9kZXYvanMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qISMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgIGJ5IENsYXVkaXUgTGltYmFuICAgICAgICNcbiMgIGh0dHA6Ly9zb2Z1eHJvLmVsYW5jZS5jb20gICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiogQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICovXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgKiBBZGRpbmcgRm9udCBBd2Vzb21lIGFuZCBtb3N0IHVzZWQgZ29vZ2xlIGZvbnQgT3BlbiBTYW5zXG4gICAgICovXG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcblxuXG4gICAgLyoqXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcbiAgICAgKiBhbmQgYSBzdGFuZGFyZCBodG1sIHN0cnVjdHVyZSAobmF2ID4gYnV0dG9uICsgYSpuKVxuICAgICAqL1xuICAgIGlmKG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcm9sZT1cIm1haW5fbWVudVwiXSBidXR0b24nKSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yb2xlPVwibWFpbl9tZW51XCJdIGJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICogR28gdXAgKGZyb20gdGhlIGZvb3RlcilcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXIgW2RhdGEtcm9sZT1cImdvX3VwXCJdJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyIFtkYXRhLXJvbGU9XCJnb191cFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogIyMjIEV4YW1wbGVzOlxyXG4gICAgICpcclxuICAgICAqICAgICB1dGlsLm9mZnNldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXlfZWxlbWVudCcpKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gYSB0b3AgLyBsZWZ0IG9iamVjdFxyXG4gICAgICovXHJcbiAgICBvZmZzZXQgOiBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICB2YXIgdG9wICA9IDAsXHJcbiAgICAgICAgICAgIGxlZnQgPSAwO1xyXG5cclxuICAgICAgICBpZihvYmoub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIHRvcCAgKz0gb2JqLm9mZnNldFRvcDtcclxuICAgICAgICAgICAgICAgIGxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKG9iaiA9IG9iai5vZmZzZXRQYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogQWRkaW5nIGR5bmFtaWNhbGx5IGEgbmV3IGV4dGVybmFsIHN0eWxlIGludG8gdGhlIGh0bWxcclxuICAgICAqXHJcbiAgICAgKiAjIyMgRXhhbXBsZXM6XHJcbiAgICAgKlxyXG4gICAgICogICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZSBhY3R1YWwgdXJsIChsb2NhbCBvciBodHRwKVxyXG4gICAgICovXHJcbiAgICBleHRyYV9zdHlsZSA6IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHZhciBsaW5rX2NzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cclxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xyXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua19jc3MpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogTG9vcGluZyB0aHJvdWdoIERPTSBOb2RlTGlzdFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgdXRpbHMuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHsgY29uc29sZS5sb2coaW5kZXgsIGVsZW1lbnQpOyB9KTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5LCBGdW5jdGlvbiwgU2NvcGV9XHJcbiAgICAgKi9cclxuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07Il19
