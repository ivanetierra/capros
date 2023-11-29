var phraseCarouselInterval;

(function($, root, undefined) {

    $(function() {
        'use strict';
        startTime();
        $(document).on('click', '.btn-close', function() {
            $(this).closest('.window').toggleClass('hidden');
            
        })
        $(document).on('touchend', '.btn-close', function() {
            $('.window').removeClass('menu-active');
            $(this).closest('.window').toggleClass('hidden');
        })
        
        $(document).on('click', '.nav-copyright', function() {
            $('.window').addClass('hidden');
            $('.copyright-window').toggleClass('hidden');
        })


        
    
        $(document).on('click', '.win-trigger', function() {
            openWindow($(this).attr('data-trigger'));
        })
        $(document).on('touchend', '.win-trigger', function() {
            $('.window').addClass('hidden');
            $('.window').removeClass('menu-active');
            openWindow($(this).attr('data-trigger'));
        })
        $(document).on('click', '.window:not(.front)', function() {
            $('.window').removeClass('front');
            $(this).addClass('front');
        })

        

    });
})(jQuery, this);


/*-- Enter Site --*/
function enterSite() {
    $('#loading_overlay').addClass('hidden');
}
/*-- End Enter Site --*/

/*-- Windows --*/
function openWindow(windowAttr) {
    $('.window').removeClass('front');
    $('.world-time-container').addClass('hidden');
    $('.' + windowAttr).removeClass('hidden').addClass('front');
}
/*-- End Windows --*/

/*-- Year --*/
const y = new Date();
let year = y.getFullYear();
document.getElementsByClassName("current-year").innerHTML = year;
/*-- End Year --*/

/*-- Current time --*/
function startTime() {
    var timer = document.getElementById('current-time');
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    if (timer != null) {
        m = checkTime(m);
        timer.innerHTML = h + ":" + m;
        setTimeout(startTime, 1000);
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}
/*-- End Current time --*/




