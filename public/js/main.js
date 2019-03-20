(function ($) {
 "use strict";
/*---------------------
 Preloader
--------------------- */
    $(window).on('load', function() {
		$('#preloader').fadeOut('fast', function() { $(this).remove(); });
    }); 

/*--------------------------
 slider-active
---------------------------- */	
	$('.slider-active').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		navText:['<i class="zmdi zmdi-chevron-left"></i>','<i class="zmdi zmdi-chevron-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
/*---------------------
 Team-carousel-active
--------------------- */
	$('.team-carousel-active').owlCarousel({
		loop:true,
		margin:0,
		nav:false,		
		autoplay:true,
		smartSpeed:1000,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})		
	

/*-----------------------------
One Page Nav
------------------------------*/
    var top_offset = $('.header-area,.sidebar_menu').height() - -60;
    $('.main-menu nav ul,.push_nav').onePageNav({
        currentClass: 'active',
        scrollOffset: top_offset,
    }); 	
	 
/*--------------------------
 Parallax
---------------------------- */	
	var parallaxeffect = $(window);
		parallaxeffect.stellar({
		responsive: true,
		positionProperty: 'position',
		horizontalScrolling: false
	});

/*--------------------------
 MagnificPopup
---------------------------- */	
	$('.video-play').magnificPopup({
		type: 'iframe'
	});

/*--------------------------
 Sticky
---------------------------- */
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 1) {
            $('.sticker').removeClass('stick');
        } else {
            $('.sticker').addClass('stick');
        }
    });
	
/*---------------------
Background Video
    --------------------- */
    //$('.player').mb_YTPlayer();
			
	
/*--------------------------
 Portfolio
---------------------------- */			
	/* imagesLoaded */
	$('.grid').imagesLoaded( function() {
		// filter items on button click
		$('.portfolio-menu').on( 'click', 'button', function() {
		  var filterValue = $(this).attr('data-filter');
		  $grid.isotope({ filter: filterValue });
		});	
		// init Isotope
		var $grid = $('.grid').isotope({
		  itemSelector: '.grid-item',
		  percentPosition: true,
		  masonry: {
			// use outer width of grid-sizer for columnWidth
			columnWidth: '.grid-item',
		  }
		});
	});
	/* portfolio-menu active class */
	$('.portfolio-menu button').on('click', function(event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});	
/*----------------------
Magnific Popup
------------------------*/
	$('.img-poppu').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		}
	});	
	
/*--------------------------
 client
---------------------------- */	
	$('.client-active').owlCarousel({
		loop:true,
		nav:false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

/*-------------------
Scroll-up
--------------------*/
    $.scrollUp({
        scrollText: '<i class="zmdi zmdi-chevron-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
	
/*---------------------
 wow .js
--------------------- */
	new WOW().init();	
		
/*---------------------
 Ajax Contact Form
--------------------- */
	$('.cf-msg').hide();
	$('form#cf button#submit').on('click', function() {
		var fname = $('#fname').val();
		var subject = $('#subject').val();
		var email = $('#email').val();
		var msg = $('#msg').val();
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!regex.test(email)) {
			alert('Please enter valid email');
			return false;
		}

		fname = $.trim(fname);
		subject = $.trim(subject);
		email = $.trim(email);
		msg = $.trim(msg);

		if (fname != '' && email != '' && msg != '') {
			var values = "fname=" + fname + "&subject=" + subject + "&email=" + email + " &msg=" + msg;
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: values,
				success: function() {
					$('#fname').val('');
					$('#subject').val('');
					$('#email').val('');
					$('#msg').val('');

					$('.cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
					setTimeout(function() {
						$('.cf-msg').fadeOut('slow');
					}, 4000);
				}
			});
		} else {
			$('.cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')
		}
		return false;
	});	
	
})(jQuery); 
