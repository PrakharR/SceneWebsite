jQuery(document).ready(function($){
	var sliderContainers = $('.cd-slider-wrapper');
	if( sliderContainers.length > 0 ) initBlockSlider(sliderContainers);

	function initBlockSlider(sliderContainers) {
        sliderContainers.each(function(){
			var sliderContainer = $(this),
				slides = sliderContainer.children('.cd-slider').children('li'),
				sliderPagination = createSliderPagination(sliderContainer);

			sliderPagination.on('click', function(event){
				event.preventDefault();
				var selected = $(this),
					index = selected.index();
				updateSlider(index, sliderPagination, slides);
			});

			sliderContainer.on('swipeleft', function(){
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if(!visibleSlide.is(':last-child') && bool) {updateSlider(visibleSlideIndex + 1, sliderPagination, slides);}
			});

			sliderContainer.on('swiperight', function(){
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if(!visibleSlide.is(':first-child') && bool) {updateSlider(visibleSlideIndex - 1, sliderPagination, slides);}
			});
          
          //Auto-rotate
          
            var rotationInterval = $('.cd-slider').attr('data-interval');
            var timer = setInterval(function () {

              var counter = $('.cd-slider-navigation li').index($('.selected')) + 1;

              if (counter === 6) {
                counter = 0;
              }

              updateSlider(counter, sliderPagination, slides);

            }, rotationInterval);
           
        });
	}
  
  

	function createSliderPagination(container){
		var wrapper = $('<ol class="cd-slider-navigation"></ol>');
		container.children('.cd-slider').find('li').each(function(index){
			var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
				dot = $('<a href="#0"><i class="ion-record"></i></a>').appendTo(dotWrapper);
			dotWrapper.appendTo(wrapper);
			//var dotText = ( index+1 < 10 ) ? '0'+ (index+1) : index+1;
			//dot.text(dotText);
		});
		wrapper.appendTo(container);
		return wrapper.children('li');
	}

	function updateSlider(n, navigation, slides) {
		navigation.removeClass('selected').eq(n).addClass('selected');
		slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

		//fixes a bug on Firefox with ul.cd-slider-navigation z-index
		navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$(this).removeClass('slider-animating');
		});
	}

	function enableSwipe(container) {
		return ( container.parents('.touch').length > 0 );
	}
  
  
  /* SCROLL TO USING NAVIGATION LINKS */
  
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      var offset = -50;
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          
        if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top + offset
            }, 1000);
            return false;
          }
      }
    });
  });
  
  /* CHANGE NAVIGATION ITEM BASED ON PAGE LOCATION */
  
  $('.about').waypoint(function(direction) {
    $('nav ul').find('.selected-nav').removeClass('selected-nav');
    if (direction == "down") {
      $('.nav-about').addClass('selected-nav');
    } else {
      $('.nav-about').removeClass('selected-nav');
    }
  }, {
    offset: '100px'
  });
  
  $('.events').waypoint(function(direction) {
    $('nav ul').find('.selected-nav').removeClass('selected-nav');
    if (direction == "down") {
      $('.nav-events').addClass('selected-nav');
    } else {
      $('.nav-events').removeClass('selected-nav');
      $('.nav-about').addClass('selected-nav');
    }
  }, {
    offset: '100px'
  });
  
  $('.team').waypoint(function(direction) {
    $('nav ul').find('.selected-nav').removeClass('selected-nav');
    if (direction == "down") {
      $('.nav-team').addClass('selected-nav');
    } else {
      $('.nav-team').removeClass('selected-nav');
      $('.nav-events').addClass('selected-nav');
    }
  }, {
    offset: '100px'
  });
  
  $('.contact').waypoint(function(direction) {
    $('nav ul').find('.selected-nav').removeClass('selected-nav');
    if (direction == "down") {
      $('.nav-contact').addClass('selected-nav');
    } else {
      $('.nav-contact').removeClass('selected-nav');
      $('.nav-team').addClass('selected-nav');
    }
  }, {
    offset: '100px'
  });
  
  $('.faq').waypoint(function(direction) {
    $('nav ul').find('.selected-nav').removeClass('selected-nav');
    if (direction == "down") {   
    } else {
      $('.nav-contact').addClass('selected-nav');
    }
  }, {
    offset: '100px'
  });
  
  
  /* LOAD DIFFERENT COLOR EVERYTIME */
  
  var colorsArray = ["e52c2a","084f85","bdbb31","f58126","fbd20d"];
  
  var randomNumber = Math.floor(Math.random() * 5);
  
  $('.event-date').css("background-color", "#"+colorsArray[randomNumber]);
  
  var red = "e52c2a";
  var blue = "084f85";
  var green = "bdbb31";
  var orange = "f58126";
  var yellow = "fbd20d";
  
  $('.menu-icon').on('click', function(e) {
    $('nav ul').toggleClass("active");
    e.preventDefault();
  });
  
  $('nav ul li a').on('click', function(e) {
    $('nav ul').toggleClass("active");
    e.preventDefault();
  });
  
  
  
});