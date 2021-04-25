{
var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: false,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.thumb-next',
    prevEl: '.thumb-prev',
  },
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs
  },
  effect:'slide',
  
  zoom: {
    maxRatio: 5,
  },
});

}


{





$(document).ready(function(){

  $('#kategori').on("change",function () {
      var kategori = $(this).find('option:selected').val();
      $.ajax({
          url: "https://www.tetricarrental.com//araclar/marka/"+ kategori,
          type: "post",
          success: function (response) {
              console.log(response);
              $("#marka").html(response);
              $('#model').html("<option value='0'>Model Se&ccedil;iniz"); 
          },
      });
  });

  $('#marka').on("change",function () {
      var marka = $(this).find('option:selected').val();
      $.ajax({
          url: "https://www.tetricarrental.com//araclar/model/"+ marka,
          type: "post",
          success: function (response) {
              console.log(response);
              $("#model").html(response);
          },
      });
  });  

});


}