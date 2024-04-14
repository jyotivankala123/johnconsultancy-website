import 'jquery'; // Import jQuery before importing Owl Carousel
import 'owl.carousel';

window.onload = function() {
  $(document).ready(function() {

    
    // var readURL = function(input) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();

    //         reader.onload = function (e) {
    //             $('.profile-pic').attr('src', e.target.result);
    //         }
    
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }
    

    // $(".file-upload").on('change', function(){
    //     readURL(this);
    // });
    
    // $(".upload-button").on('click', function() {
    //    $(".file-upload").click();
    // });
});


var buttonPlus  = $(".qty-btn-plus");
var buttonMinus = $(".qty-btn-minus");

var incrementPlus = buttonPlus.click(function() {
  var $n = $(this)
  .parent(".qty-container")
  .find(".input-qty");
  $n.val(Number($n.val())+1 );
});

var incrementMinus = buttonMinus.click(function() {
  var $n = $(this)
  .parent(".qty-container")
  .find(".input-qty");
  var amount = Number($n.val());
  if (amount > 0) {
    $n.val(amount-1);
  }
});

}  