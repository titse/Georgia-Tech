(function ($) {

  $.fn.grid = function () {

    var currentTallest = 0;
    var currentRowStart = 0;
    var rowDivs = [];
    var topPosition = 0;

    return this.each(function () {

      var $el = $(this);
      topPostion = $el.position().top;

      $el.height('');

      if (currentRowStart != topPostion) {
        // we just came to a new row.  Set all the heights on the completed row
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
        // set the variables for the new row
        rowDivs.length = 0; // empty the array
        currentRowStart = topPostion;
        currentTallest = $el.height();
        rowDivs.push($el);

      } else {
		if($(this).hasClass('product')){
        // another div on the current row.  Add it to the list and check if it's taller
        rowDivs.push($el);
		var innerHeight = $el.height();
			currentTallest = (currentTallest < innerHeight) ? (innerHeight) : (currentTallest);
			}
			else{
			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($el);
        var innerHeight = $el.innerHeight();
        currentTallest = (currentTallest < innerHeight) ? (innerHeight) : (currentTallest);
		}
	  }
      // do the last row
      if (currentTallest) {
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
      }

    });

  }

  $.fn.imageCenter = function () {
	  return this.each(function () {
  		var overflow = $(this).width() - $(this).parent().width();
  		if (overflow > 0) {
  			$(this).css({marginLeft: -overflow / 2, marginRight: -overflow / 2});
  		}
	  });
  }

  $(document).ready(function () {


    $('#searchform').submit(function () {

      if ($('input[name="site"]:checked', this).val() == 'directory') {
        $(this).attr("action", "http://campusdirectory.gsu.edu/eguide.cfm");
        var searchterm = $("input#q", this).val()
        $('#sn', this).val(searchterm);
        if (searchterm.split(' ')[1]) {
          $('#sn', this).val(searchterm.split(' ')[1]);
          $('#givenname', this).val(searchterm.split(' ')[0]);
        }
      }

/*
      if ($("#Law").attr('checked') == true) {
          $("#searchform").attr("action", "http://law.gsu.edu/search/index.php");
      }
*/

    });

    $('.box').imagesLoaded(function () {
      $(this).grid();
    });
    $('.featured article').imagesLoaded(function () {
      $(this).grid();
    });
    $('.tour-guide').imagesLoaded(function () {
      $(this).grid();
    });

    if ($('#global-nav').is(':visible')) {
	    $('#global-nav .menu > li > .sub-menu > li').addClass('dontsplit');
	    $('#global-nav .menu > li > .sub-menu').columnize({columns: 3, lastNeverTallest: true});
	    $('#global-nav .menu > li > .sub-menu').each(function () {
	    	$(this).imagesLoaded(function () {
	    	  $(this).find('.column').grid();
	    	});
	    });

	    // TODO: handle keyboard focus

	  }

	  $('.utility-bar .breadcrumb .menu > li > .sub-menu > li').addClass('dontsplit');
	  $('.utility-bar .breadcrumb .menu > li > a').one('mouseover', function () {
	  	$(this).next('.sub-menu').columnize({columns: 2, lastNeverTallest: true});
//	  	$(this).next('.sub-menu').find('.column').grid();
	  });

    // TODO: check if this is mobile
/*
    var $footer = $('#footer-nav');
    if (!$footer.css('-webkit-column-count') && !$footer.css('-moz-column-count') && !$footer.css('column-count')) {
		}
*/

		$('#site-map .menu-site-map-container .menu > li').addClass('dontsplit');
		$('#site-map .menu-site-map-container').columnize({columns: 4, lastNeverTallest: true});

    $('.carousel').carousel();

    $('.carousel .carousel-pager li a').click(function () {
    	var index = $(this).closest('li').index();
    	$(this).closest('.carousel').carousel(index);
    	return false;
    });
    $('.carousel').bind('slid', function (event, i) {
    	var index = $(this).find('.item.active').index();
    	$(this).find('.carousel-pager li').eq(index).addClass('current').siblings().removeClass('current');
    });

    // Touch carousel
    // @todo maybe unbind these in the gsu-home theme instead
    $('.carousel').not('#gsu-home-page').swiperight(function() {
      $(this).carousel('prev');
    });
    $('.carousel').not('#gsu-home-page').swipeleft(function() {
      $(this).carousel('next');
    });

    if ($.fn.masonry) {
      $('.masonry').imagesLoaded(function () {
        $(this).masonry({
          itemSelector: '.block',
          columnWidth: 320
        });
      });
    }
    if ($.fn.fancybox) {
      $('.fancybox').fancybox();
    }

    $('.visible-phone nav li a').click(function () {
    	$(this).closest('li').addClass('active').siblings().removeClass('active');
    	return false;
    });

    // Social Toolbar
    if ($('#wp-social-toolbar').length) {
      $('body').addClass('social-toolbar');
    }

    // Tooltips
    $('a[rel=tooltip]').tooltip();

    // Popovers
    $('a[rel=popover]').popover();

    // Tabs
    $('a[rel=tab]').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
    // Recalcuate grid height for elements in the new tabs
    $('a[rel=tab]').bind('shown', function (event) {
      $('.box, .featured article, .tour-guide').grid();
    });
    // Set the tab to the URL's hash, if possible
    if (window.location.hash) {
      $('a[rel=tab][href$="' + window.location.hash + '"]').tab('show');
    }

    // Collapse mobile tabs menus on second click
    $('.mobile-bar .nav li.menu a').click(function (event) {

      var $li = $(this).closest('li');
      if ($li.is('.active')) {

        var selector = $(this).attr('data-target') || $(this).attr('href');

        $li.removeClass('active');
        $(selector).removeClass('active');

        event.stopPropagation();
        return false;

      }

    });

    // Directory collapse
    $('#sidebar .directory').bind('show', function (event) {
      $el = $(this);
      $target = $(event.target);
      $target.closest('li').addClass('active').siblings().removeClass('active').find('.accordion-body.collapse.in').collapse('hide');
    });

    // Pull tabs
    if ($('#pull-tabs').length) {

      var $ul = $('<ul></ul>');

      $('#pull-tabs .tab-content .tab-pane').each(function () {
        var id = $(this).attr('id');
        var title = $(this).find('> h4').text();
        var $li = '<li><a href="#' + id + '" data-toggle="tab">' + title + '</a></li>';
        $ul.append($li);

      });

      $('#pull-tabs').prepend($ul);

      $('#pull-tabs > ul li a').bind('click', function (event) {
        if ($(this).closest('li').is('.active')) {
          $('#pull-tabs').toggleClass('expanded');
        }
        else {
          $('#pull-tabs').addClass('expanded');
        }
      });

      $('#pull-tabs').bind('clickoutside', function () {
        $(this).removeClass('expanded');
      });

    }

    if ($.fn.isotope) {

      $('.isotope').imagesLoaded(function () {

        $('.isotope .isotope-item').each(function () {
          var $img = $(this).find('.thumbnail img');
          var style = {width: 180, height: 180};
          if ($img.length) {

            var width = $img.get(0).width;
            var height = $img.get(0).height;

            if (width / height > (560 / 180) - 0.25) {
              style.width = 560;
              style.height = 180;
            }
            else if (width / height > (370 / 180) - 0.25) {
              style.width = 370;
              style.height = 180;
            }
            else if (width / height < (180 / 370) + 0.25) {
              style.width = 180;
              style.height = 370;
            }

            if (width / height > style.width / style.height) {
              // auto width enforces correct responsive sizing
              $img.css({width: 'auto !important', height: '100%', marginLeft: ((width * style.height / height) - style.width) / -2});
            }
            else {
              $img.css({width: '100%', marginTop: ((height * style.width / width) - style.height) / -2});
            }
          }

          else {
            var $a = $(this).find('article h3 a').clone();
            $a.addClass('thumbnail');
            $a.html('');
            $(this).find('article').prepend($a);
          }

          $(this).css(style);
        });

        $('.isotope').isotope({
          itemSelector: '.isotope-item',
          masonry : {
            columnWidth: 190
          }
        });

        $('.isotope .isotope-item').css({visibility: 'visible'});
        if ($.fn.ellipsis) {
          $('.isotope .isotope-item').ellipsis();
        }

      });

    }
    if ($.fn.ellipsis) {
      $('.news').each(function () {
        var href = $(this).data('href');
        $('ul li', this).each(function () {
          $(this).find('.news-inner').ellipsis();
        });
      });
    }

  });

/* Allows custom popover content for major maps */
  $('[rel=popover]')
    .popover({
      html: true,
      content: function () {
        if (this.hash == undefined || this.hash == '') {
          if ($(this).data('custom-content')) {
            return $($(this).data('custom-content')).html();
          }
        }
        return $(this.hash).html();
      }
    });

  $(window).load(function() {
    // wait a second or two, and then hide the home page nav arrows
    $('.page-nav').show();
    setTimeout(function () {
      $('.page-nav').css({left: '', right: ''});
    }, 2000);

  });

})(jQuery);