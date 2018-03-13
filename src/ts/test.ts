declare const jQuery: any;

(function($) {
  $(function() {

    $('#services .content .col').on('click', function (event) {
        $(this).children('.annotate').toggleClass('show');
    });

    $('#services .content .col').on('mouseleave', function (event) {
      let annot = $(this).children('.annotate');
      !(annot.hasClass('show')) || annot.removeClass('show');
    });
  });
} )(jQuery);
