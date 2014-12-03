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