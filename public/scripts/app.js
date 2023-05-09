// Client facing scripts here
$(document).ready(function() {

  //// VARIABLES ////
  const $errorGuest = $('#error-msg-guest').hide();
  const $errorNull = $('#error-msg-null').hide();
  const $form = $('#story-form').hide();

  //////// NAVBAR BUTTON //////
  $("#bark-button").click(() => {
    $form.slideToggle().find('textArea').focus();
  });
  /////////
  const createStoryElement = function(stories) {
    //TIMEAGO//
    const dateCreated = timeago.format(stories.created_at);
    //ESCAPE//
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    ///// ADD Story /////
    const storySection = `
      <article class="story-section">
        <header class="story-section-header">
          <img src="IMG SOURCE HERE" alt="User avatar">
            <p>${stories.user.name}</p>
            <p>${stories.user.title}</p>
            </header>
              <div class="story-content">
               ${escape(stories.content)}
              </div>
              <footer>
              <span class="stories-created-at">${dateCreated}</span>
              <div class="actions">
              <button><i class="fa-sharp fa-solid fa-arrow-up"></i></button>
            </div>
          </footer>
        </article>
      `;
    return storySection;
  };

////************** RENDER Stories **************////
  const renderStories = function(stories) {

    const $storiesContainer = $('#stories-container').empty();

    for (const story of stories) {
    const $story = createStoryElement(story);
      $storiesContainer.append($story);
    }
  };
////************* LOAD STORIES **************////
  const loadStories = function() {

    $.ajax({
      url: '/stories',
      method: 'GET',
      dataType: 'json'
    })
      .then(response => {

        renderStories(response);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  loadStories();

  $errorGuest.slideUp();


///////////*************  POST FORM *************//////////////////
  $form.submit(function(event) {

    event.preventDefault();
    const storyContent = $('#story-content');

    ///Error validations///
    if (!storyContent) {
      $errorNull.slideDown();
      return;
    }
    if (!storyContent.user) {
      $errorGuest.slideDown();
      return;
    }

    const formData = $(this).serialize();

    $.ajax({
      url: '/stories',
      method: 'POST',
      data: formData
    })
      .then(loadStories);

    //Error notifications, text value//
      $errorNull.slideUp();
      $errorGuest.slideUp();
    $('#story-content').val('');


  });

});
