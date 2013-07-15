(function($) {
	
	$.fn.jav = function(options) {
		var opts = $.extend({}, $.fn.jav.defaults, options);
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			switch (o.type){
				case 'success':
				case 'error':
				case 'forbid':
				case 'notice':
				case 'modal':
					$this.click(function(e){
						if(!$('.jav').length){
							switch (o.type){
								case 'success':
								case 'error':
								case 'forbid':
								case 'notice':
									if (!o.close){ timeout = setTimeout('$.fn.jav.removejav()',o.time); }
								
									var message_span = $(document.createElement('p')).html('<img src="'+o.imageFile+o.type+'.png" alt="" title="'+o.type+'" />&nbsp;' + o.message);
									var wrap_jav;
									(o.position == 'bottom') ? 
									wrap_jav = $(document.createElement('div')).addClass('jav-' + o.type + ' jav jav-bottom'):
									wrap_jav = $(document.createElement('div')).addClass('jav-' + o.type + ' jav jav-top') ;
									
									if(o.close && o.time !== 0){
										var remove_cross = $(document.createElement('a')).addClass('jav-cross');
										remove_cross.click(function(e){$.fn.jav.removejav();})
									}
									else if (o.time !== 0){				
										wrap_jav.css({"cursor" : "pointer"});
										wrap_jav.click(function(e){$.fn.jav.removejav();})
									}
									wrap_jav.append(message_span).append(remove_cross).hide().appendTo('body').fadeIn('fast');
									break;
								case 'modal':
									var bodHeight = $(window).height();
									var bodWidth = $(window).width();
									var wrap_jav = $(document.createElement('div')).addClass('jav jav-overlay').css('height',bodHeight).css('width',bodWidth);
									wrap_jav.hide().appendTo('body').fadeIn('fast').click(function(e){$.fn.jav.removeModal(o.modal);});
									
									$(o.modal).css('top', bodHeight/2-$(o.modal).height()/2);
									$(o.modal).css('left', bodWidth/2-$(o.modal).width()/2);
									$(".closeCross").click(function(e){$.fn.jav.removeModal(o.modal);});
									$(o.modal).fadeIn(); 
									break;
							}
						}
					});
					break;
				case 'tooltip':
					$this.hover(function(e){
						if(!$('.jav-tip').length){
							if (o.image != '') { var tooltip = $(document.createElement('p')).html('<img src="'+o.image+'" alt="" title="" />'); }
							else { var tooltip = $(document.createElement('p')).html(o.message); }
							var wrap_jav = $(document.createElement('div')).addClass('jav-tip ' + o.tooltipStyle).css({"position":"absolute","display":"block", "top":e.pageY+5, "left":e.pageX+5});
							wrap_jav.append(tooltip).appendTo('body').fadeIn('slow');
						}
					});
					if (o.movable){
						$this.mousemove(function(e){
							if($('.jav-tip').length){
								$('.jav-tip').css({"top":e.pageY+15, "left":e.pageX+5});
							}
						});
					}
					if (!o.sticky){
						$this.mouseout(function(e){
							if($('.jav-tip').length){
								$("div").remove(".jav-tip");
							}
						});
					}																
				break;
			};
		});
	};
	var timeout;
	$.fn.jav.removejav 	= function() {
		if($('.jav').length){
			clearTimeout(timeout);
			$('.jav').fadeOut('fast',function(){
				$(this).remove();
			});
		}
	}
	$.fn.jav.removeModal	= function(modal) {
		if($(modal).length){
			$(modal).fadeOut('fast',function(){ $(this).css({'display':'none'}); });
			$('.jav-overlay').fadeOut('fast',function(){ $(this).remove(); });
		}
	};
	$.fn.jav.defaults = {
		type			: 'tooltip',
		position		: 'top',
		close		    : false,
		time			: 5000,
		movable			: true,
		sticky			: false,
		modal			: '#jav-box',
		image			: '',
		imageFile		: 'img/',
		tooltipStyle	: 'tooltip'
	};
	
})(jQuery);