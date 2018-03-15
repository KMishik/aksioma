(function ($) {
    $(function () {
        $('#services .content .col .descriptor').on('click', function (event) {
            var annotId;
            var toFindAnnotId;
            var curElem, targetAnnotation;
            var curAnnotation;
            var posElem, posAnnot;
            curElem = $(this);
            annotId = curElem.data("annot-id");
            if (annotId === undefined || annotId === "" || isNaN(parseInt(annotId))) {
                return;
            }
            toFindAnnotId = '#annot-' + annotId;
            curAnnotation = $('.annotations').children(toFindAnnotId)[0];
            if (curAnnotation === undefined) {
                return;
            }
            targetAnnotation = $(curAnnotation);
            posElem = curElem.offset();
            posAnnot = {
                top: posElem.top + curElem.height() - 300,
                left: posElem.left
            };
            $('#overlay').one('click', function (event) {
                targetAnnotation.removeClass('show');
                $(this).removeClass('show');
            });
            $('#overlay').addClass('show');
            targetAnnotation.css({ top: posAnnot.top, left: posAnnot.left });
            targetAnnotation.addClass('show');
            event.preventDefault();
        });
        $('.servlist').slick({
            slidesToScroll: 1,
            draggable: false,
            slidesToShow: 4,
            infinite: false
        });
    });
})(jQuery);
