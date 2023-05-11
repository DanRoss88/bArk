// Client facing scripts here


$(document).ready(function() {

  //// VARIABLES ////
 /* const $errorGuest = $('#error-msg-guest').hide();
  const $errorNull = $('#error-msg-null').hide();
  const $form = $('#story-form').hide();
*/
  //////// NAVBAR BUTTON //////


  $("#bark-button").click(() => {
    $('#stories-form').slideToggle().find('textArea').focus();
  });
});

///////// EDIT SLIDE DOWN //////
$("#edit-slide-button").click(() => {
  $('.editing-form').slideToggle('slow','swing').focus();
});
