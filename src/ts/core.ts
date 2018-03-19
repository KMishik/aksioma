
interface ElementPositionXY {
  top: number,
  left: number,
  height?: number,
  width?: number,
}

(function($) {
  $(function() {

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
      //let posElem: ElementPositionXY = getElemenyPosition(this);

      /* let scrollViewHeight: number = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

      let scrollViewWidth: number = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      ); */

      let annotCssWidth: number = parseInt(targetAnnotation.css('width'));
      let annotCssHeight: number = parseInt(targetAnnotation.css('height'));
      
      // Base calculation of Top and Left position for annotation pop-up window

      /* let calcTop: number = posElem.top + posElem.height - annotCssHeight;
      let calcLeft: number = ( posElem.left >= scrollViewWidth/2 ) ?  posElem.left - annotCssWidth + posElem.width : posElem.left;
       */
      let calcTop: number = document.documentElement.clientHeight/2 - annotCssHeight/2;
      let calcLeft: number = document.documentElement.clientWidth/2 - annotCssWidth/2;
      // Precision calculation of Top position for annotation pop-up window
      if (document.documentElement.clientHeight <= annotCssHeight) {
        calcTop =0;
      }
      if (document.documentElement.clientWidth <= annotCssWidth) {
        calcLeft =0;
      }
     /*  if (annotCssHeight >= document.documentElement.clientHeight || calcTop <= window.pageYOffset) {
        calcTop = window.pageYOffset;
      } else if (calcTop + annotCssHeight > document.documentElement.clientHeight + window.pageYOffset) {
        calcTop = document.documentElement.clientHeight - annotCssHeight + window.pageYOffset;
      }

      // Precision calculation of Left position for annotation pop-up window
      if (annotCssWidth >= document.documentElement.clientWidth) {
        calcLeft = 0;
      } else if (calcLeft + annotCssWidth > document.documentElement.clientWidth + window.pageXOffset) {
        calcLeft = document.documentElement.clientWidth - annotCssWidth + window.pageXOffset;
      } */

      let posAnnot: ElementPositionXY = { 
        top: calcTop,
        left: calcLeft,
      };
      targetAnnotation.css({top: posAnnot.top, left: posAnnot.left});

      $('#overlay').one('click', function (event: JQuery.Event) {
        targetAnnotation.fadeOut(170, () => {
          targetAnnotation.css({top: "", left: ""});
          $(this).fadeOut(170);
        });
        /* targetAnnotation.removeClass('show');
        $(this).removeClass('show');
 */      });

      //$('#overlay').addClass('show');
      $('#overlay').fadeIn(340);
      targetAnnotation.fadeIn({
        duration: 340,
        start: function() {
            targetAnnotation.css({ display: "flex" });
            },
      });
        
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
