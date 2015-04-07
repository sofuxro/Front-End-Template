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