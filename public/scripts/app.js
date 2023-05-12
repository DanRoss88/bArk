// Client facing scripts here
// const { publishStory } = require('../db/queries/stories');

$(document).ready(function() {


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
  $(document).on('click', '.accept-contribution', function(event) {
    event.preventDefault();

    const data = $(this).data();
    console.log('#3 DATA:', data);
    const contributionId = data.contributionId;
    const storyId = data.storyId;

    $.ajax({
      method: 'POST',
      url: `/stories/contributions/${contributionId}/accept`,
      data: {storyId},
      success: function() {
        console.log('#1 Successfully accepted');
        location.reload();
      },
      error: function() {
        console.error('Error accepting contribution:');
        alert('There was an error accepting this contribution.');
      }
    });
  });

////// PUBLISH STORY \\\\\\
    $(".publish-button").on('click', function() {
      const storyID = req.params.id;
      if (!storyID) {
        res.status().send('Story does not exist');
      }
      publishStory(storyID)
      $(this).siblings(".published").text("PUBLISHED");

    });

  });



