(function ($) {
    $(function () {
        $('#services .content .col .descriptor').on('click', function (event) {
            return;
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
