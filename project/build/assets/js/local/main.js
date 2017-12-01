( function( $ ) {
  // jQuery(window).load(function($) {
  //
  // });


  jQuery(window).resize( function($) {
    // $.fn.MenuProjects();
    $.fn.TimelineStyle($);
  });
  jQuery(document).ready( function($) {
    $.fn.HeaderStyle($);
    $.fn.TeleprogrammPage($);
    $.fn.Sliders($);
    $.fn.MenuProjects($);
    $.fn.InterfaceItems($);
    // $.fn.HostsStyle();

    // $.fn.SmoothScrolling();
    $.fn.TimelineStyle($);



    jQuery('.nv-main__slider').find('.flex-direction-nav a').html('');
    jQuery('.nv-main__slider-info').find('.flex-direction-nav a').html('');
    jQuery('.nv-main__slider-carousel').find('.flex-direction-nav a').html('');
  });
} )( jQuery );
