(function ($) {
    $(function () {
        function getElemenyPosition(elem) {
            var elemRectangle = elem.getBoundingClientRect();
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
            var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
            var top = elemRectangle.top + scrollTop - clientTop;
            var left = elemRectangle.left + scrollLeft - clientLeft;
            return {
                top: top,
                left: left,
                height: elemRectangle.height,
                width: elemRectangle.width
            };
        }
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
            var posElem = getElemenyPosition(this);
            var scrollViewHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
            var scrollViewWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
            var annotCssWidth = parseInt(targetAnnotation.css('width'));
            var annotCssHeight = parseInt(targetAnnotation.css('height'));
            var calcTop = posElem.top + posElem.height - annotCssHeight;
            var calcLeft = (posElem.left >= scrollViewWidth / 2) ? posElem.left - annotCssWidth + posElem.width : posElem.left;
            if (annotCssHeight >= document.documentElement.clientHeight || calcTop <= window.pageYOffset) {
                calcTop = window.pageYOffset;
            }
            else if (calcTop + annotCssHeight > document.documentElement.clientHeight + window.pageYOffset) {
                calcTop = document.documentElement.clientHeight - annotCssHeight + window.pageYOffset;
            }
            if (annotCssWidth >= document.documentElement.clientWidth) {
                calcLeft = 0;
            }
            else if (calcLeft + annotCssWidth > document.documentElement.clientWidth + window.pageXOffset) {
                calcLeft = document.documentElement.clientWidth - annotCssWidth + window.pageXOffset;
            }
            var posAnnot = {
                top: calcTop,
                left: calcLeft,
                height: annotCssWidth
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
