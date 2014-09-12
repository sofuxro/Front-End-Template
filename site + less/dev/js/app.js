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