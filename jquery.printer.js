(function($) {
	$.fn.extend({
		printer: function(options) {
			//
			// Intro
			//
			
			// If more than one element is selected then throw an error.
			if (this.length > 1) {
				throw "Error: You may only select one element to serve as the printer.";
			}
			
			// Extend the options var.
			var settings = $.extend({
				sidebar: 'left',
				height: 'auto',
				width: 'auto',
				speed: 1400,
				shading: true,
				tray: '#tray',
				sidebar: '#sidebar',
				easing: 'swing',
				direction: 'left',
				slideshow: 'false',
				slideshowSpeed: 5000,
				errorMessage: 'There was an internal server error, please try again.',
				criticalErrorMessage: 'The server is not working as expected, please contact the webmaster for assistance.'
			}, options);
			
			// Set up some interal reference vars.
			var currentPage = 0;
			var printer = this.selector;
			var isLoading = false;
			var errorCount = 0;
			var direction;
			
			// Inject needed HTML
			for(var i = 0; i < 2; i++) {
				$(printer+' '+settings.tray).append('<div class="page'+i+' page"><div class="page-gutter"></div></div>');
			}
			$(printer+' '+settings.tray).after('<div style="clear: both;"></div>');
			
			// Add needed CSS
			$(printer).addClass('printer-body');
			$(printer+' '+settings.sidebar).addClass('sidebar');
			$(printer+' '+settings.tray).addClass('tray');
			
			// Load initial page if random is off.
			if (settings.direction != 'random') {
				isLoading = true;
				$(printer+' '+settings.tray).addClass('loading');
				$(printer+' '+settings.tray + ' .page0').css('opacity', '0');
				$(printer+' '+settings.tray + ' .page1').css('opacity', '0');
				
				$.ajax($(printer+' '+settings.sidebar+' a').eq(0).attr('href'), {
					success: function(data) {
						$(printer+' '+settings.tray + ' .page0 .page-gutter').html(data);
						
						$(printer+' '+settings.tray + ' .page0').removeAttr('style').addClass('animated fadeIn');
						$(printer + ' ' + settings.tray + ' .page0').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', done);
						function done() {
							$(printer + ' ' + settings.tray + ' .page0').removeClass('animated fadeIn');
							$(printer+' '+settings.tray + ' .page1').removeAttr('style');
							$(printer + ' ' + settings.tray).removeClass('loading');
							isLoading = false;
						}
					},
					error: function() {
						$(printer+' '+settings.tray + ' .page0 .page-gutter').html('<p>'+settings.errorMessage+'</p>');
						
						$(printer+' '+settings.tray + ' .page0').removeAttr('style').addClass('animated fadeIn');
						$(printer + ' ' + settings.tray + ' .page0').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', done);
						function done() {
							$(printer + ' ' + settings.tray + ' .page0').removeClass('animated fadeIn');
							$(printer + ' ' + settings.sidebar + ' a').removeClass('loading');
							isLoading = false;
						}
					}
				});
			}
			
			
			
			
			//
			// Event Listeners
			//
			$('body').on('click', printer + ' ' + settings.sidebar + ' a', function(event) {
				event.preventDefault();
				if (isLoading == false) {
					isLoading = true;
					// Set up direction var if direction is set to random.
					if (settings.direction == 'random') {
						switch(Math.floor(Math.random()*4)) {
							case 0:
								direction = 'up';
								break;
							case 1:
								direction = 'down';
								break;
							case 2:
								direction = 'left';
								break;
							case 3:
								direction = 'right';
								break;
						}
					} else {
						direction = settings.direction;
					}
					// Begin loading page via AJAX.
					$(this).addClass('loading');
					$.ajax(grabURL(this), {
						success: function (data) {
							printPage(data);
						},
						error: function() {
							errorCount++;
							if (errorCount < 5) {
								printPage('<p>'+settings.errorMessage+'</p>');
							} else {
								printPage('<p>'+settings.criticalErrorMessage+'</p>');
								errorCount = 0;
							}
						}
					});
				}
			});
			// If slideshow mode is on, start the show!
			if (settings.slideshow === true) {
				var slideNo = 0, speed = 0;
				function nextSlide() {
					setTimeout(function() {
						$(printer + ' ' + settings.sidebar + ' a').eq(slideNo).trigger('click');
						if (slideNo == $(printer + ' ' + settings.sidebar + ' a').length) {
							slideNo = 0;
							speed = 0;
						} else {
							slideNo++;
							speed = settings.slideshowSpeed;
						}
						nextSlide();
					}, speed);
				}
				nextSlide();
			}
			
			
			
			//
			// Helper Functions
			//
			function printPage(pageContents) {
				/*$(printer + ' ' + settings.tray + ' .page' + (currentPage+1)).html('<div class="page-gutter">'+pageContents+'</div>').animate({
					left: '0'+'px'
				}, settings.speed, settings.easing, function() {
					$(printer + ' ' + settings.sidebar + ' a').removeClass('loading');
					$(this).attr('class', 'page-1 page');
					$(printer + ' ' + settings.tray + ' .page' + currentPage).css('left', '-'+$(this).width()+'px').attr('class', 'page' + (currentPage+1)+' page');
					$(this).attr('class', 'page0 page');
					isLoading = false;
				});*/
				$(printer + ' ' + settings.tray + ' .page0').attr('class', 'page-1 page');
				$(printer + ' ' + settings.tray + ' .page1').attr('class', 'page0 page');
				$(printer + ' ' + settings.tray + ' .page-1').attr('class', 'page1 page');
				
				$(printer + ' ' + settings.tray + ' .page0').html('<div class="page-gutter">'+pageContents+'</div>');
				$(printer + ' ' + settings.tray + ' .page0').addClass('animated fadeIn'+capitalize(direction)+'Big');
				$(printer + ' ' + settings.tray + ' .page0').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', animComplete);
				function animComplete() {
					$(printer + ' ' + settings.tray + ' .page0').removeClass('animated fadeIn'+capitalize(direction)+'Big');
					$(printer + ' ' + settings.sidebar + ' a').removeClass('loading');
					isLoading = false;
				}
			}
			
			function grabURL(a) {
				return $(a).attr('href');
			}
			function capitalize(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
			
			//
			// Return jQuery Object
			//
			return this;
		}
	});
})(jQuery);