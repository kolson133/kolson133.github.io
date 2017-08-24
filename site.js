/**************************************
   Prevent Default of Anchor Tags
**************************************/
$(document).ready(function() {
  $('.no-click').click(function(e) {
    e.preventDefault();
  });
});

/***************************
  WHO AM I? controller
****************************/

$(document).ready(function() {
  $desktop = ($.browser.desktop) ? ' desktop' : '';
  $('body').addClass($.browser.name+' '+$.browser.platform+$desktop);
});

/*****************************
  Scroll To a place on page
*****************************/

function getPosition(object, amount, time) {
  
  page = $('html, body');
  
  page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
    page.stop();
  });
  
  if(time === undefined) { time = 1000 }
  
  if(amount === undefined) { amount = false }
    
  if(object.indexOf('#') != -1) {
    item_id = object;
  } else {
    item_id = '#' + object;
  }
  
  //Define the Header/Nav Height
  lessHeight = 0;
  
  lessHeight = (amount !== false) ? amount : lessHeight;

  /*if($('#services').is(':visible')) {
    if($('#services').offset().top < $(item_id).offset().top) {
      lessHeight = $('#services').outerHeight();
    }
  }*/

  if($(item_id).offset() === undefined) {
    return;
  }
  
  var position = ($(item_id).offset().top) - lessHeight;

  page.animate({
    scrollTop: position
  }, time, function() {
    setTimeout(function(){ 
      if($('body').hasClass('open')) {
        $('.menu-btn').click();
      }
    },100);
    page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
  });
}

/***************************
  Control URL Hashing
***************************/
function hasHashChange() {
  hashURL = window.location.hash;
  if(hashURL.indexOf('/') != -1) {
    hashURL = hashURL.slice(0,-1);
  } else {
    return false;
  }
  hashLength = hashURL.length
  hashURL = hashURL.substring(1,hashLength);
  
  if(hashURL != '') {
    getPosition(hashURL);
  }
}
  
$(window).load(function() {
  hasHashChange();
  $(window).on('hashchange', function() {
    hasHashChange();
  });
});

/***************************
  Load a photo gallery
***************************/

function photoGallery(galID, galleryTitle, startNum) {
  if(startNum === undefined) {
    startNum = 1;
  }
  if($('.full-gallery').length <= 0) {
    $.get('/ajax/photo-gallery/?galID='+galID+'&galTitle='+galleryTitle+'&startNum='+startNum, function(data) {
      $(data).appendTo('#gallery'+galID);
      $('#photo-gallery').click();
    });
  }
}

function photoFeatured(galID, photoID, galleryTitle, photoDesc) {
  if($('.full-gallery').length <= 0) {
    $.get('/ajax/photo-featured/?galID='+galID+'&photoID='+photoID+'&galTitle='+galleryTitle+'&photoDesc='+photoDesc, function(data) {
      $(data).appendTo('#gallery'+galID);
      $('#photo-gallery').click();
    });
  }
}

/***************************
  Modal Controller
****************************/

function modalControl() {
  $('.modal').click(function(e) {
    e.preventDefault();
    modalID = $(this).attr('data-id');
    if($(this).attr('data-width') !== undefined) {
      modalWidth = $(this).attr('data-width');
    } else {
      modalWidth = 1000;
    }

    hs.htmlExpand(null, { slideshowGroup: 'misc', contentId: modalID, wrapperClassName: 'misc borderless no-footer', outlineType: false, maxWidth: modalWidth });
  });
}

$(document).ready(function() {
  modalControl();
});

/*************************
  Unslider
**************************/
$(document).ready(function() {
	$('.unslider').unslider({
		autoplay: true,
		arrows: true,
		delay: 8000,
		nav: false,
		infinite: true 
	});
});
