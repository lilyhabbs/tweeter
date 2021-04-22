$(document).ready(function() {
  // Prevent cross-site scripting
  const escape = function(str) {
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
          <span><img src="${escape(tweet.user.avatars)}">
          ${escape(tweet.user.name)}</span>
          <span>${escape(tweet.user.handle)}</span>
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

  const loadExistingTweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
      .then((tweets) => {
        renderTweets(tweets);
      }).catch((err) => {
        console.log('Error: ', err);
      });
  };

  loadExistingTweets();

  const loadNewTweet = function() {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
      .then((tweets) => {
        const newTweet = createTweetElement(tweets[tweets.length - 1]);
        $('#tweets-container').prepend(newTweet);
      }).catch((err) => {
        console.log('Error: ', err);
      });
  }; 

  
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('.alert').hide()
    
    let newTweetText = $('#tweet-text').val();

    if (!newTweetText.trim()) {
      return $('.alert').show().html('<i class="fa fa-times-circle"></i> Oops! It looks like you forgot to type something...');
    }
    
    if (newTweetText.length > 140) {
      return $('.alert').show().html('<i class="fa fa-times-circle"></i> Unfortunately you have way too many thoughts for one post!');
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
    }).then(() => {
      loadNewTweet();
      $('#tweet-text').val('').focus();
      $('.counter').val('140');
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });

  $('#write-new-button').click(function() {
    $('.new-tweet').slideToggle('fast');
    $('#tweet-text').focus();
  });
});