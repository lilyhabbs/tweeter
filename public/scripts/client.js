$(document).ready(function() {
  // Prevent cross-site scripting
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
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
        
        <div>${escape(tweet.content.text)}</div>
        
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
      }).catch((err) => {
        console.log('Error: ', err);
      });
  };

  // Initially display existing tweets on page load
  loadTweets();
  
  $('form').on('submit', function(event) {
    event.preventDefault();
    let newTweetText = $('#tweet-text').val();
    
    if (!newTweetText) {
      alert('You can\'t submit a blank tweet!');
      return;
    }

    if (newTweetText.length > 140) {
      alert('You have exceeded the maximum number of characters!');
      return;
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
    }).then(() => {
      $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
        .then(function(tweets) {
          const newTweetObj = tweets[tweets.length - 1];
          $('#tweets-container').prepend(createTweetElement(newTweetObj));
          $('#tweet-text').val('');
        });
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });
});