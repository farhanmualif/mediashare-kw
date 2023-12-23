let Ischecked = 0;
const checked = $("#paymentMode").change(function () {
  Ischecked++;
  if (Ischecked % 2 != 0) {
    $("#activatePaymentMode").css("display", "block");
  } else {
    $("#activatePaymentMode").css("display", "none");
  }
});

/* midtrans hit api */

// payButton.addEventListener("click", function () {
//   console.log("pay button clicked");
// });
