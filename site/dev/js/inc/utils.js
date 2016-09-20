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
     *          success: function() {
     *              // what to do on success;
     *          },
     *          error:   function() {
     *              // what to do on error;
     *          }
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