/*
    Miniport by HTML5 UP
    html5up.net | @n33co
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    skel
        .breakpoints({
            desktop: '(min-width: 737px)',
            tablet: '(min-width: 737px) and (max-width: 1200px)',
            mobile: '(max-width: 736px)'
        })
        .viewport({
            breakpoints: {
                tablet: {
                    width: 1080
                }
            }
        });

    $(function() {

        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
            $body.addClass('is-loading');

            $window.on('load', function() {
                $body.removeClass('is-loading');
            });

        // Fix: Placeholder polyfill.
            $('form').placeholder();

        // Prioritize "important" elements on mobile.
            skel.on('+mobile -mobile', function() {
                $.prioritize(
                    '.important\\28 mobile\\29',
                    skel.breakpoint('mobile').active
                );
            });

        // CSS polyfills (IE<9).
            if (skel.vars.IEVersion < 9)
                $(':last-child').addClass('last-child');

        // Email sending
        var page = {
            sendEmail: function() {
                var formParams = $('#contact-form'),
                    serializedData = formParams.serializeArray(),
                    jsonData = {},
                    self = this,
                    spam = false;

                $.each(serializedData, function() {
                    if(this.name === 'anti-spam') {
                        if(this.value.length > 0) { spam = true; }
                        return true;
                    }
                    jsonData[this.name] = this.value;
                })

                if(spam) { return; }

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: formParams.attr('action'),
                    data: JSON.stringify(jsonData),
                    success: function(data, textStatus, xhr) {
                        let code = xhr.status;

                        if(code && code === 200 ) { self.sendSuccessCB(); }
                        else { self.sendErrorCB(); }
                    },
                    error: function(){
                        self.sendErrorCB();
                    }
                });                
            },

            sendSuccessCB: function() {
                $.flash('Email successfully sent!');
            },

            sendErrorCB: function() {
                $.flash('Error sending email, please try again later...');
                $('#email-button').prop("disabled", false);
                $('#email-button').fadeIn(500);
            }
        }

        // Scrolly.
            $window.load(function() {

                var x = parseInt($('.wrapper').first().css('padding-top')) - 15;

                $('#nav a, .scrolly').scrolly({
                    speed: 1000,
                    offset: x
                });

                // Setup form validation
                $('#contact-form').validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        subject: {
                            required: true,
                            minlength: 1
                        },
                        message: {
                            required: true,
                            minlength: 1
                        }
                    }
                });

                $('#email-button').on('click', function() {
                    if( $('#contact-form').valid() ) {
                        $('#email-button').prop("disabled", true);
                        $('#email-button').fadeOut(500);
                        page.sendEmail();
                    }
                });

            });
    });

})(jQuery);