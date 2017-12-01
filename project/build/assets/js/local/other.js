(function ( $ ) {

$.fn.TeleprogrammPage = function(){
  $('body').on('mouseover', '.nv-teleprogramm__list-item', function(){
    $(this).find('.nv-teleprogramm__list-item__popup').addClass('is-active');
  });
  $('body').on('mouseout', '.nv-teleprogramm__list-item', function(){
    $(this).find('.nv-teleprogramm__list-item__popup').removeClass('is-active');
  });
  setTimeout(function() {
    $('.nv-teleprogramm__list').css('opacity', '1');
  }, 1000);
  $('.nv-teleprogramm__list-item__popup').each(function(){
    $(this).css('height', $(this).css('height'));
    $(this).css('top', '-'+parseInt($(this).css('height'))/2+'px');
  });
};



$.fn.InterfaceItems = function(){
  $('#datetimepicker1').datetimepicker({
    format: 'L',
    locale: moment.locale('ru')
  });
};


$.fn.HeaderStyle = function(){


  $('body').on('click', '.nv-header__search__close-btn', function(e){
    e.preventDefault();
    $('.nv-header__search__container-holder').removeClass('is-active');
  });

  $('body').on('click', '.nv-header__holder-meta__list-item__search-link', function(){
    $('.nv-header__search__container-holder').toggleClass('is-active');
  });

  $('body').on('click', '.nv-menu__mobile-btn', function(){
    $('.nv-header__mobile-menu__container').toggleClass('is-active');
    $(this).toggleClass('is-active');
  });




  $("body").on('mouseleave', '.nv-header__projects__menu-holder', function(e) {
    $(".nv-header__projects__menu-holder").removeClass("is-active");
  });
  // $('body').on('mouseover', '.nv-header__holder-menu__list-item__projects__menu .nv-header__holder-menu__list-item__link', function(){
  //   $('.nv-header__projects__menu-holder').toggleClass('is-active');
  // });
  $('body').on('mouseover', '.nv-header__holder-menu__list-item__link', function(){
    // $('.nv-header__projects__menu-holder').toggleClass('is-active');
    console.log($(this).parent());
    if($(this).parent().hasClass('projects__menu')){
      console.log('projects__menu');
      $('.nv-header__projects__menu-holder').addClass('is-active');
    }else{
      $('.nv-header__projects__menu-holder').removeClass('is-active');
    }
  });



  // $('body').on('mouseleave', '.nv-header__holder-menu__list-item__projects__menu', function(){
  //   $('.nv-header__projects__menu-holder').removeClass('is-active');
  // });



}
$.fn.MenuProjects = function(){
if($(window).width() > 576){
  // $('.nv-header__holder-menu_projects').css('width', $('.nv-header__holder-menu_projects').parent().width());
  // $('.nv-header__holder-menu_projects__list-item').each(function(){
  //   var width = $(this).parent().width()/$('.nv-header__holder-menu_projects__list-item').size()-10;
  //   $(this).css('width', width);
  // });
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > 385) {
      $('.nv-header__holder-menu_projects').addClass('fixed');
    } else {
      $('.nv-header__holder-menu_projects').removeClass('fixed');
    }
  });
}


}


var filterFloat = function (value) {
    if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
      .test(value))
      return Number(value);
  return NaN;
}


$.fn.Sliders = function(){
  jQuery('.nv-slider__sidebar').flexslider({
    animation: "slide",
    itemMargin: 40,
    controlNav: false,
    DirectionNav: true,
    direction: "vertical"
  });
  $('.nv-main__slider').flexslider({
    animation: "slide",
    controlNav: false
    });
  $('.nv-main__slider-carousel').flexslider({
    animation: "slide",
    animationLoop: false,
    itemWidth: 210,
    itemMargin: 30,
    minItems: 2,
    maxItems: 4
  });
  setTimeout(function() {
    $('.nv-main__slider-info__container').each(function(){
      $(this).css('height', $('.nv-main__slider-info__container').parent().parent().prev().children().find('img').css('height') )
    });
  }, 500);
  setTimeout(function() {
    $('.nv-main__slider').addClass('is-active');

  }, 800);
}
$.fn.TimelineStyle = function(){
  $('.nv-main__widget-timeline__info').each(function(){
    $(this).css('height', $(this).parent().parent().css('height'));
  });
}




$.fn.SmoothScrolling = function(){


  Math.easeOutQuad = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };

  (function() { // do not mess global space
  var
    interval, // scroll is being eased
    mult = 0, // how fast do we scroll
    dir = 0, // 1 = scroll down, -1 = scroll up
    steps = 50, // how many steps in animation
    length = 30; // how long to animate
  function MouseWheelHandler(e) {
    e.preventDefault(); // prevent default browser scroll
    clearInterval(interval); // cancel previous animation
    ++mult; // we are going to scroll faster
    var delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); // cross-browser
    if(dir!=delta) { // scroll direction changed
      mult = 1; // start slowly
      dir = delta;
    }
    // in this cycle, we determine which element to scroll
    for(var tgt=e.target; tgt!=document.documentElement; tgt=tgt.parentNode) {
      var oldScroll = tgt.scrollTop;
      tgt.scrollTop+= delta;
      if(oldScroll!=tgt.scrollTop) break;
      // else the element can't be scrolled, try its parent in next iteration
    }
    var start = tgt.scrollTop;
    var end = start + length*mult*delta; // where to end the scroll
    var change = end - start; // base change in one step
    var step = 0; // current step
    interval = setInterval(function() {
      var pos = Math.easeOutQuad(step++,start,change,steps); // calculate next step
      tgt.scrollTop = pos; // scroll the target to next step
      if(step>=steps) { // scroll finished without speed up - stop animation
        mult = 0; // next scroll will start slowly
        clearInterval(interval);
      }
    },10);
  }

  // nonstandard: Chrome, IE, Opera, Safari
  window.addEventListener("mousewheel", MouseWheelHandler, false);
  // nonstandard: Firefox
  window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
  })();
}
}( jQuery ));
