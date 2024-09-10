$(document).ready(function(){
	/*============================================
	Navigation Functions
	==============================================*/
	if ($(window).scrollTop() === 0){
		$('#main-nav').removeClass('scrolled');
	}
	else{
		$('#main-nav').addClass('scrolled');    
	}
	$(window).scroll(function(){
		if ($(window).scrollTop() === 0){
			$('#main-nav').removeClass('scrolled');
		}
		else{
			$('#main-nav').addClass('scrolled');
		}
	});

	/*============================================
	ScrollTo Links
	==============================================*/
    var sections = $('section');
    var navItems = $('.nav-item');

    $(window).on('scroll', function () {
        var currentScroll = $(this).scrollTop() + 50;

        sections.each(function () {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                var id = $(this).attr('id');

                navItems.removeClass('active');

                $('.nav-item a[href="#' + id + '"]').parent().addClass('active');
            }
        });
    });

	/*============================================
	Banner Text Rotator
	==============================================*/
	$('#banner .text-col h1').fitText(.9,{ 
		minFontSize: '35px', maxFontSize: '55px' 
	});
	$('#banner .text-col p').fitText(1.2,{ 
		minFontSize: '16px', maxFontSize: '25px' 
	});

	$('#banner .text-col h1, #banner .text-col p, #banner .imac-frame').addClass('in');
	
	/*============================================
	Project thumbs - Masonry
	==============================================*/
	var itemsToShow = 12;
	var $container = $('#projects-container');

	$container.masonry({
		itemSelector: '.project-item:not(.filtered)',
		columnWidth: 320,
		fitWidth: true,
		gutter: 25
	});

	var $items = $container.find('.project-item');

	function updateItemsVisibility(){
		var visibleItems = $container.find('.project-item:not(.filtered)');
		visibleItems.slice(itemsToShow).addClass('hidden');
		$container.masonry('layout');

		if (visibleItems.length > itemsToShow){
			$('#load-more').show();
		}
		else{
			$('#load-more').hide();
		}
	}

	updateItemsVisibility();

	function filterProjects(category){
		$container.masonry('destroy');

		$items.each(function(){
			if ($(this).is(category) || category === '*'){
				$(this).removeClass('filtered hidden');
			}
			else{
				$(this).addClass('filtered');
			}
		});

		$container.masonry({
			itemSelector: '.project-item:not(.filtered)',
			columnWidth: 320,
			fitWidth: true,
			gutter: 25
		});

		updateItemsVisibility();
	}

	$('#load-more').click(function(){
		var hiddenItems = $container.find('.project-item.hidden').slice(0, itemsToShow);
		hiddenItems.removeClass('hidden');
		$container.masonry('layout');

		if ($container.find('.project-item.hidden').length === 0){
			$('#load-more').hide();
		}
	});

	$('#filter-works a').click(function (e){
		e.preventDefault();

		$('#filter-works li').removeClass('active');
		$(this).parent('li').addClass('active');

		var category = $(this).attr('data-filter');
		filterProjects(category);
	});

	/*============================================
	Project Preview
	==============================================*/
	$('.project-item').click(function (e){
		e.preventDefault();
	
		var elem = $(this),
			title = elem.find('.project-title').text(),
			descr = elem.find('.project-description').html(),
			elemDataCont = elem.find('.project-description');
	
		var imageSrc = elem.find('.project-description').data('images').split(',')[0];
	
		var imageHtml = '<div class="single-image"><img src="' + imageSrc + '" class="img-fluid" alt="' + title + '" title="' + title + '"></div>';
	
		var projectModal = new bootstrap.Modal(document.getElementById('project-modal'), {
			backdrop: false
		});
	
		$('#project-modal').on('show.bs.modal', function(){
			var modal = $(this);
	
			modal.find('#hdr-title').text(title);
			modal.find('#sdbr-title').text(title);
			modal.find('#project-content').html(descr);
			modal.find('.screen').html(imageHtml);
	
			if (elemDataCont.data('category')){
				modal.find('#sdbr-category').show().text(elemDataCont.data('category'));
			} else{
				modal.find('#sdbr-category').hide();
			}
	
			if (elemDataCont.data('client')){
				modal.find('#sdbr-client').show().text(elemDataCont.data('client'));
			} else{
				modal.find('#sdbr-client').hide();
			}
	
			if (elemDataCont.data('descr')){
				modal.find('#sdbr-descr').show().text(elemDataCont.data('descr'));
			} else{
				modal.find('#sdbr-descr').hide();
			}
	
			modal.find('.single-image img').on('load', function(){
				setTimeout(function(){
					modal.find('.loader').fadeOut();
					modal.find('.screen').css('opacity', 1);
				}, 2000);
			});
		});
	
		projectModal.show();
	});
	
	$('#project-modal').on('hidden.bs.modal', function(){
		var modal = $(this);
		modal.find('.loader').show();
		modal.find('.screen')
			.css('opacity', 0)
			.html('');
	});

	/*============================================
	ScrollTo Links
	==============================================*/
	$('a.scrollto').click(function(e){
		$('html,body').scrollTo(this.hash, this.hash,{gap:{y:-50},animation: {easing: 'easeInOutCubic', duration: 1600}});
		e.preventDefault();
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});

	/*============================================
	Contact Form
	==============================================*/
	$('#contact-form input, #contact-form textarea').val('');

	$('.label_better').label_better({
	  easing: 'bounce',
	  offset: 5
	});

	/*============================================
	Tooltips
	==============================================*/
	$('[data-toggle="tooltip"]').tooltip();
	
	/*============================================
	Placeholder Detection
	==============================================*/
	if (!Modernizr.input.placeholder){
		$('#contact-form').addClass('no-placeholder');
	}

	/*============================================
	Scrolling Animations
	==============================================*/
	$('.scrollimation').waypoint(function(){
		var element = $(this.element);
		element.addClass('in');
	},{
		offset: function(){
			var h = $(window).height();
			var elemh = $(this.element).outerHeight();
			if (elemh > h*0.3){
				return h*0.7;
			} 
			else{
				return h - elemh;
			}
		}
	});
	
	/*============================================
	Resize Functions
	==============================================*/
	$(window).resize(function(){
		scrollSpyRefresh();
		waypointsRefresh();
	});

	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		}, 1000);
	}

	/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			Waypoint.refreshAll();
		}, 1000);
	}
});
