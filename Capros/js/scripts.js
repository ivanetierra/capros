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


/*-- Validate password and enter home --*/
function validatePassword() {
    var passwordInput = document.getElementById("password").value;
    var hash = CryptoJS.MD5(passwordInput).toString();

    if (hash === 'ed84cb612503f038fcf72d66c61f3528') {
      // Make an AJAX request to the server
      fetch('/validate-password', {
        method: 'POST',
        headers: {
          'password-hash': hash
        }
      })
      .then(response => {
        if (response.ok) {
          // If the server responds positively, navigate to home.html
          window.location.href = "/home.html";
        } else {
          // Handle error
          var errorMessage = document.getElementById("error-message");
          errorMessage.classList.add("visible");
          shakePasswordInput();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      var errorMessage = document.getElementById("error-message");
      errorMessage.classList.add("visible");
      shakePasswordInput();
    }
}
/*-- End Validate password and enter home --*/

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter" 
    && (document.activeElement.id == "password" || document.activeElement.id=="enter-button")) {
      validatePassword();
    }
  });

/*-- Toggle password visibility --*/
function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var toggleIcon = document.querySelector("#togglePassword button");
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    }
  }
/*-- End Toggle password visibility --*/


function    shakePasswordInput() {
    var passwordInput = document.getElementById('password-input');
    passwordInput.classList.add('shake-animation');
    
    setTimeout(function() {
      passwordInput.classList.remove('shake-animation');
    }, 300);
  }


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




