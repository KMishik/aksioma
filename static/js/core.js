(function ($) {
    $(function () {
        $('#services .content .col').on('click', function (event) {
            $(this).children('.annotate').toggleClass('show');
        });
        $('#services .content .col').on('mouseleave', function (event) {
            var annot = $(this).children('.annotate');
            !(annot.hasClass('show')) || annot.removeClass('show');
        });
        $('.servlist').slick({
            slidesToScroll: 1,
            draggable: false,
            slidesToShow: 4,
            infinite: false
        });
    });
})(jQuery);
