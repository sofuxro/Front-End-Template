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