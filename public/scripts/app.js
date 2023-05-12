// Client facing scripts here
$(document).ready(function() {


  ///////// EDIT SLIDE DOWN //////
  let $editForm = $('.editing-container').hide();
  $('#edit-slide-button').click(() => {
    $editForm.slideToggle("slow", "swing").focus();
  });

  //////// NAVBAR BUTTON //////
  $("#bark-button").click(() => {
    $('#stories-form').slideToggle().find('textArea').focus();

  });

  ///// LOGIN REDIRECT/////
  const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
  window.location.href = '/login';
});
});

  ////// ACCEPT CONTRIBUTION //////////
  $(document).on('click', '.accept-contribution', function(event) {
    event.preventDefault();

    const data = $(this).data();
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
    // $(".publish-button").on('click', function() {
    //   const storyID = req.params.id;
    //   if (!storyID) {
    //     res.status().send('Story does not exist');
    //   }
    //   publishStory(storyID)
    //   $(this).siblings(".published").text("PUBLISHED");

    // });


  ///////// PUBLISH STORY ///////////
  $('.publish-button').on('click', function (event) {
    event.preventDefault();
console.log("click publish")
    const storyId = $(this).data('story-id');

    $.ajax({
      method: 'POST',
      url: `/stories/${storyId}/publish`,
      success: function () {
        location.reload();
      },
      error: function () {
        console.error('Error publishing story:');
        alert('There was an error publishing this story.');
      }
    });
  });








