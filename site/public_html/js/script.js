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
     *  forEach(document.querySelectorAll('li'), function (index, value) { console.log(index, value); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk06XFxXb3JrXFx3b3JrXFx6enpfX19UZW1wbGF0ZVxcc2l0ZVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCIuL2Rldi9qcy9hcHAuanMiLCJNOi9Xb3JrL3dvcmsvenp6X19fVGVtcGxhdGUvc2l0ZS9kZXYvanMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qISMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgIGJ5IENsYXVkaXUgTGltYmFuICAgICAgICNcbiMgIGh0dHA6Ly9zb2Z1eHJvLmVsYW5jZS5jb20gICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiogQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICovXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgKiBBZGRpbmcgRm9udCBBd2Vzb21lIGFuZCBtb3N0IHVzZWQgZ29vZ2xlIGZvbnQgT3BlbiBTYW5zXG4gICAgICovXG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcblxuXG4gICAgLyoqXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcbiAgICAgKiBhbmQgYSBzdGFuZGFyZCBodG1sIHN0cnVjdHVyZSAobmF2ID4gYnV0dG9uICsgYSpuKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAqIEdvIHVwIChmcm9tIHRoZSBmb290ZXIpXG4gICAgICovXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXIgW2RhdGEtcm9sZT1cImdvX3VwXCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsnc2Nyb2xsVG9wJzogJzBweCd9LCA1MDApO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXR0aW5nIHRoZSBvZmZzZXQgb2YgYSBET00gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgICAgdXRpbC5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvbSBlbGVtZW50IChub3QganF1ZXJ5IGVsZW1lbnQpXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcclxuICAgICAqL1xyXG4gICAgb2Zmc2V0IDogZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgdmFyIHRvcCAgPSAwLFxyXG4gICAgICAgICAgICBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYob2JqLm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICB0b3AgICs9IG9iai5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xyXG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEFkZGluZyBkeW5hbWljYWxseSBhIG5ldyBleHRlcm5hbCBzdHlsZSBpbnRvIHRoZSBodG1sXHJcbiAgICAgKlxyXG4gICAgICogIyMjIEV4YW1wbGVzOlxyXG4gICAgICpcclxuICAgICAqICAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMC4zL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycpO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGUgYWN0dWFsIHVybCAobG9jYWwgb3IgaHR0cClcclxuICAgICAqL1xyXG4gICAgZXh0cmFfc3R5bGUgOiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICB2YXIgbGlua19jc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHJcbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcclxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGxpbmtfY3NzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIExvb3BpbmcgdGhyb3VnaCBET00gTm9kZUxpc3RcclxuICAgICAqXHJcbiAgICAgKiAjIyMgRXhhbXBsZXM6XHJcbiAgICAgKlxyXG4gICAgICogIGZvckVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkgeyBjb25zb2xlLmxvZyhpbmRleCwgdmFsdWUpOyB9KTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5LCBGdW5jdGlvbiwgU2NvcGV9XHJcbiAgICAgKi9cclxuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07Il19
