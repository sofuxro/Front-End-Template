(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

console.log('What file');

    /**
    * Search in the header
     */
    if(DOM.html.header_search) {
        // toggle animation
        document.querySelector('.js_search').addEventListener('click', function(e) {
            utils.toggleSlide(DOM.html.header_search);
            setTimeout(function() {
                DOM.html.header_search.querySelector('input').focus();
            }, 50);
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
/*!###############################
#                                #
#      by Claudiu Limban         #
# http://www.teranacreative.com  #
#                                #
##################################*/

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
     */
    ajax: (function() {
        var send_fn = function(url, data, method, success_fn, error_fn) {
                var x          = new XMLHttpRequest(),
                    success_fn = success_fn || function() {},
                    error_fn   = error_fn || function() {};

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
            },


            post_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //    url         data           method    success_fn     error_fn
                send_fn(obj.url, query.join('&'), 'POST', obj.success, obj.error);
            },


            get_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //              url                     data  method    success_fn     error_fn
                send_fn(obj.url + '?' + query.join('&'), null, 'GET', obj.success, obj.error);
            },


            put_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //       url         data         method  success_fn   error_fn
                send_fn(obj.url, query.join('&'), 'PUT', obj.success, obj.error);
            },


            delete_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //    url         data            method    success_fn     error_fn
                send_fn(obj.url, query.join('&'), 'DELETE', obj.success, obj.error);
            };

        return {post: post_fn, get: get_fn, put: put_fn, delete: delete_fn};
    })(),


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
    },


    /**
    * posta - email obfuscation
     *
     * Important: it uses the class 'js_posta'. It is translated to romanian (e-posta = e-mail) for better obfuscation
     *
     * Example:
     *      <p class="js_posta"></p>
     *
     *      utils.posta('name', 'gmail', 'com');
     */
    posta: function(name, domain, end) {
        this.forEach(document.querySelectorAll('.js_posta'), function(index, element) {
            setTimeout(function() {
                element.innerHTML = '<i class="fa fa-at"></i> <a itemprop="email" href="mailto:' + name + '@' + domain + '.' + end + '">' + name + '@' + domain + '.' + end + '</a>';
            }, 50);
        });
    },


    /**
    * lazy image load
     *
     * Example:
     *      <img class="js_lazy_load" src="" data-source="img_path/img.jpg" />
     *
     *
     *      document.addEventListener("DOMContentLoaded", function() {
     *          ...
     *          image_lazy_load();
     *          ...
     *      });
     */
    image_lazy_load: function() {
        this.forEach(document.querySelectorAll('.js_lazy_load'), function(index, img) {
            img.setAttribute('src', img.getAttribute('data-source'));
        });
    }
};
},{}],4:[function(require,module,exports){
'use strict';


module.exports = {
    device: {
        isTouchDevice:  navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
        isTouch:        (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints))
    },


    html: {
        header_search: document.querySelector('.search_form')
    }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvYXBwLmpzIiwiZGV2L2pzL2luYy9oZWFkZXIuanMiLCJkZXYvanMvaW5jL3V0aWxzLmpzIiwiZGV2L2pzL2luYy92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiogQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICovXG52YXIgdXRpbHMgID0gcmVxdWlyZSgnLi9pbmMvdXRpbHMuanMnKSxcbiAgICBoZWFkZXIgPSByZXF1aXJlKCcuL2luYy9oZWFkZXIuanMnKTtcblxuXG4vKiogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qIFdoZXJlIGV2ZXJ5dGhpbmcgaGFwcGVuc1xuICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICogSGVhZGVyIGZ1bmN0aW9uYWxpdHlcbiAgICAgKi9cbiAgICBoZWFkZXIoKTtcblxuXG4gICAgLyoqXG4gICAgKiBTY3JvbGwgZnVuY3Rpb25hbGl0eVxuICAgICAqXG4gICAgICogQ29udHJvbGxpbmc6XG4gICAgICogICAgICAtIG1lbnUgYnkgYWRkaW5nIGFjdGl2ZSB3aGVuIHdlIHNjcm9sbCAoZ2l2ZSBhIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZCBjb2xvcilcbiAgICAgKiAgICAgIC0gcGFyYWxheCBlZmZlY3Qgb24gdGhlIGJvZHkgYmFja2dyb3VuZC1pbWFnZVxuICAgICAqL1xuICAgIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvKiBIRUFERVIgY29udHJvbCAodHJhbnNwYXJlbnQgLyBncmF5IGJhY2tncm91bmQpICovXG4gICAgICAgIGlmKChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSA+IDEwMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCdib2R5ID4gaGVhZGVyJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgPiBoZWFkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFBBUkFMQVggZWZmZWN0ICovXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJzBweCAnICsgd2luZG93LnBhZ2VZT2Zmc2V0IC8gMyArICdweCc7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIEdvIHVwIChmcm9tIHRoZSBmb290ZXIpXG4gICAgICovXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyIFtkYXRhLXJvbGU9XCJnb191cFwiXScpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsnc2Nyb2xsVG9wJzogJzBweCd9LCA1MDApO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgdXRpbHMgID0gcmVxdWlyZSgnLi91dGlscy5qcycpLFxyXG4gICAgRE9NICAgID0gcmVxdWlyZSgnLi92YXJpYWJsZXMuanMnKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLyoqXHJcbiAgICAqIEFkZGluZyBGb250IEF3ZXNvbWUgYW5kIG1vc3QgdXNlZCBnb29nbGUgZm9udCBPcGVuIFNhbnNcclxuICAgICAqL1xyXG4gICAgdXRpbHMuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4zLjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XHJcbiAgICB1dGlscy5leHRyYV9zdHlsZSgnaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zJnN1YnNldD1sYXRpbi1leHQnKTtcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcclxuICAgICAqIGFuZCBhIHN0YW5kYXJkIGh0bWwgc3RydWN0dXJlIChuYXYgPiBidXR0b24gKyBhKm4pXHJcbiAgICAgKi9cclxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yb2xlPVwibWFpbl9tZW51XCJdIGJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbmNvbnNvbGUubG9nKCdXaGF0IGZpbGUnKTtcclxuXHJcbiAgICAvKipcclxuICAgICogU2VhcmNoIGluIHRoZSBoZWFkZXJcclxuICAgICAqL1xyXG4gICAgaWYoRE9NLmh0bWwuaGVhZGVyX3NlYXJjaCkge1xyXG4gICAgICAgIC8vIHRvZ2dsZSBhbmltYXRpb25cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfc2VhcmNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnRvZ2dsZVNsaWRlKERPTS5odG1sLmhlYWRlcl9zZWFyY2gpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgRE9NLmh0bWwuaGVhZGVyX3NlYXJjaC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIGNvcnJlY3QgcGF0aCB0byB0aGUgc2VhcmNoIGZvcm0gYmFzZWQgb24gdGhlIGlucHV0XHJcbiAgICAgICAgRE9NLmh0bWwuaGVhZGVyX3NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0aW5nIHRoZSBhY3Rpb24gcGF0aFxyXG4gICAgICAgICAgICBmb3JtLmFjdGlvbiA9IERPTS5odG1sLnVybF9zZWFyY2ggKyBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAvLyBsZXR0aW5nIHRoZSBmb3JtIGRvIGl0cyBuYXR1cmFsIGpvYlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBDbG9zZSBvbiBjbGljayAoanVzdCBmb3IganNfc2VhcmNoX2Zvcm0gZm9yIG5vdylcclxuICAgICAgICAgKi9cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCAgICAgICAgICAgICAgPSBlLnRhcmdldCxcclxuICAgICAgICAgICAgICAgIHBhcmVudCAgICAgICAgICA9IGVsLFxyXG4gICAgICAgICAgICAgICAgc2hvdWxkX3dlX2Nsb3NlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB3aGlsZShwYXJlbnQgJiYgcGFyZW50ICE9IGRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWFyY2hfZm9ybScpIHx8IHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzX3NlYXJjaCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkX3dlX2Nsb3NlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIXNob3VsZF93ZV9jbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMudG9nZ2xlU2xpZGUoRE9NLmh0bWwuaGVhZGVyX3NlYXJjaCwgJ2Nsb3NlX29ubHknKTtcclxuICAgICAgICAgICAgICAgIERPTS5odG1sLmhlYWRlcl9zZWFyY2gucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07IiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXHJcbiMgICAgICBieSBDbGF1ZGl1IExpbWJhbiAgICAgICAgICNcclxuIyBodHRwOi8vd3d3LnRlcmFuYWNyZWF0aXZlLmNvbSAgI1xyXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXHJcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBHZXR0aW5nIHRoZSBvZmZzZXQgb2YgYSBET00gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqICMjIyBFeGFtcGxlczpcclxuICAgICAqXHJcbiAgICAgKiAgICAgdXRpbHMub2Zmc2V0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teV9lbGVtZW50JykpO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkb20gZWxlbWVudCAobm90IGpxdWVyeSBlbGVtZW50KVxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBhIHRvcCAvIGxlZnQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIG9mZnNldCA6IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHZhciB0b3AgID0gMCxcclxuICAgICAgICAgICAgbGVmdCA9IDA7XHJcblxyXG4gICAgICAgIGlmKG9iai5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgdG9wICArPSBvYmoub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICAgICAgbGVmdCArPSBvYmoub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gb2JqLm9mZnNldFBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH07XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogQWRkaW5nIGR5bmFtaWNhbGx5IGEgbmV3IGV4dGVybmFsIHN0eWxlIGludG8gdGhlIGh0bWxcclxuICAgICAqXHJcbiAgICAgKiAjIyMgRXhhbXBsZXM6XHJcbiAgICAgKlxyXG4gICAgICogICAgIHV0aWxzLmV4dHJhX3N0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMi4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycpO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGUgYWN0dWFsIHVybCAobG9jYWwgb3IgaHR0cClcclxuICAgICAqL1xyXG4gICAgZXh0cmFfc3R5bGUgOiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICB2YXIgbGlua19jc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHJcbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcclxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGxpbmtfY3NzKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBMb29waW5nIHRocm91Z2ggRE9NIE5vZGVMaXN0XHJcbiAgICAgKlxyXG4gICAgICogIyMjIEV4YW1wbGVzOlxyXG4gICAgICpcclxuICAgICAqICB1dGlscy5mb3JFYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksIGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7IGNvbnNvbGUubG9nKGluZGV4LCBlbGVtZW50KTsgfSk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheSwgRnVuY3Rpb24sIFNjb3BlfVxyXG4gICAgICovXHJcbiAgICBmb3JFYWNoOiBmdW5jdGlvbiAoYXJyYXksIGNhbGxiYWNrLCBzY29wZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNjb3BlLCBpLCBhcnJheVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEFKQVhcclxuICAgICAqXHJcbiAgICAgKiAjIyMgRXhhbXBsZXM6XHJcbiAgICAgKlxyXG4gICAgICogICAgICB1dGlscy5hamF4LmdldCh7XHJcbiAgICAgKiAgICAgICAgICB1cmw6ICAgICAnL3Rlc3QucGhwJyxcclxuICAgICAqICAgICAgICAgIGRhdGE6ICAgIHtmb286ICdiYXInfSxcclxuICAgICAqICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkgeyAvLyB3aGF0IHRvIGRvIG9uIHN1Y2Nlc3M7IH0sXHJcbiAgICAgKiAgICAgICAgICBlcnJvcjogICBmdW5jdGlvbigpIHsgLy8gd2hhdCB0byBkbyBvbiBlcnJvcjsgfVxyXG4gICAgICogICAgICB9KTtcclxuICAgICAqL1xyXG4gICAgYWpheDogKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzZW5kX2ZuID0gZnVuY3Rpb24odXJsLCBkYXRhLCBtZXRob2QsIHN1Y2Nlc3NfZm4sIGVycm9yX2ZuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgeCAgICAgICAgICA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NfZm4gPSBzdWNjZXNzX2ZuIHx8IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfZm4gICA9IGVycm9yX2ZuIHx8IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgICAgICAgICAgICAgeC5vcGVuKG1ldGhvZCwgdXJsKTtcclxuICAgICAgICAgICAgICAgIHgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHguc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NfZm4oeC5yZXNwb25zZVRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl9mbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4LnNlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgcG9zdF9mbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICAgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mblxyXG4gICAgICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsLCBxdWVyeS5qb2luKCcmJyksICdQT1NUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgZ2V0X2ZuID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBvYmouZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqLmRhdGFba2V5XSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgIHVybCAgICAgICAgICAgICAgICAgICAgIGRhdGEgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mblxyXG4gICAgICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsICsgJz8nICsgcXVlcnkuam9pbignJicpLCBudWxsLCAnR0VUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgcHV0X2ZuID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBvYmouZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqLmRhdGFba2V5XSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgdXJsICAgICAgICAgZGF0YSAgICAgICAgIG1ldGhvZCAgc3VjY2Vzc19mbiAgIGVycm9yX2ZuXHJcbiAgICAgICAgICAgICAgICBzZW5kX2ZuKG9iai51cmwsIHF1ZXJ5LmpvaW4oJyYnKSwgJ1BVVCcsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZV9mbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICAgICBtZXRob2QgICAgc3VjY2Vzc19mbiAgICAgZXJyb3JfZm5cclxuICAgICAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCwgcXVlcnkuam9pbignJicpLCAnREVMRVRFJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7cG9zdDogcG9zdF9mbiwgZ2V0OiBnZXRfZm4sIHB1dDogcHV0X2ZuLCBkZWxldGU6IGRlbGV0ZV9mbn07XHJcbiAgICB9KSgpLFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogRXNjYXBlcyBodG1sIGNoYXJhY3RlcnNcclxuICAgICAqXHJcbiAgICAgKiAjIyMgRXhhbXBsZXM6XHJcbiAgICAgKlxyXG4gICAgICogICAgIHV0aWxzLmVzY2FwZUh0bWwoJ1RoaXMgaXMgbXkgc3RyaW5nICcgXCIgPiA8IHdpbGwgYmUgcmVtb3ZlZCcpO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaHRtbCBzdHJpbmcgdG8gYmUgZXNjYXBlZFxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBlc2NhcGVkIGh0bWxcclxuICAgICAqL1xyXG4gICAgZXNjYXBlSHRtbDogZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAgIHZhciBtYXAgPSB7XHJcbiAgICAgICAgICAgICcmJzogJyZhbXA7JyxcclxuICAgICAgICAgICAgJzwnOiAnJmx0OycsXHJcbiAgICAgICAgICAgICc+JzogJyZndDsnLFxyXG4gICAgICAgICAgICAnXCInOiAnJnF1b3Q7JyxcclxuICAgICAgICAgICAgXCInXCI6ICcmI3gyNzsnLFxyXG4gICAgICAgICAgICBcIi9cIjogJyYjeDJGOydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bJjw+XCInL10vZywgZnVuY3Rpb24obSkgeyByZXR1cm4gbWFwW21dOyB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiB1cmxlbmNvZGUgZXF1aXZhbGVudCBmcm9tIFBIUFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gLSBzdHJpbmcgdG8gYmUgZW5jb2RlZFxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSBlbmNvZGVkIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICB1cmxlbmNvZGUgOiBmdW5jdGlvbihzdHJpbmcpIHtcclxuICAgICAgICBzdHJpbmcgPSAoc3RyaW5nICsgJycpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbmNvZGVVUkkoc3RyaW5nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvIS9nLCAgICclMjEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAgICclMjcnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwoL2csICAnJTI4JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKS9nLCAgJyUyOScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCovZywgICclMkEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvJTIwL2csICcrJyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogZ2V0SGVpZ2h0IC0gZm9yIGVsZW1lbnRzIHdpdGggZGlzcGxheTpub25lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAtIGRvbSBlbGVtZW50IChub3QganF1ZXJ5IGVsZW1lbnQpXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gdGhlIHdhbnRlZCBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgZ2V0SGVpZ2h0OiBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgIHZhciBlbF9zdHlsZSAgICAgID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLFxyXG4gICAgICAgICAgICBlbF9kaXNwbGF5ICAgID0gZWxfc3R5bGUuZGlzcGxheSxcclxuICAgICAgICAgICAgZWxfcG9zaXRpb24gICA9IGVsX3N0eWxlLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICBlbF92aXNpYmlsaXR5ID0gZWxfc3R5bGUudmlzaWJpbGl0eSxcclxuICAgICAgICAgICAgZWxfbWF4X2hlaWdodCA9IGVsX3N0eWxlLm1heEhlaWdodC5yZXBsYWNlKCdweCcsICcnKS5yZXBsYWNlKCclJywgJycpLFxyXG5cclxuICAgICAgICAgICAgd2FudGVkX2hlaWdodCA9IDA7XHJcblxyXG5cclxuICAgICAgICAvLyBpZiBpdHMgbm90IGhpZGRlbiB3ZSBqdXN0IHJldHVybiBub3JtYWwgaGVpZ2h0XHJcbiAgICAgICAgaWYoZWxfZGlzcGxheSAhPT0gJ25vbmUnICYmIGVsX21heF9oZWlnaHQgIT09ICcwJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZWwub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhlIGVsZW1lbnQgaXMgaGlkZGVuIHNvOlxyXG4gICAgICAgIC8vIG1ha2luZyB0aGUgZWwgYmxvY2sgc28gd2UgY2FuIG1lYXNzdXJlIGl0cyBoZWlnaHQgYnV0IHN0aWxsIGJlIGhpZGRlblxyXG4gICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uICAgPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ICAgID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgd2FudGVkX2hlaWdodCAgICAgICA9IGVsLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gcmV2ZXJ0aW5nIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZXNcclxuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ICAgID0gZWxfZGlzcGxheTtcclxuICAgICAgICBlbC5zdHlsZS5wb3NpdGlvbiAgID0gZWxfcG9zaXRpb247XHJcbiAgICAgICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGVsX3Zpc2liaWxpdHk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gd2FudGVkX2hlaWdodDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiB0b2dnbGVTbGlkZSBtaW1pY3MgdGhlIGpRdWVyeSB2ZXJzaW9uIG9mIHNsaWRlRG93biBhbmQgc2xpZGVVcFxyXG4gICAgICogYWxsIGluIG9uZSBmdW5jdGlvbiBjb21wYXJpbmcgdGhlIG1heC1oZWlndGggdG8gMFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gLSBkb20gZWxlbWVudCAobm90IGpxdWVyeSBlbGVtZW50KVxyXG4gICAgICogICAgICAgICB7U3RyaW5nfSAtICdjbG9zZV9vbmx5J1xyXG4gICAgICovXHJcbiAgICB0b2dnbGVTbGlkZTogZnVuY3Rpb24oZWwsIG9wdGlvbikge1xyXG4gICAgICAgIHZhciB1dGlscyAgICAgICAgID0gdGhpcyxcclxuICAgICAgICAgICAgZWxfbWF4X2hlaWdodCA9IDA7XHJcblxyXG4gICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0JykpIHtcclxuICAgICAgICAgICAgLy8gd2UndmUgYWxyZWFkeSB1c2VkIHRoaXMgYmVmb3JlLCBzbyBldmVyeXRoaW5nIGlzIHNldHVwXHJcbiAgICAgICAgICAgIGlmKGVsLnN0eWxlLm1heEhlaWdodC5yZXBsYWNlKCdweCcsICcnKS5yZXBsYWNlKCclJywgJycpID09PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbiAhPT0gJ2Nsb3NlX29ubHknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1heC1oZWlnaHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbiAhPT0gJ29wZW5fb25seScpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5tYXhIZWlnaHQgPSAnMCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZihvcHRpb24gIT09ICdjbG9zZV9vbmx5Jykge1xyXG4gICAgICAgICAgICAgICAgZWxfbWF4X2hlaWdodCAgICAgICAgICAgICAgICAgID0gdXRpbHMuZ2V0SGVpZ2h0KGVsKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVsndHJhbnNpdGlvbiddICAgICAgICAgPSAnbWF4LWhlaWdodCAwLjVzIGVhc2UtaW4tb3V0JztcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSAgICAgICAgICAgICA9ICdoaWRkZW4nO1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ICAgICAgICAgICAgID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLW1heC1oZWlnaHQnLCBlbF9tYXhfaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgICAgICAgICAgICAgICA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gd2UgdXNlIHNldFRpbWVvdXQgdG8gbW9kaWZ5IG1heEhlaWdodCBsYXRlciB0aGFuIGRpc3BsYXkgKHRvIHdlIGhhdmUgdGhlIHRyYW5zaXRpb24gZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5tYXhIZWlnaHQgPSBlbF9tYXhfaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIHBvc3RhIC0gZW1haWwgb2JmdXNjYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBJbXBvcnRhbnQ6IGl0IHVzZXMgdGhlIGNsYXNzICdqc19wb3N0YScuIEl0IGlzIHRyYW5zbGF0ZWQgdG8gcm9tYW5pYW4gKGUtcG9zdGEgPSBlLW1haWwpIGZvciBiZXR0ZXIgb2JmdXNjYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBFeGFtcGxlOlxyXG4gICAgICogICAgICA8cCBjbGFzcz1cImpzX3Bvc3RhXCI+PC9wPlxyXG4gICAgICpcclxuICAgICAqICAgICAgdXRpbHMucG9zdGEoJ25hbWUnLCAnZ21haWwnLCAnY29tJyk7XHJcbiAgICAgKi9cclxuICAgIHBvc3RhOiBmdW5jdGlvbihuYW1lLCBkb21haW4sIGVuZCkge1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNfcG9zdGEnKSwgZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtYXRcIj48L2k+IDxhIGl0ZW1wcm9wPVwiZW1haWxcIiBocmVmPVwibWFpbHRvOicgKyBuYW1lICsgJ0AnICsgZG9tYWluICsgJy4nICsgZW5kICsgJ1wiPicgKyBuYW1lICsgJ0AnICsgZG9tYWluICsgJy4nICsgZW5kICsgJzwvYT4nO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogbGF6eSBpbWFnZSBsb2FkXHJcbiAgICAgKlxyXG4gICAgICogRXhhbXBsZTpcclxuICAgICAqICAgICAgPGltZyBjbGFzcz1cImpzX2xhenlfbG9hZFwiIHNyYz1cIlwiIGRhdGEtc291cmNlPVwiaW1nX3BhdGgvaW1nLmpwZ1wiIC8+XHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgKiAgICAgICAgICAuLi5cclxuICAgICAqICAgICAgICAgIGltYWdlX2xhenlfbG9hZCgpO1xyXG4gICAgICogICAgICAgICAgLi4uXHJcbiAgICAgKiAgICAgIH0pO1xyXG4gICAgICovXHJcbiAgICBpbWFnZV9sYXp5X2xvYWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanNfbGF6eV9sb2FkJyksIGZ1bmN0aW9uKGluZGV4LCBpbWcpIHtcclxuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zb3VyY2UnKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZGV2aWNlOiB7XHJcbiAgICAgICAgaXNUb3VjaERldmljZTogIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUGhvbmV8aVBvZHxpUGFkfEFuZHJvaWR8cGxheWJvb2t8c2lsa3xCbGFja0JlcnJ5fEJCMTB8V2luZG93cyBQaG9uZXxUaXplbnxCYWRhfHdlYk9TfElFTW9iaWxlfE9wZXJhIE1pbmkpLyksXHJcbiAgICAgICAgaXNUb3VjaDogICAgICAgICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSB8fCAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzKSlcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGh0bWw6IHtcclxuICAgICAgICBoZWFkZXJfc2VhcmNoOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2Zvcm0nKVxyXG4gICAgfVxyXG59Il19
