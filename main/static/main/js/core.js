(function ($) {
    $(function () {
        $('#services .content .col .descriptor').on('click', function (event) {
            var curElem = $(this);
            var annotId = curElem.data("annot-id");
            if (annotId === undefined || annotId === "" || isNaN(parseInt(annotId))) {
                return;
            }
            var toFindAnnotId = '#annot-' + annotId;
            var curAnnotation = $('.annotations').children(toFindAnnotId)[0];
            if (curAnnotation === undefined) {
                return;
            }
            var targetAnnotation = $(curAnnotation);
            var annotCssWidth = parseInt(targetAnnotation.css('width'));
            var annotCssHeight = parseInt(targetAnnotation.css('height'));
            var calcTop = document.documentElement.clientHeight / 2 - annotCssHeight / 2;
            var calcLeft = document.documentElement.clientWidth / 2 - annotCssWidth / 2;
            if (document.documentElement.clientHeight <= annotCssHeight) {
                calcTop = 0;
            }
            if (document.documentElement.clientWidth <= annotCssWidth) {
                calcLeft = 0;
            }
            var posAnnot = {
                top: calcTop,
                left: calcLeft
            };
            targetAnnotation.css({ top: posAnnot.top, left: posAnnot.left });
            $('#overlay').one('click', function (event) {
                var _this = this;
                targetAnnotation.fadeOut(170, function () {
                    targetAnnotation.css({ top: "", left: "" });
                    $(_this).fadeOut(170);
                });
            });
            $('#overlay').fadeIn(340);
            targetAnnotation.fadeIn({
                duration: 340,
                start: function () {
                    targetAnnotation.css({ display: "flex" });
                }
            });
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
