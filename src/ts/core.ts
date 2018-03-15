
interface ElementPositionXY {
  top: number,
  left: number,
  height: number,
  width?: number,
}

(function($) {
  $(function() {

    // Function return JS object that has top and left position of HTML element on page
    function getElemenyPosition(elem: HTMLElement): ElementPositionXY {

      // get element rectangle
      let elemRectangle: ClientRect = elem.getBoundingClientRect();

      // get page scroll < modern || use with prev version IE8 || use when DOCTYPE set incorrect >   
      let scrollTop: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scrollLeft: number = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

      // IE element may offsets relatively of left-top edge, if it does this then get this offset.   
      let clientTop: number = document.documentElement.clientTop || document.body.clientTop || 0;
      let clientLeft: number = document.documentElement.clientLeft || document.body.clientLeft || 0;

      // Calculate element's top and left
      let top: number = elemRectangle.top + scrollTop - clientTop;
      let left: number = elemRectangle.left + scrollLeft - clientLeft;

      return {
        top: top,
        left: left,
        height: elemRectangle.height,
        width: elemRectangle.width,
      }
    }

    $('#services .content .col .descriptor').on('click', function (event: JQuery.Event) {
      
      let curElem: JQuery = $(this);
      let annotId: string = curElem.data("annot-id");
      if (annotId === undefined || annotId === "" || isNaN(parseInt(annotId))) {
        return;
      }
      let toFindAnnotId: string = '#annot-' + annotId;
      let curAnnotation: HTMLElement = $('.annotations').children(toFindAnnotId)[0];
      if (curAnnotation === undefined) {
        return;
      }
      let targetAnnotation: JQuery = $(curAnnotation);
      let posElem: ElementPositionXY = getElemenyPosition(this);

      let scrollViewHeight: number = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

      let scrollViewWidth: number = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );

      let annotCssWidth: number = parseInt(targetAnnotation.css('width'));
      let annotCssHeight: number = parseInt(targetAnnotation.css('height'));
      
      // Base calculation of Top and Left position for annotation pop-up window
      let calcTop: number = posElem.top + posElem.height - annotCssHeight;
      let calcLeft: number = ( posElem.left >= scrollViewWidth/2 ) ?  posElem.left - annotCssWidth + posElem.width : posElem.left;
      
      // Precision calculation of Top position for annotation pop-up window
      if (annotCssHeight >= document.documentElement.clientHeight || calcTop <= window.pageYOffset) {
        calcTop = window.pageYOffset;
      } else if (calcTop + annotCssHeight > document.documentElement.clientHeight + window.pageYOffset) {
        calcTop = document.documentElement.clientHeight - annotCssHeight + window.pageYOffset;
      }

      // Precision calculation of Left position for annotation pop-up window
      if (annotCssWidth >= document.documentElement.clientWidth) {
        calcLeft = 0;
      } else if (calcLeft + annotCssWidth > document.documentElement.clientWidth + window.pageXOffset) {
        calcLeft = document.documentElement.clientWidth - annotCssWidth + window.pageXOffset;
      }

      let posAnnot: ElementPositionXY = { 
        top: calcTop,
        left: calcLeft,
        height: annotCssWidth,
      };

      $('#overlay').one('click', function (event: JQuery.Event) {
        targetAnnotation.removeClass('show');
        $(this).removeClass('show');
      });

      $('#overlay').addClass('show');

      targetAnnotation.css({top: posAnnot.top, left: posAnnot.left});
      targetAnnotation.addClass('show');

      event.preventDefault();
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
      infinite: false,
    });
  });
} )(jQuery);
