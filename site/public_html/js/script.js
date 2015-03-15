(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var utils  = require('./inc/utils.js'),
    header = require('./inc/header.js');


/** =======================================================================================
* Where everything happens
 */
document.addEventListener("DOMContentLoaded", function() {

    /**
    * Header functionality
     */
    header();


    /**
    * Scroll functionality
     *
     * Controlling:
     *      - menu by adding active when we scroll (give a semi-transparent background color)
     *      - paralax effect on the body background-image
     */
    window.onscroll = function (event) {
        /* HEADER control (transparent / gray background) */
        if((document.documentElement.scrollTop || document.body.scrollTop) > 100) {
            document.body.querySelector('body > header').classList.add('active');
        } else {
            document.body.querySelector('body > header').classList.remove('active');
        }

        /* PARALAX effect */
        document.body.style.backgroundPosition = '0px ' + window.pageYOffset / 3 + 'px';
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
},{"./inc/header.js":2,"./inc/utils.js":3}],2:[function(require,module,exports){
'use strict';


var utils  = require('./utils.js'),
    DOM    = require('./variables.js');


module.exports = function() {
    /**
    * Adding Font Awesome and most used google font Open Sans
     */
    utils.extra_style('http://netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');
    utils.extra_style('http://fonts.googleapis.com/css?family=Open+Sans&subset=latin-ext');



    /**
    * Menu showing / hidding on small screens (<768px) - in addition with the css
     * and a standard html structure (nav > button + a*n)
     */
    if(document.querySelector('[data-role="main_menu"] button')) {
        document.querySelector('[data-role="main_menu"] button').addEventListener('click', function(e) {
            this.parentNode.classList.toggle('active');
            e.preventDefault();
        });
    }



    /**
    * Search in the header
     */
    if(DOM.html.header_search) {
        // toggle animation
        document.querySelector('.js_search').addEventListener('click', function(e) {
            utils.toggleSlide(DOM.html.header_search);
            DOM.html.header_search.querySelector('input').focus();
            e.preventDefault();
        });

        // add the correct path to the search form based on the input
        DOM.html.header_search.addEventListener('submit', function(e) {
            var form = this;

            // creating the action path
            form.action = DOM.html.url_search + form.querySelector('input[type="text"]').value;

            // letting the form do its natural job
            return true;
        });

        /**
        * Close on click (just for js_search_form for now)
         */
        document.querySelector('body').addEventListener('click', function(e) {
            var el              = e.target,
                parent          = el,
                should_we_close = false;

            while(parent && parent != document) {
                if(parent.classList.contains('search_form') || parent.classList.contains('js_search')) {
                    should_we_close = true;
                    break;
                }

                parent = parent.parentNode;
            }

            if(!should_we_close) {
                utils.toggleSlide(DOM.html.header_search, 'close_only');
                DOM.html.header_search.querySelector('input').value = '';
            }
        });
    }
};
},{"./utils.js":3,"./variables.js":4}],3:[function(require,module,exports){
'use strict';

module.exports = {
    /**
    * Getting the offset of a DOM element
     *
     * ### Examples:
     *
     *     utils.offset(document.querySelector('.my_element'));
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
     *     utils.extra_style('http://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
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
     *  utils.forEach(document.querySelectorAll('li'), function(index, element) { console.log(index, element); });
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
     *
     * TODO
     *      DELETE and UPDATE (methods)
     *      send TYPE
     *      return TYPE
     */
    ajax: function() {
        var http_req = new XMLHttpRequest(),
            get_fn   = null,
            post_fn  = null,
            send_fn  = null;

        send_fn = function(url, data, method, success_fn, error_fn) {
            var x = http_req;
            x.open(method, url);
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
            //              url              data  method    success_fn     error_fn
            send_fn(obj.url + '?' + query.join('&'), null, 'GET', obj.success, obj.error);
        };

        post_fn = function(obj) {
            var query = [];

            for(var key in obj.data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
            }
            //    url         data         method    success_fn     error_fn
            send_fn(obj.url, query.join('&'), 'POST', obj.success, obj.error);
        };

        return {get: get_fn, post: post_fn};
    },


    /**
    * Escapes html characters
     *
     * ### Examples:
     *
     *     utils.escapeHtml('This is my string ' " > < will be removed');
     *
     * @param  {String} html string to be escaped
     * @return {String} escaped html
     */
    escapeHtml: function(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;'
        };

        return text.replace(/[&<>"'/]/g, function(m) { return map[m]; });
    },


    /**
    * urlencode equivalent from PHP
     *
     * @param  {String} - string to be encoded
     * @return {String} - the encoded string
     */
    urlencode : function(string) {
        string = (string + '').toString();

        return encodeURI(string)
            .replace(/!/g,   '%21')
            .replace(/'/g,   '%27')
            .replace(/\(/g,  '%28')
            .replace(/\)/g,  '%29')
            .replace(/\*/g,  '%2A')
            .replace(/%20/g, '+');
    },


    /**
    * getHeight - for elements with display:none
     *
     * @param  {Object} - dom element (not jquery element)
     * @return {Number} - the wanted height
     */
    getHeight: function(el) {
        var el_style      = window.getComputedStyle(el),
            el_display    = el_style.display,
            el_position   = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

            wanted_height = 0;


        // if its not hidden we just return normal height
        if(el_display !== 'none' && el_max_height !== '0') {
            return el.offsetHeight;
        }

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        el.style.position   = 'absolute';
        el.style.visibility = 'hidden';
        el.style.display    = 'block';

        wanted_height       = el.offsetHeight;

        // reverting to the original values
        el.style.display    = el_display;
        el.style.position   = el_position;
        el.style.visibility = el_visibility;


        return wanted_height;
    },


    /**
    * toggleSlide mimics the jQuery version of slideDown and slideUp
     * all in one function comparing the max-heigth to 0
     *
     * @param  {Object} - dom element (not jquery element)
     *         {String} - 'close_only'
     */
    toggleSlide: function(el, option) {
        var utils         = this,
            el_max_height = 0;

        if(el.getAttribute('data-max-height')) {
            // we've already used this before, so everything is setup
            if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
                if(option !== 'close_only') {
                    el.style.maxHeight = el.getAttribute('data-max-height');
                }
            } else {
                if(option !== 'open_only') {
                    el.style.maxHeight = '0';
                }
            }
        } else {
            if(option !== 'close_only') {
                el_max_height                  = utils.getHeight(el) + 'px';
                el.style['transition']         = 'max-height 0.5s ease-in-out';
                el.style.overflowY             = 'hidden';
                el.style.maxHeight             = '0';
                el.setAttribute('data-max-height', el_max_height);
                el.style.display               = 'block';

                // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
                setTimeout(function() {
                    el.style.maxHeight = el_max_height;
                }, 10);
            }
        }
    }
};
},{}],4:[function(require,module,exports){
'use strict';


module.exports = {
    html: {
        header_search: document.querySelector('.search_form')
    }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiZGV2XFxqc1xcYXBwLmpzIiwiZGV2XFxqc1xcaW5jXFxoZWFkZXIuanMiLCJkZXZcXGpzXFxpbmNcXHV0aWxzLmpzIiwiZGV2XFxqc1xcaW5jXFx2YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgIGJ5IENsYXVkaXUgTGltYmFuICAgICAgICAgI1xuIyBodHRwOi8vd3d3LnRlcmFuYWNyZWF0aXZlLmNvbSAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbi8qKlxuKiBBIHV0aWxpdHkgb2JqZWN0IGhlbHBpbmcgd2l0aCB2YW5pbGxhIGphdmFzY3JpcHQgKHRyeWluZyB0byBtaW1pYyBqUXVlcnkpXG4gKi9cbnZhciB1dGlscyAgPSByZXF1aXJlKCcuL2luYy91dGlscy5qcycpLFxuICAgIGhlYWRlciA9IHJlcXVpcmUoJy4vaW5jL2hlYWRlci5qcycpO1xuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgKiBIZWFkZXIgZnVuY3Rpb25hbGl0eVxuICAgICAqL1xuICAgIGhlYWRlcigpO1xuXG5cbiAgICAvKipcbiAgICAqIFNjcm9sbCBmdW5jdGlvbmFsaXR5XG4gICAgICpcbiAgICAgKiBDb250cm9sbGluZzpcbiAgICAgKiAgICAgIC0gbWVudSBieSBhZGRpbmcgYWN0aXZlIHdoZW4gd2Ugc2Nyb2xsIChnaXZlIGEgc2VtaS10cmFuc3BhcmVudCBiYWNrZ3JvdW5kIGNvbG9yKVxuICAgICAqICAgICAgLSBwYXJhbGF4IGVmZmVjdCBvbiB0aGUgYm9keSBiYWNrZ3JvdW5kLWltYWdlXG4gICAgICovXG4gICAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8qIEhFQURFUiBjb250cm9sICh0cmFuc3BhcmVudCAvIGdyYXkgYmFja2dyb3VuZCkgKi9cbiAgICAgICAgaWYoKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApID4gMTAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgPiBoZWFkZXInKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignYm9keSA+IGhlYWRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogUEFSQUxBWCBlZmZlY3QgKi9cbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnMHB4ICcgKyB3aW5kb3cucGFnZVlPZmZzZXQgLyAzICsgJ3B4JztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICogR28gdXAgKGZyb20gdGhlIGZvb3RlcilcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXIgW2RhdGEtcm9sZT1cImdvX3VwXCJdJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyIFtkYXRhLXJvbGU9XCJnb191cFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciB1dGlscyAgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyksXHJcbiAgICBET00gICAgPSByZXF1aXJlKCcuL3ZhcmlhYmxlcy5qcycpO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvKipcclxuICAgICogQWRkaW5nIEZvbnQgQXdlc29tZSBhbmQgbW9zdCB1c2VkIGdvb2dsZSBmb250IE9wZW4gU2Fuc1xyXG4gICAgICovXHJcbiAgICB1dGlscy5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjMuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcclxuICAgIHV0aWxzLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMmc3Vic2V0PWxhdGluLWV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIE1lbnUgc2hvd2luZyAvIGhpZGRpbmcgb24gc21hbGwgc2NyZWVucyAoPDc2OHB4KSAtIGluIGFkZGl0aW9uIHdpdGggdGhlIGNzc1xyXG4gICAgICogYW5kIGEgc3RhbmRhcmQgaHRtbCBzdHJ1Y3R1cmUgKG5hdiA+IGJ1dHRvbiArIGEqbilcclxuICAgICAqL1xyXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcm9sZT1cIm1haW5fbWVudVwiXSBidXR0b24nKSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFNlYXJjaCBpbiB0aGUgaGVhZGVyXHJcbiAgICAgKi9cclxuICAgIGlmKERPTS5odG1sLmhlYWRlcl9zZWFyY2gpIHtcclxuICAgICAgICAvLyB0b2dnbGUgYW5pbWF0aW9uXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX3NlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB1dGlscy50b2dnbGVTbGlkZShET00uaHRtbC5oZWFkZXJfc2VhcmNoKTtcclxuICAgICAgICAgICAgRE9NLmh0bWwuaGVhZGVyX3NlYXJjaC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSBjb3JyZWN0IHBhdGggdG8gdGhlIHNlYXJjaCBmb3JtIGJhc2VkIG9uIHRoZSBpbnB1dFxyXG4gICAgICAgIERPTS5odG1sLmhlYWRlcl9zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGluZyB0aGUgYWN0aW9uIHBhdGhcclxuICAgICAgICAgICAgZm9ybS5hY3Rpb24gPSBET00uaHRtbC51cmxfc2VhcmNoICsgZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgLy8gbGV0dGluZyB0aGUgZm9ybSBkbyBpdHMgbmF0dXJhbCBqb2JcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogQ2xvc2Ugb24gY2xpY2sgKGp1c3QgZm9yIGpzX3NlYXJjaF9mb3JtIGZvciBub3cpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgZWwgICAgICAgICAgICAgID0gZS50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgICAgICAgICAgPSBlbCxcclxuICAgICAgICAgICAgICAgIHNob3VsZF93ZV9jbG9zZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUocGFyZW50ICYmIHBhcmVudCAhPSBkb2N1bWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYocGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnc2VhcmNoX2Zvcm0nKSB8fCBwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc19zZWFyY2gnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZF93ZV9jbG9zZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFzaG91bGRfd2VfY2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnRvZ2dsZVNsaWRlKERPTS5odG1sLmhlYWRlcl9zZWFyY2gsICdjbG9zZV9vbmx5Jyk7XHJcbiAgICAgICAgICAgICAgICBET00uaHRtbC5oZWFkZXJfc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogIyMjIEV4YW1wbGVzOlxyXG4gICAgICpcclxuICAgICAqICAgICB1dGlscy5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvbSBlbGVtZW50IChub3QganF1ZXJ5IGVsZW1lbnQpXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcclxuICAgICAqL1xyXG4gICAgb2Zmc2V0IDogZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgdmFyIHRvcCAgPSAwLFxyXG4gICAgICAgICAgICBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYob2JqLm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICB0b3AgICs9IG9iai5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xyXG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBBZGRpbmcgZHluYW1pY2FsbHkgYSBuZXcgZXh0ZXJuYWwgc3R5bGUgaW50byB0aGUgaHRtbFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgICAgdXRpbHMuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4yLjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZSBhY3R1YWwgdXJsIChsb2NhbCBvciBodHRwKVxyXG4gICAgICovXHJcbiAgICBleHRyYV9zdHlsZSA6IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHZhciBsaW5rX2NzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cclxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xyXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua19jc3MpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIExvb3BpbmcgdGhyb3VnaCBET00gTm9kZUxpc3RcclxuICAgICAqXHJcbiAgICAgKiAjIyMgRXhhbXBsZXM6XHJcbiAgICAgKlxyXG4gICAgICogIHV0aWxzLmZvckVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKSwgZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHsgY29uc29sZS5sb2coaW5kZXgsIGVsZW1lbnQpOyB9KTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5LCBGdW5jdGlvbiwgU2NvcGV9XHJcbiAgICAgKi9cclxuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogQUpBWFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgICAgIHV0aWxzLmFqYXguZ2V0KHtcclxuICAgICAqICAgICAgICAgIHVybDogICAgICcvdGVzdC5waHAnLFxyXG4gICAgICogICAgICAgICAgZGF0YTogICAge2ZvbzogJ2Jhcid9LFxyXG4gICAgICogICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7IC8vIHdoYXQgdG8gZG8gb24gc3VjY2VzczsgfSxcclxuICAgICAqICAgICAgICAgIGVycm9yOiAgIGZ1bmN0aW9uKCkgeyAvLyB3aGF0IHRvIGRvIG9uIGVycm9yOyB9XHJcbiAgICAgKiAgICAgIH0pO1xyXG4gICAgICpcclxuICAgICAqIFRPRE9cclxuICAgICAqICAgICAgREVMRVRFIGFuZCBVUERBVEUgKG1ldGhvZHMpXHJcbiAgICAgKiAgICAgIHNlbmQgVFlQRVxyXG4gICAgICogICAgICByZXR1cm4gVFlQRVxyXG4gICAgICovXHJcbiAgICBhamF4OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaHR0cF9yZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSxcclxuICAgICAgICAgICAgZ2V0X2ZuICAgPSBudWxsLFxyXG4gICAgICAgICAgICBwb3N0X2ZuICA9IG51bGwsXHJcbiAgICAgICAgICAgIHNlbmRfZm4gID0gbnVsbDtcclxuXHJcbiAgICAgICAgc2VuZF9mbiA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgbWV0aG9kLCBzdWNjZXNzX2ZuLCBlcnJvcl9mbikge1xyXG4gICAgICAgICAgICB2YXIgeCA9IGh0dHBfcmVxO1xyXG4gICAgICAgICAgICB4Lm9wZW4obWV0aG9kLCB1cmwpO1xyXG4gICAgICAgICAgICB4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoeC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzX2ZuKHgucmVzcG9uc2VUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yX2ZuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZihtZXRob2QgPT09ICdQT1NUJykge1xyXG4gICAgICAgICAgICAgICAgeC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeC5zZW5kKGRhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGdldF9mbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iai5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgICBkYXRhICBtZXRob2QgICAgc3VjY2Vzc19mbiAgICAgZXJyb3JfZm5cclxuICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsICsgJz8nICsgcXVlcnkuam9pbignJicpLCBudWxsLCAnR0VUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcG9zdF9mbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iai5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB1cmwgICAgICAgICBkYXRhICAgICAgICAgbWV0aG9kICAgIHN1Y2Nlc3NfZm4gICAgIGVycm9yX2ZuXHJcbiAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCwgcXVlcnkuam9pbignJicpLCAnUE9TVCcsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7Z2V0OiBnZXRfZm4sIHBvc3Q6IHBvc3RfZm59O1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEVzY2FwZXMgaHRtbCBjaGFyYWN0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogIyMjIEV4YW1wbGVzOlxyXG4gICAgICpcclxuICAgICAqICAgICB1dGlscy5lc2NhcGVIdG1sKCdUaGlzIGlzIG15IHN0cmluZyAnIFwiID4gPCB3aWxsIGJlIHJlbW92ZWQnKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGh0bWwgc3RyaW5nIHRvIGJlIGVzY2FwZWRcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZXNjYXBlZCBodG1sXHJcbiAgICAgKi9cclxuICAgIGVzY2FwZUh0bWw6IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICB2YXIgbWFwID0ge1xyXG4gICAgICAgICAgICAnJic6ICcmYW1wOycsXHJcbiAgICAgICAgICAgICc8JzogJyZsdDsnLFxyXG4gICAgICAgICAgICAnPic6ICcmZ3Q7JyxcclxuICAgICAgICAgICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICAgICAgICAgIFwiJ1wiOiAnJiN4Mjc7JyxcclxuICAgICAgICAgICAgXCIvXCI6ICcmI3gyRjsnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvWyY8PlwiJy9dL2csIGZ1bmN0aW9uKG0pIHsgcmV0dXJuIG1hcFttXTsgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogdXJsZW5jb2RlIGVxdWl2YWxlbnQgZnJvbSBQSFBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IC0gc3RyaW5nIHRvIGJlIGVuY29kZWRcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgZW5jb2RlZCBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgdXJsZW5jb2RlIDogZnVuY3Rpb24oc3RyaW5nKSB7XHJcbiAgICAgICAgc3RyaW5nID0gKHN0cmluZyArICcnKS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKHN0cmluZylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyEvZywgICAnJTIxJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgICAnJTI3JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKC9nLCAgJyUyOCcpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCkvZywgICclMjknKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwqL2csICAnJTJBJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIGdldEhlaWdodCAtIGZvciBlbGVtZW50cyB3aXRoIGRpc3BsYXk6bm9uZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gLSBkb20gZWxlbWVudCAobm90IGpxdWVyeSBlbGVtZW50KVxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAtIHRoZSB3YW50ZWQgaGVpZ2h0XHJcbiAgICAgKi9cclxuICAgIGdldEhlaWdodDogZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICB2YXIgZWxfc3R5bGUgICAgICA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKSxcclxuICAgICAgICAgICAgZWxfZGlzcGxheSAgICA9IGVsX3N0eWxlLmRpc3BsYXksXHJcbiAgICAgICAgICAgIGVsX3Bvc2l0aW9uICAgPSBlbF9zdHlsZS5wb3NpdGlvbixcclxuICAgICAgICAgICAgZWxfdmlzaWJpbGl0eSA9IGVsX3N0eWxlLnZpc2liaWxpdHksXHJcbiAgICAgICAgICAgIGVsX21heF9oZWlnaHQgPSBlbF9zdHlsZS5tYXhIZWlnaHQucmVwbGFjZSgncHgnLCAnJykucmVwbGFjZSgnJScsICcnKSxcclxuXHJcbiAgICAgICAgICAgIHdhbnRlZF9oZWlnaHQgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgLy8gaWYgaXRzIG5vdCBoaWRkZW4gd2UganVzdCByZXR1cm4gbm9ybWFsIGhlaWdodFxyXG4gICAgICAgIGlmKGVsX2Rpc3BsYXkgIT09ICdub25lJyAmJiBlbF9tYXhfaGVpZ2h0ICE9PSAnMCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsLm9mZnNldEhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRoZSBlbGVtZW50IGlzIGhpZGRlbiBzbzpcclxuICAgICAgICAvLyBtYWtpbmcgdGhlIGVsIGJsb2NrIHNvIHdlIGNhbiBtZWFzc3VyZSBpdHMgaGVpZ2h0IGJ1dCBzdGlsbCBiZSBoaWRkZW5cclxuICAgICAgICBlbC5zdHlsZS5wb3NpdGlvbiAgID0gJ2Fic29sdXRlJztcclxuICAgICAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSAgICA9ICdibG9jayc7XHJcblxyXG4gICAgICAgIHdhbnRlZF9oZWlnaHQgICAgICAgPSBlbC5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIHJldmVydGluZyB0byB0aGUgb3JpZ2luYWwgdmFsdWVzXHJcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSAgICA9IGVsX2Rpc3BsYXk7XHJcbiAgICAgICAgZWwuc3R5bGUucG9zaXRpb24gICA9IGVsX3Bvc2l0aW9uO1xyXG4gICAgICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBlbF92aXNpYmlsaXR5O1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHdhbnRlZF9oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogdG9nZ2xlU2xpZGUgbWltaWNzIHRoZSBqUXVlcnkgdmVyc2lvbiBvZiBzbGlkZURvd24gYW5kIHNsaWRlVXBcclxuICAgICAqIGFsbCBpbiBvbmUgZnVuY3Rpb24gY29tcGFyaW5nIHRoZSBtYXgtaGVpZ3RoIHRvIDBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IC0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcclxuICAgICAqICAgICAgICAge1N0cmluZ30gLSAnY2xvc2Vfb25seSdcclxuICAgICAqL1xyXG4gICAgdG9nZ2xlU2xpZGU6IGZ1bmN0aW9uKGVsLCBvcHRpb24pIHtcclxuICAgICAgICB2YXIgdXRpbHMgICAgICAgICA9IHRoaXMsXHJcbiAgICAgICAgICAgIGVsX21heF9oZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWF4LWhlaWdodCcpKSB7XHJcbiAgICAgICAgICAgIC8vIHdlJ3ZlIGFscmVhZHkgdXNlZCB0aGlzIGJlZm9yZSwgc28gZXZlcnl0aGluZyBpcyBzZXR1cFxyXG4gICAgICAgICAgICBpZihlbC5zdHlsZS5tYXhIZWlnaHQucmVwbGFjZSgncHgnLCAnJykucmVwbGFjZSgnJScsICcnKSA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICBpZihvcHRpb24gIT09ICdjbG9zZV9vbmx5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLm1heEhlaWdodCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihvcHRpb24gIT09ICdvcGVuX29ubHknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYob3B0aW9uICE9PSAnY2xvc2Vfb25seScpIHtcclxuICAgICAgICAgICAgICAgIGVsX21heF9oZWlnaHQgICAgICAgICAgICAgICAgICA9IHV0aWxzLmdldEhlaWdodChlbCkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbJ3RyYW5zaXRpb24nXSAgICAgICAgID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgICAgICAgICAgICAgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlLm1heEhlaWdodCAgICAgICAgICAgICA9ICcwJztcclxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0JywgZWxfbWF4X2hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ICAgICAgICAgICAgICAgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHdlIHVzZSBzZXRUaW1lb3V0IHRvIG1vZGlmeSBtYXhIZWlnaHQgbGF0ZXIgdGhhbiBkaXNwbGF5ICh0byB3ZSBoYXZlIHRoZSB0cmFuc2l0aW9uIGVmZmVjdClcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ID0gZWxfbWF4X2hlaWdodDtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBodG1sOiB7XHJcbiAgICAgICAgaGVhZGVyX3NlYXJjaDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9mb3JtJylcclxuICAgIH1cclxufSJdfQ==
