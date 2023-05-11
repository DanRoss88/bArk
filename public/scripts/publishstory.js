  const storyID = req.params.id;
  if (!storyID) {
    res.status().send('error no story');
  }
  try {
    await publishStory(storyID);
    res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
