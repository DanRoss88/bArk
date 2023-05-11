// Client facing scripts here

$(document).ready(function () {


  //////// NAVBAR BUTTON //////
  $("#bark-button").click(() => {
    $('#stories-form').slideToggle().find('textArea').focus();

  });

  ///////// EDIT SLIDE DOWN //////
  let $editForm = $('.editing-form').hide();

  $('#edit-slide-button').click(() => {
    $editForm.slideToggle("slow", "swing").focus();
  });

  ////// ACCEPT CONTRIBUTION //////////
  $('.accept-btn').on('click', function (event) {
    event.preventDefault();

    const contributionId = $(this).data('contribution-id');

    $.ajax({
      method: 'POST',
      url: `/stories/contributions/${contributionId}/accept`,
      success: function () {
        location.reload();
      },
      error: function () {
        console.error('Error accepting contribution:');
        alert('There was an error accepting this contribution.');
      }
    });
  });

});

