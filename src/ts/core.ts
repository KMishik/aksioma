
(function($) {
  $(function() {

    $('#services .content .col').on('click', function (event: JQuery.Event) {
        $(this).children('.annotate').toggleClass('show');
    });

    $('#services .content .col').on('mouseleave', function (event: JQuery.Event) {
      let annot: JQuery = $(this).children('.annotate');
      !(annot.hasClass('show')) || annot.removeClass('show');
    });

    /* $(".owl-carousel").owlCarousel({
      'dots': false,
      'items': 3,
      'autoWidth': true,
      'loop': true,
      'mouseDrag': false,
      'nav': true,
    }); */
    $('.servlist').slick({
      slidesToScroll: 1,
      draggable: false,
      slidesToShow: 4,
      infinite: true,
    });
  });
} )(jQuery);