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