jQuery.noConflict();
jQuery(document).ready(function($){
	
	"use strict";
	if( dttheme_urls.loadingbar === "enable") {
		Pace.on("done", function(){
			$(".loader").fadeOut(500);
			$(".pace").remove();
		});
	}
	
	if( $('.dt-sc-icon-box-type9').length ) {
		setTimeout(function(){
			$('.dt-sc-icon-box-type9').each(function(){
				$(this).find('.icon-wrapper').css('height', $(this).find('.icon-content').outerHeight(true) );
			});
		},1000);
    }
	   	
	if( $('ul.dt-sc-tabs-vertical-frame').length ) {
		$('ul.dt-sc-tabs-vertical-frame').each(function(){
			$(this).css('min-height', $(this).height() );
		});
	}

	if( $('ul.dt-sc-tabs-vertical').length ) {
		$('ul.dt-sc-tabs-vertical').each(function(){
			$(this).css('min-height', $(this).height() );
		});
	}
	
	// <select>	
	$("select").each(function(){
		if($(this).css('display') != 'none') {
			$(this).wrap( '<div class="selection-box"></div>' );
		}
	});

	//To Top...
	$().UItoTop({ easingType: 'easeOutQuart' });

	$('.activity-type-tabs > ul >li:first').addClass('selected');
	$('.dir-form > .item-list-tabs > ul > li:first').addClass('selected');

	/*Menu */
	function infiMegaMenu() {
		var screenWidth = $(document).width(),
		containerWidth = $("#header .container").width(),
		containerMinuScreen = (screenWidth - containerWidth)/2;
		if( containerWidth == screenWidth ){

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){

				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();

				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > screenWidth ){
					var SwMinuOffset = screenWidth - ParentLeftPosition;
					var marginFromLeft = MegaMenuChildContainerWidth - SwMinuOffset;
					var marginFromLeftActual = (marginFromLeft) + 25;
					var marginLeftFromScreen = "-"+marginFromLeftActual+"px";
					$(this).css('left',marginLeftFromScreen);
				}

			});
		} else {

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){
				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();

				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > containerWidth ){
					var marginFromLeft = ( ParentLeftPosition + MegaMenuChildContainerWidth ) - screenWidth;
					var marginLeftFromContainer = containerMinuScreen + marginFromLeft + 20;

					if( MegaMenuChildContainerWidth > containerWidth ){
						var MegaMinuContainer	= ( (MegaMenuChildContainerWidth - containerWidth)/2 ) + 10;
						var marginLeftFromContainerVal = marginLeftFromContainer - MegaMinuContainer;
						marginLeftFromContainerVal = "-"+marginLeftFromContainerVal+"px";
						$(this).css('left',marginLeftFromContainerVal);
					} else {
						marginLeftFromContainer = "-"+marginLeftFromContainer+"px";
						$(this).css('left',marginLeftFromContainer);
					}
				}

			});
		}
	}
	
	infiMegaMenu();
	
	$(window).bind("resize", function() {
		infiMegaMenu();
	});

	//Menu Hover Animation...
	
	function infiMenuHover() {

		if($('body').hasClass('left-header-creative') || $('body').hasClass('overlay-header')) {

			$( '.menu li.menu-item-has-children' ).hoverIntent(
				function() {
					$(this).find('.sub-menu').stop().slideDown(250, "easeInQuad");
				}, function() {
					$(this).find('.sub-menu').stop().slideUp(250, "easeInQuad");
				}
			);	

		} else {	
		
			$("li.menu-item-depth-0,li.menu-item-simple-parent ul li" ).hover(function(){
				//mouseover 
				if( $(this).find(".megamenu-child-container").length  ){
					$(this).find(".megamenu-child-container").stop().fadeIn('fast');
				} else {
					$(this).find("> ul.sub-menu").stop().fadeIn('fast');
				}
			
			},function(){
				//mouseout
				if( $(this).find(".megamenu-child-container").length ){
					$(this).find(".megamenu-child-container").stop(true, true).hide();
				} else {
					$(this).find('> ul.sub-menu').stop(true, true).hide(); 
				}
			});

		}

	}//Menu Hover End
	
	$("div.dt-video-wrap").fitVids();

	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i) || navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ) ? true : false;
	
	var currentWidth = window.innerWidth || document.documentElement.clientWidth;
	
	if(typeof dttheme_urls !== 'undefined') {
		
        if (dttheme_urls.nicescroll == "enable") {
            $("html").niceScroll({
                zindex: 999999,
                cursorborder: "1px solid #424242"
            });
        }
		
		//Sticky Navigation
		if( isMobile && dttheme_urls.mobilestickynav == "enable" ) {
			$(dttheme_urls.stickyele).sticky({ topSpacing: 0 });
		}
		if( dttheme_urls.stickynav === "enable" && currentWidth > 767 ) {
			$(dttheme_urls.stickyele).sticky({ topSpacing: 0 })
			.on('sticky-start', function() { $('body').addClass('sticky-header'); })
			.on('sticky-end', function() { $('body').removeClass('sticky-header'); });
		}		
    }

	//Mobile Menu
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		
		var $menu = $("nav#main-menu").find("ul.menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
		
		var $right = $("nav#main-menu").find("ul.menu-right");
		if( $right.length ) {
			$right.slideToggle(function(){
				$right.css('overflow' , 'visible');
				$right.toggleClass('menu-toggle-open');
			});			
		}		
	});

	$(".dt-menu-expand").click(function(){
		if( $(this).hasClass("dt-mean-clicked") ){
			$(this).text("+");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideUp(300);
			} else {
				$(this).prev('.megamenu-child-container').find('ul:first').slideUp(300);
			}
		} else {
			$(this).text("-");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideDown(300);
			} else{
				$(this).prev('.megamenu-child-container').find('ul:first').slideDown(300);
			}
		}
		
		$(this).toggleClass("dt-mean-clicked");
		return false;
	});

	currentWidth = window.innerWidth || document.documentElement.clientWidth;
	if( currentWidth > 767 ){
		infiMenuHover();
	}
	//Mobile Menu End	
	
	if(dttheme_urls.menusearchtype === 'type1' || dttheme_urls.menusearchtype === 'type3') {
		$('.dt-search-icon').on('click', function(e){
			e.stopPropagation();
			$('#header .top-menu-search-container').toggleClass('show-top-menu-search');
		});
	}
	
	//Portfolio single
	$('.dt-portfolio-single-slider').each(function(){

		var $pagination = $arrow = $thumbnail = $centermode = $variablewidth = $autocarousel = false;

		var $numberofslides = parseInt($(this).attr('data-numberofslides'), 10); 
		var $slidewidth = $(this).attr('data-slidewidth'); 

		if($(this).attr('data-thumbnail') !== undefined) { 
			var $pagination = true; 
			var $thumbnail = $(this).parents('.dt-portfolio-single-slider-wrapper').find('#bx-pager'); 
		}

		if($(this).attr('data-arrow') !== undefined) { 
			var $arrow = true; 
		}

		if($(this).attr('data-pagination') !== undefined) { 
			var $pagination = true; 
		}

		if($(this).attr('data-centermode') !== undefined) { 
			var $centermode = true; 
			var $variablewidth = true; 
		}

		if($(this).attr('data-variablewidth') !== undefined) { 
			var $variablewidth = true; 
			$numberofslides = 1;
		}	

		if($(this).attr('data-autocarousel') !== undefined) { 
			var $autocarousel = true; 
		}	

		if( $(this).find("li").length > 1 ) {

			if($centermode || $variablewidth) {

			    $(this).slick({
			    	autoplay: $autocarousel,
			        dots: $pagination,
			        infinite: true,
			        centerMode: $centermode,
			        slidesToShow: $numberofslides,
			        slidesToScroll: 1,
			        arrows: $arrow,
			        variableWidth: $variablewidth,
			        swipe: true,
			    });	

			} else {

				if(($slidewidth != '' && $slidewidth > 0) || $numberofslides > 1) {

					$(this).bxSlider({ auto:$autocarousel, video:true, useCSS:false, pager: $pagination, autoHover:true, adaptiveHeight:true, controls:$arrow, pagerCustom: $thumbnail, infiniteLoop:true,  nextText:'<i class="icomoon icon-Arrow-OutRight"></i>', prevText:'<i class="icomoon icon-Arrow-OutLeft"></i>', slideWidth: $slidewidth, minSlides: 1, maxSlides: $numberofslides, moveSlides: 1, responsive:true, touchEnabled:true});

				} else {

					$(this).bxSlider({ auto:$autocarousel, video:true, useCSS:false, pager: $pagination, autoHover:true, adaptiveHeight:true, controls:$arrow, pagerCustom: $thumbnail, infiniteLoop:true,  nextText:'<i class="icomoon icon-Arrow-OutRight"></i>', prevText:'<i class="icomoon icon-Arrow-OutLeft"></i>', touchEnabled:true});

				}

			}

		}

	});


	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"], a[data-gal^="prettyPhoto[gallery-listing]"]');
	if ($pphoto.length) {
		$pphoto.prettyPhoto({
			hook: 'data-gal',
			show_title: false,
			deeplinking: false,
			social_tools: false,
			default_width: 500,
			default_height: 344
       });
	}

	$('.downcount').each(function(){
		var el = $(this);
		el.downCount({
			date	: el.attr('data-date'),
			offset	: el.attr('data-offset')
		});
	});
	
	$('p:empty').each(function (){
		$(this).next('br').remove();
		$(this).remove();
	});

	if( currentWidth > 767 ){
		if( $('#primary').hasClass('with-both-sidebar') ) {
		   if( ( $('#secondary-left').is(':empty') && $('#secondary-right').is(':empty')) ){
				$('#primary').css({'width': '100%', 'margin': 0});
		   }
		} else if( $('#primary').hasClass('with-left-sidebar') ) {
		   if( $('#secondary-left').is(':empty') ){
				$('#primary').css({'width': '100%', 'margin': 0});
		   }
		} else if( $('#primary').hasClass('with-right-sidebar') ) {
		   if( $('#secondary-right').is(':empty') ){
				$('#primary').css({'width': '100%', 'margin': 0});
		   }
		}
	}

	$('.dt-sc-contact-details-on-map a.map-switch-icon').on( "click", function() {
		$(this).parents('.dt-sc-contact-details-on-map').toggleClass('hide-overlay');
		$('.dt-sc-map-overlay').toggle();		
		return false;
	});

	$('.dt-sc-contact-details-on-map a.switch-icon').on( "click", function() {
		$(this).parents('.dt-sc-contact-details-on-map').addClass('hide-overlay');
		$('.dt-sc-map-overlay').toggle();
		$('.back-to-contact').toggle();
		return false;
	});

	$('.dt-sc-contact-details-on-map a.back-to-contact').on( "click", function() {
		$(this).parents('.dt-sc-contact-details-on-map').removeClass('hide-overlay');
		$('.dt-sc-map-overlay').toggle();
		$(this).toggle();
		return false;
	});

	//Smart Resize Start
	$(window).bind("resize", function() {
		
		//Blog Template
		if( $(".apply-isotope").length ) {
			$(".apply-isotope").isotope();
		}

  		var $portfolio_container = jQuery('.dt-sc-portfolio-container:not(.dt-sc-infinite-portfolio-container, .portfolio-container-carousel)');
  		$portfolio_container.find('.column').removeClass('animate');
        $portfolio_container.isotope();

	});


	function animatePortfolioSection(){
		$('.portfolio.animate').each(function(){
			$(this).one('inview', function (event, visible) {
				if (visible == true) {
					var $this = $(this),
					$animation = ( $this.data("animationeffect") !== undefined ) ? $this.data("animationeffect") : "slideUp";
					var	$delay = ( $this.data("animationdelay") !== undefined ) ? $this.data("animationdelay") : 400;

					setTimeout(function() { $this.addClass($animation);	},$delay);
				}
			});
		});
		$(window).scroll();
	}


	// Window Load Start
	$(window).load(function(){

		var portfolioHeight = $('.dt-sc-portfolio-wrapper .portfolio:first').height();
		$('.icon-link-title').css('height', portfolioHeight+'px');	
		
		//Blog Template
		if( $(".apply-isotope").length ) {
			$(".apply-isotope").isotope();
		}
		//Blog Template End

		animatePortfolioSection();

		//Portfolio Isotope
  		var $portfolio_container = jQuery('.dt-sc-portfolio-container:not(.dt-sc-infinite-portfolio-container, .portfolio-container-carousel)');
        $portfolio_container.isotope();

		if($("div.dt-sc-portfolio-sorting").length){
			$("div.dt-sc-portfolio-sorting a").on('click',function(){

				$("div.dt-sc-portfolio-sorting a").removeClass("active-sort");
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");

				$(this).parents('.dt-sc-portfolio-container-wrapper').find('.dt-sc-portfolio-container:not(.dt-sc-infinite-portfolio-container, .portfolio-container-carousel) .column').removeClass('animate flash shake bounce tada swing wobble pulse flip flipIn flipOutX flipInY flipOutY fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig bounceIn bounceInUp bounceInDown bounceInLeft bounceInRight bounceOut bounceOutUp bounceOutDown bounceOutLeft bounceOutRight rotateIn rotateInUpLeft rotateInDownLeft rotateInUpRight rotateInDownRight rotateOut rotateOutUpLeft rotateOutDownLeft rotateOutUpRight rotateOutDownRight hinge rollIn rollOut lightSpeedIn lightSpeedOut slideDown slideUp slideLeft slideRight slideExpandUp expandUp expandOpen bigEntrance hatch floating tossing pullUp pullDown stretchLeft stretchRight zoomIn');
				$(this).parents('.dt-sc-portfolio-container-wrapper').find('.dt-sc-portfolio-container:not(.dt-sc-infinite-portfolio-container, .portfolio-container-carousel)').isotope({ filter: selector, masonry: {  }, animationEngine : 'jquery' });

				return false;

			});
		}


		portfolioRepeatAnimation();
		function portfolioRepeatAnimation() {
			var divs = $('.dt-sc-portfolio-container.repeat-animation .portfolio.animate');
			if(divs.length) {
			    setTimeout(function() {
			    	var index = Math.floor(Math.random() * divs.length);
			    	divs.eq(index).removeClass('animate');
			    	setTimeout(function() {
			        	divs.eq(index).addClass('animate');
			        	portfolioRepeatAnimation();
			         }, 200);
			    }, ~~(Math.random()*(300-60+1)+2000));
		    } 			
		}
		
		//Gallery Post Slider
		if( ($("ul.entry-gallery-post-slider").length) && ( $("ul.entry-gallery-post-slider li").length > 1 ) ){
			$("ul.entry-gallery-post-slider").bxSlider({auto:false, video:true, useCSS:false, pager:'', autoHover:true, adaptiveHeight:true});
		}
		
		// portfolio carousel
		$('.portfolio-container-carousel').each(function() {

			var column = $(this).attr('data-column');
			var carouselopts = $(this).attr('data-carouselopts');

			if(carouselopts == 'arrow' || carouselopts == 'autowitharrow') {
				var $prev = $(this).parents('.portfolio-container-carousel-wrapper').find(".portfolio-prev");
				var $next = $(this).parents('.portfolio-container-carousel-wrapper').find(".portfolio-next");
			} else {
				var $prev = '';
				var $next = '';
			}

			var $auto = false;
			if(carouselopts == 'auto' || carouselopts == 'autowitharrow') {
				var $auto = true;
			}

			$(this).carouFredSel({
				responsive: true,
				auto: $auto,
				width: '100%',
				prev: $prev,
				next: $next,
				height: 'variable',
				scroll: parseInt(1),
				items: {
					visible:{
						min: 1,
						max: parseInt(column)
					}
				},
				onCreate: function(){
					var $this = $(this);
					var $animation = ( $this.data("animationeffect") !== undefined ) ? $this.data("animationeffect") : '';
					var	$delay = ( $this.data("animationdelay") !== undefined ) ? $this.data("animationdelay") : '';

					setTimeout(function() { $this.addClass($animation);	},$delay);
				}
			});

		});


		// Fixed footer height
		if($('#footer').length) {
			if($('#footer').hasClass('fixed-footer')) {
				var height = $('#footer').find('.fixed-footer-container').height();
				$('#footer').css('height', height);
			}
		}		

	});

	$(".dt-like-this").click(function(){

		var el = jQuery(this);

		if( el.hasClass('liked') ) {
			return false;
		}

		var post = {
			action: 'infi_like_love',
			post_id: el.attr('data-id')
		};

		$.post(dttheme_urls.ajaxurl, post, function(data){
			el.find('span').html(data);
			el.addClass('liked');
		});
		return false;
	});

	if($('body').hasClass('page-template-tpl-onepage')) {
		$('nav#main-menu ul.menu').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
		$('nav#main-menu ul.menu-left').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
		$('nav#main-menu ul.menu-right').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
		$('.left-header nav#main-menu ul.menu, .left-header-boxed nav#main-menu ul.menu, .left-header-creative nav#main-menu ul.menu').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
	} else {
		if($('nav#main-menu ul.menu li a[href^="#"]').length){
			$('nav#main-menu ul.menu li a[href^="#"]').on('click', function(e) {
				$(location).attr('href', dttheme_urls.url+'/' + $(this).attr('href'));
			});
		}
	}

	if($('body').hasClass('left-header-creative')) {

		$('#header-wrapper').simpleSidebar({
			opener: '#toggle-sidebar',
			wrapper: '#main',
			animation: {
				easing: "easeOutQuint"
			},
			sidebar: {
				align: 'left',
				width: '50%',
			},
			sbWrapper: {
				display: true
			},
			mask: {
				display: false,
			}
		});
		
		$('#toggle-sidebar, div[data-simplesidebar="mask"]').click(function(){
			$('#toggle-sidebar').toggleClass('close-icon');
		});	

	}
	$('input, textarea').placeholder();

	if($(".dt-sc-scroll-wrapper").length){
		var scroll_wrapper = $(".dt-sc-scroll-wrapper").niceScroll({ cursorcolor:"#ffffff", cursorwidth: "2px"});
		scroll_wrapper.rail.addClass('dt-sc-skin');
	}

	// Portfolio custom scripts
	$('.portfolio-container-fullpage:not(.disable-fullpage-jquery)').each(function() {
		$(this).fullpage({
			navigation: true,
			navigationPosition: $(this).attr('data-fullpagenavigation'),
			css3: true,
			autoScrolling: $(this).attr('data-disableautoscrolling'),
			fitToSection: false,
			scrollBar: true,
			responsiveSlides: true,
			responsiveWidth: 767,
		});
	});	

	if(currentWidth > 767) {
		$('.dt-portfolio-single-fullpage-carousel-wrapper').each(function() {
			$(this).fullpage({
				navigation: false,
				css3: true,
				autoScrolling: false,
				fitToSection: false,
				scrollOverflow: true,
		        controlArrows: true,
		        controlArrowColor: '#000',
		        responsiveSlides: true,
		        responsiveWidth: 767,
			});
		});
	}

	$('.portfolio-parallax').each(function() {
	    $(this).jarallax({
	        imgWidth: 1366,
	        imgHeight: 768
	    });
    });

	$('.dt-sc-portfolio-single-fullscreen-slider, .dt-sc-portfolio-fullpage-carousel').find('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav'
	});

	$('.dt-sc-portfolio-single-fullscreen-slider, .dt-sc-portfolio-fullpage-carousel').find('.slider-nav').slick({
		slidesToShow: parseInt($('.dt-sc-portfolio-single-fullscreen-slider, .dt-sc-portfolio-fullpage-carousel').find('.slider-nav').attr('data-itemscnt'), 10)-1,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: true,
		arrows: false,
		centerMode: false,
		focusOnSelect: true
	});

	$('.dt-sc-portfolio-single-fullscreen-slider, .dt-sc-portfolio-fullpage-carousel, .single-portfolio-mediaontop-section-holder').each(function() {
		$(this).fullpage({
			autoScrolling: false,
			css3: true,
			fitToSection: false,
			responsiveSlides: true,
			responsiveWidth: 767,
		});
	});

	if($('#portfolio-featured-video').length) {
		$('#portfolio-featured-video').get(0).play();
	}

	$(window).scroll( function() {

		if($('body').hasClass('animated-right-header')) {
			if($(window).scrollTop() > 0) {
				$('#header-wrapper').removeClass('hideMenu');
			} else {
				$('#header-wrapper').addClass('hideMenu');
			}			
		}

	});

	$( '.nav-menu-icon' ).on('click', function() {
		$('.menu-item.menu-item-depth-0').each(function(i){
			var menuitem = $(this);
			setTimeout(function() {
				menuitem.toggleClass('menu-item-show');
			}, 100*i);
		});
		$(this).find('span').each(function(i){
			var iconitem = $(this);
			setTimeout(function() {
				iconitem.toggleClass('animate-icon');
			}, 100*i);			
		});
		$('#menu-wrapper').toggleClass('nav-show');
	});
	
   
	if($('.dt-sc-onepage-navigation-title-holder').length) {

		$('.dt-sc-onepage-navigation-title-holder li a').click(function() {
			if($(this).parents('.dt-sc-onepage-navigation-title-holder').hasClass('rounded')) {
				$('.dt-sc-onepage-navigation-title-holder li').removeClass('active');
				$(this).parent('li').addClass('active');
				$.scrollTo($(this).attr('href'), 750);
			} else {
				$('.dt-sc-onepage-navigation-title-holder li a').removeClass('active');
				$(this).addClass('active');
				$.scrollTo($(this).attr('href'), 750);
			}
		});

		$(window).scroll(function() {
			$('.dt-sc-onepage-navigation-title-holder li a').each(function(){
				var section_id = $(this).attr('href');

				if($(window).scrollTop() == 0) {

					if($(this).parents('.dt-sc-onepage-navigation-title-holder').hasClass('rounded')) {
						$('.dt-sc-onepage-navigation-title-holder li').removeClass('active');
						$('.dt-sc-onepage-navigation-title-holder li:first').addClass('active');
					} else {
						$('.dt-sc-onepage-navigation-title-holder li a').removeClass('active');
						$('.dt-sc-onepage-navigation-title-holder li a:first').addClass('active');
					}

				} else {

				    var top_of_element = $(section_id).offset().top+200;
				    var bottom_of_element = $(section_id).offset().top + $(section_id).outerHeight();
				    var bottom_of_screen = $(window).scrollTop() + $(window).height();

				    if((bottom_of_screen > top_of_element) && (bottom_of_screen < bottom_of_element)){
						if($(this).parents('.dt-sc-onepage-navigation-title-holder').hasClass('rounded')) {
							$('.dt-sc-onepage-navigation-title-holder li').removeClass('active');
							$('.dt-sc-onepage-navigation-title-holder li a[href="'+section_id+'"]').parent('li').addClass('active');
						} else {				    	
							$('.dt-sc-onepage-navigation-title-holder li a').removeClass('active');
							$('.dt-sc-onepage-navigation-title-holder li a[href="'+section_id+'"]').addClass('active');
						}
				    }

				}
		    });
		});
		
	}

	if($('.dt-sc-fixed-content').length) {
        $('.dt-sc-fixed-content').niceScroll({
            zindex: 999999,
            cursorborder: "1px solid #424242"
        });		
	}

	if($('.fullpage-portfolio .dt-portfolio-single-details').length) {
        $('.fullpage-portfolio .dt-portfolio-single-details').niceScroll({
            zindex: 999999,
            cursorborder: "1px solid #424242"
        });		
	}
	
});

(function() {

	function infitoggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}
	
	if(jQuery('div.overlay.overlay-hugeinc').length) {
		
		var triggerBttn = document.getElementById( 'trigger-overlay' ),
			overlay = document.querySelector( 'div.overlay' ),
			closeBttn = overlay.querySelector( 'div.overlay-close' );
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
			support = { transitions : Modernizr.csstransitions };
			
		triggerBttn.addEventListener( 'click', infitoggleOverlay );
		closeBttn.addEventListener( 'click', infitoggleOverlay );
	}

	if(dttheme_urls.menusearchtype === 'type2') {

		if(jQuery('div.overlay.overlay-search').length) {
			
			var triggerBttn = document.getElementById( 'dt-search-icon' ),
				overlay = document.querySelector( 'div.overlay' ),
				closeBttn = overlay.querySelector( 'div.overlay-close' );
				transEndEventNames = {
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'transitionend',
					'OTransition': 'oTransitionEnd',
					'msTransition': 'MSTransitionEnd',
					'transition': 'transitionend'
				},
				transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
				support = { transitions : Modernizr.csstransitions };
				
			triggerBttn.addEventListener( 'click', infitoggleOverlay );
			closeBttn.addEventListener( 'click', infitoggleOverlay );
		}	

	}
	
})();