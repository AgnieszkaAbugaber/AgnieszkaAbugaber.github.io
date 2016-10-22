
$(document).ready(function(){;

/* affix the navbar after scroll below header */
    $('#nav').affix({
        offset: {
            top: $('header').height()
        }
    });


    /* smooth scrolling for scroll to top */
$('.scroll-top').click(function(){
  $('body,html').animate({scrollTop:0},1000);
})

/* smooth scrolling for nav sections */
$('#nav .navbar-nav li>a').click(function(){
  var link = $(this).attr('href');
  var posi = $(link).offset().top;
  $('body,html').animate({scrollTop:posi},700);
});


    $('body').scrollspy({ target: '#nav' })

    $(function() {
        var $blocks = $('.animBlock.notViewed');
        var $window = $(window);

        $window.on('scroll', function(e){
            /* highlight the top nav as scrolling occurs */

            $blocks.each(function(i,elem){
                if($(this).hasClass('viewed'))
                    return;

                isScrolledIntoView($(this));
            });
        });
    });

    var runned = false;
    /* http://stackoverflow.com/a/488073/477958 */
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemOffset = 0;

        if(elem.data('offset') != undefined) {
            elemOffset = elem.data('offset');
        }
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        if(elemOffset != 0) { // custom offset is updated based on scrolling direction
            if(docViewTop - elemTop >= 0) {
                // scrolling up from bottom
                elemTop = $(elem).offset().top + elemOffset;
            } else {
                // scrolling down from top
                elemBottom = elemTop + $(elem).height() - elemOffset
            }
        }

        if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
            // once an element is visible exchange the classes
            $(elem).removeClass('notViewed').addClass('viewed');

            var animElemsLeft = $('.animBlock.notViewed').length;
            if(animElemsLeft == 0){
            //    // with no animated elements left debind the scroll event
                        ga('send', 'event', { eventCategory: 'Scrolled to bottom', eventAction: 'Scroll' });
                        runned = true;
            }
        }
    }

/* google maps */
google.maps.visualRefresh = true;

var map;
function initialize() {
    //$('navbar-custom').autoHidingNavbar('setDisableAutohide', true);

	var geocoder = new google.maps.Geocoder();
	var address = 'ul. Puławska 103, Warszawa'
	var mapOptions = {
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
     	scrollwheel: false
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  	if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow(
                {
                  content: $('address').address,
                  map: map,
                  position: results[0].geometry.location
                });

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title:address
            });
              boxText = document.createElement("html");
              boxText.innerHTML = "<head><link rel=\"stylesheet\" href=\"http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css\"></head><body>Agnieszka Abugaber <br> Ul. Puławska 103 lok.2<br> Warszawa <br> <i class=\"fa fa-mobile\" > </i> <b>601 322 116</b></h3><body>";
              infowindow.setContent(boxText);


          } else {
          	alert("No results found");
          }
        }
      });
	}
}
google.maps.event.addDomListener(window, 'load', initialize);

/* end google maps */


});