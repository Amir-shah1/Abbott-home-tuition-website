(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    // $('.back-to-top').click(function () {
    //     $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    //     return false;
    // });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

    // Newsletter Validation
    // Use delegated event binding to ensure it works even if elements are loaded dynamically or script runs early
    $(document).on('click', '#newsletter-btn', function(e) {
        e.preventDefault(); // Prevent default button behavior
        
        var newsletterInput = $('#newsletter-email');
        var messageBox = $('#newsletter-message');
        var email = newsletterInput.val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset message
        messageBox.text('').removeClass('text-success text-danger');

        if(email === "") {
            messageBox.text("Please enter your email.").addClass('text-danger');
            return;
        }

        if(!emailPattern.test(email)) {
            messageBox.text("Please enter a valid email address.").addClass('text-danger');
            newsletterInput.val(''); 
            return;
        }

        // Disable button to prevent double submit
        var $btn = $(this);
        $btn.prop('disabled', true);
        $btn.text('Sending...');

        $.ajax({
            url: "newsletter.php",
            type: "POST",
            data: { email: email },
            success: function(response) {
                messageBox.text(response).addClass('text-success');
                newsletterInput.val(''); 
            },
            error: function(jqXHR, textStatus, errorThrown) {
                 var msg = jqXHR.responseText;
                 if(!msg) msg = "An error occurred. Please try again.";
                 messageBox.text(msg).addClass('text-danger');
            },
            complete: function() {
                $btn.prop('disabled', false);
                $btn.text('Sign Up');
                
                // Clear success message after 5 seconds
                if(messageBox.hasClass('text-success')) {
                    setTimeout(function() {
                        messageBox.text('').removeClass('text-success');
                    }, 5000);
                }
            }
        });
    });
    
})(jQuery);


const dropdown = document.getElementById("role");
const submitBtn = document.getElementById("sumbit-button");

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const selectValue = dropdown.value;
    if(selectValue == "1"){
        window.location.href = "student_form.php";
    } else if (selectValue == "2") {
        window.location.href = "teacher_form.php";
    }

});



