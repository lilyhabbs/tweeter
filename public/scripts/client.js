$(document).ready(function() {
  // Convert created date from epoch to time ago format
  const convertDate = function(epochDate) {
    return timeago.format(epochDate);
  };

  const createTweetElement = function(tweet) {
    const displayTweet = `
      <article class="tweet">
        <header>
          <span><img src="${tweet.user.avatars}">
          ${tweet.user.name}</span>
          <span>${tweet.user.handle}</span>
        </header>
        
        <div>${tweet.content.text}</div>
        
        <footer>
          <span>${convertDate(tweet.created_at)}</span>
          <span>
            <i class="icon fas fa-flag"></i>
            <i class="icon fas fa-retweet"></i>
            <i class="icon fas fa-heart"></i>
          </span>
        </footer>
      </article>
    `;
    
    return displayTweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  // Initially display existing tweets on page load
  loadTweets();
  
  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweet,
    }).then(() => {
      loadTweets();
      $('#tweet-text').val('');
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });
});