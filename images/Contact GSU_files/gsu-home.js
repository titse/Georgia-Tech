var GSU = GSU || {};

(function ($) {

  GSU.mastheadCanvasIndex = 0;
  GSU.getMastheadCanvas = function (width, height) {

    var canvas = document.createElement('canvas');
    // Support canvas with IE8
    if (typeof G_vmlCanvasManager !== 'undefined') {
      G_vmlCanvasManager.initElement(canvas);
    }

    if (width) {
      $(canvas).attr('width', width);
    }
    if (height) {
      $(canvas).attr('height', height);
    }
    $(canvas).css({width: '100%'});

    var $container = $('.masthead-image').eq(this.mastheadCanvasIndex);

    if ($container.length == 0) {

      $container = $('<div class="masthead-image"></div>');

      if ($('body').is('.home')) {
        $('#gsu-home-page .masthead .thumbnail').eq(this.mastheadCanvasIndex).addClass('masthead-image-container');
        $('#gsu-home-page .masthead .thumbnail').eq(this.mastheadCanvasIndex).append($container);
      }
      else {
        $('#masthead').addClass('masthead-image-container');
        $('#masthead').append($container);
      }
    }
    $container.prepend(canvas);
    this.mastheadCanvasIndex++;

    $(window).resize();

    return canvas;

  }

})(jQuery);

(function ($) {

  $(window).load(function() {
    // wait a second or two, and then hide the home page nav arrows
    $('.home-page-nav').show();
    setTimeout(function () {
      $('.home-page-nav').css({left: '', right: ''});
    }, 2000);

  });

  $(document).ready(function () {

    $('#gsu-home-page').carousel({interval: false});
    $('#gsu-home-page').bind('slide', function (event) {

      var minHeight = Math.max(parseInt($('#content').css('minHeight')), $('#content').height());
      $('#content').css({'minHeight': minHeight});

      var $target = $(event.relatedTarget);

      var $prev;
      var $next;

      $prev = $target.prev();
      if (!$prev.length) $prev = $target.siblings().last();
      $next = $target.next();
      if (!$next.length) $next = $target.siblings().first();

      $('.home-page-nav[rel=prev] span').html($prev.data('title'));
      $('.home-page-nav[rel=next] span').html($next.data('title'));

    }).each(function () {
      $prev = $(this).find('.item').eq(-1);
      $next = $(this).find('.item').eq(1);

      $('.home-page-nav[rel=prev] span').html($prev.data('title'));
      $('.home-page-nav[rel=next] span').html($next.data('title'));

    });

    $('#gsu-home-page .masthead .post').each(function () {
      var wrapperHeight = $(this).find('.wrapper').outerHeight();
	  var blackText = false;
      $(this).hover(
        function () {
          var $el = $(this), $wrapper = $el.find('.wrapper');
		  if($el.find('.content').hasClass('blackcontent')){
		    $el.find('.content').removeClass('blackcontent');
			blackText = true;
		  }
			
          $el.addClass('hover');
          if ($wrapper.length) {
            $wrapper.animate({height: 230}, 50, function () {
              $el.find('.category').show();
            });
          }
        },
        function () {
          var $el = $(this), $wrapper = $el.find('.wrapper');
          $el.find('.category').hide();
		  if(blackText == true){
		    $el.find('.content').addClass('blackcontent');
		  }
          if ($wrapper.length) {
            $wrapper.animate({height: wrapperHeight}, 50, function () {
              $el.removeClass('hover');
            });
          }
          else {
            $el.removeClass('hover');
          }
        }
      );
    });

    $('#gsu-home-page .main-content .post').each(function () {
	  smallBlackText = false;
	  $(this).hover(
        function () {
          var $el = $(this);
		  if($el.find('.link').hasClass('blacklink')){
		    $el.find('.link').removeClass('blacklink');
		    smallBlackText = true;
		  }
          $el.addClass('hover').find('.excerpt').slideDown(50);
        },
        function () {
          var $el = $(this);
		  if(smallBlackText == true){
		    $el.find('.link').addClass('blacklink');
		    smallBlackText = false;
		  }
          $(this).find('.excerpt').slideUp(50, function () {
            $el.removeClass('hover');
          });
        }
      );
    });

    $('.share > span').click(function () {
      var url = $(this).data('url');
      var x = screen.width / 2 - 250;
      var y = screen.height / 2 - 125;
      window.open(url,'name','height=250,width=500,left=' + x + ',top=' + y);
      return false;
    });

    if ($.fn.coverImage) {
      $('#gsu-home-page .main-content .post').imagesLoaded(function () {
        $(this).find('img').coverImage();
      });
    }

  });


})(jQuery);