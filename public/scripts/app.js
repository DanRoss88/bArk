// Client facing scripts here




$(document).ready(function () {


  //////// NAVBAR BUTTON //////
  $("#bark-button").click(() => {
    $('#stories-form').slideToggle().find('textArea').focus();

  });

  ///////// EDIT SLIDE DOWN //////
  let $editForm = $('.editing-form').hide();

  $('#edit-slide-button').click(() => {
    $editForm.slideToggle('slow', 'swing').focus();
  });
  ///// UPDATE //////
});

const { editStory } = require("../../db/queries/stories");
$(document).on('click', '.update-button', function (event) {
  event.preventDefault();

  const storyID = $(this).data('story-id');
  const title = $('#edit-story-title').val();
  const content = $('#edit-story-content').val();

  const data = { title, content };

  $.ajax({
    url: `/stories/${storyID}`,
    method: 'PUT',
    data: data,
    success: function (response) {
      console.log('Story updated successfully', response);
      // Retrieve the updated stories and replace the existing story with the updated one
      $.ajax({
        url: '/stories',
        method: 'GET',
        success: function (response) {
          const stories = response;
          const updatedStory = stories.find(story => story.id === storyID);
          const updatedStoryHTML = editStory(updatedStory);
          $(`#story-${storyID}`).replaceWith(updatedStoryHTML);
        },
        error: function (error) {
          console.error('Error retrieving stories:', error);
        }
      });
    },
    error: function (error) {
      console.error('Error updating story:', error);
    }
  });
});

///// DELETE //////
// // DELETE STORY
// $(document).on('click', '.delete-button', function (event) {
//   event.preventDefault();

//   const storyID = $(this).data('story-id');

//   $.ajax({
//     url: `/stories/${storyID}`,
//     method: 'DELETE',
//     success: function (response) {
//       console.log('Story deleted successfully', response);
//       // Remove the deleted story from the DOM
//       $(`#story-${storyID}`).remove();
//     },
//     error: function (error) {
//       console.error('Error deleting story:', error);
//     }
//   });
// });

////// PUBLISH /////
// PUBLISH STORY
$(document).on('click', '.publish-button', function (event) {
  event.preventDefault();

  const storyID = $(this).data('story-id');

  $.ajax({
    url: `/stories/${storyID}/publish`,
    method: 'PUT',
    success: function (response) {
      console.log('Story published successfully', response);
      // Update the published status of the story in the DOM
      $(`#story-${storyID}`).addClass('published');
    },
    error: function (error) {
      console.error('Error publishing story:', error);
    }
  });
});


// $(document).ready(function() {
//   // ADD STORY
//   $('#stories-form').submit(function(event) {
//     event.preventDefault();

//     const title = $('#story-title').val();
//     const content = $('#story-content').val();

//     const data = { title, content };

//     $.ajax({
//       url: '/stories',
//       method: 'POST',
//       data: data,
//       success: function(response) {
//         console.log('Story added successfully');
//         // Retrieve the newly added stories and append them to the story container
//         $.ajax({
//           url: '/stories',
//           method: 'GET',
//           success: function(response) {
//             const stories = response;
//             $('#story-container').empty();
//             stories.forEach(function(story) {
//               const storyHTML = createStoryElement(story);
//               $('#story-container').append(storyHTML);
//             });
//           },
//           error: function(error) {
//             console.error('Error retrieving stories:', error);
//           }
//         });
//       },
//       error: function(error) {
//         console.error('Error adding story:', error);
//       }
//     });
//   });






//   // Helper function to create story HTML
//   const createStoryElement = function(story) {
//     const storyHTML = `
//     <article id="story-${story.id}" class="story">
//       <h2>${story.title}</h2>
//       <p>${story.content}</p>
//       <div class="actions">
//         <button class="update-button" data-story-id="${story.id}">Edit</button>
//         <button class="delete-button" data-story-id="${story.id}">Delete</button>
//         ${!story.published_status ? `<button class="publish-button" data-story-id="${story.id}">Publish</button>` : ''}
//       </div>
//     </article>
//   `;
//   return storyHTML;
// };

// // GET stories on page load
// $(document).ready(function() {
//   $.ajax({
//     url: '/stories',
//     method: 'GET',
//     success: function(response) {
//       const stories = response;
//       stories.forEach(function(story) {
//         const storyHTML = createStoryElement(story);
//         $('#story-container').append(storyHTML);
//       });
//     },
//     error: function(error) {
//       console.error('Error retrieving stories:', error);
//     }
//   });
// });
// });
// });

// ///// ADD ONLY THE TEXT AREA BUTTONS /////
// $('#story-form').submit((event) => {
//   event.preventDefault(); // Prevent the default form submission

//   const title = $('#story-title').val();
//   const content = $('#story-content').val();

//   // Create a data object with the desired fields
//   const data = {
//     title: title,
//     content: content
//   };

//   // Send an AJAX request to the server
//   $.ajax({
//     url: '/stories',
//     method: 'POST',
//     data: data,
//     success: function(response) {
//       // Handle the success response
//       console.log('Story submitted successfully');
//       // You can perform additional actions, such as redirecting to a different page
//     },
//     error: function(error) {
//       // Handle the error response
//       console.error('Error submitting story:', error);
//     }
//   });
// });
//

