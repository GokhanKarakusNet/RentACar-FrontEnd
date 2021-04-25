;(function($) {
    "use strict";

    $('.lightbox').magnificPopup({
    type: 'image'
    });

})(jQuery);

$(function() {
    $('.gmap3').each(function(){
        var
        $this = $(this),
        lat = $this.data('lat'),
        lng = $this.data('lng'),
        marker = $this.data('marker'),
        zoom = $this.data('zoom');

        var center = [lat, lng];
        $this
        .gmap3({
            center: center,
            zoom: zoom,
            mapTypeId : google.maps.MapTypeId.ROADMAP
         })
        .marker({
            position: center,
            icon: marker
        });
    });
});