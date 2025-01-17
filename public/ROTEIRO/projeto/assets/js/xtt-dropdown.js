if (!window.matchMedia){ window.matchMedia = function(){ return { matches:false }; }; }
(function($){

	var isSmallDevice = window.matchMedia("(max-width: 992px)").matches; //Changes functionality on small devices

	var mainNav = {

		handleEvents : function(){
			$("#menu-collapse > ul > li.xtt-has-children > a").on("click", function(ev){ev.preventDefault();});
			$("#menu-collapse > ul.navbar-nav > li.xtt-has-children > a").on("click", mainNav.preventDefaultTouchBehavior);
			$("#menu-collapse > ul.navbar-nav > li.xtt-has-children > ul > li.xtt-has-children > a").on("click", mainNav.preventDefaultTouchBehavior);
			// $('#menu-collapse .navbar-nav li > a').on('click', mainNav.preventDefaultTouchBehavior); // Fix events for large touch devices
			$('#menu-collapse .navbar-toggle').on('click', mainNav.toggleResponsiveMenu);
		},

		preventDefaultTouchBehavior : function(e) {
			var jqThis = $(this).parent();
			// if (!isSmallDevice) {
			// jqThis.siblings().removeClass('open');
			// }
			
			$parents = $(this).parentsUntil('ul.nav');
			if ( $parents.size() < 5 ){

				if(jqThis.find('ul').length > 0 && (isSmallDevice || $('html').hasClass('touch')) ){
					e.preventDefault();
					jqThis.siblings().removeClass('open').end().parent().siblings().find('.open').removeClass('open');
					jqThis.toggleClass('open');
				}
				
				var aThis = jqThis.find('>:first-child');
				if(aThis.attr('href') == '#'){
					e.preventDefault();
				}
			}
		},

		duplicateTouchLink : function() {
			if(isSmallDevice || $('html').hasClass('touch')){
				$('.xtt-main-navbar .navbar-nav li.xtt-has-children').each(function(){
					var jqThis = $(this);
					var elementURL = jqThis.find('> a').attr('href');
					var elementContent = jqThis.find('> a').html();
					if(elementURL!='#'){
						jqThis.find('> ul').prepend('<li class="xtt-direct-link"><a href="'+ elementURL +'" title="'+elementContent+'">'+elementContent+'</a></li>'); //TODO Usar jquery templates
					}
				});
			}
		},

		toggleResponsiveMenu : function(){
			$('.xtt-main-navbar .navbar-collapse').toggleClass('collapse').toggleClass('in');
		}
	};
	
	$(document).ready(function (){
		mainNav.handleEvents();
		mainNav.duplicateTouchLink();
	});

})(jQuery);
