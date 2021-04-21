$(document).ready(function() {
  // Temporary data to be deleted
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1619027048782
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // Convert created date from epoch to time ago format
  const convertDate = function(epochDate) {
    return timeago.format(epochDate);
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
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
    `);
    
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  
  renderTweets(data);

  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: tweet,
    }).then(() => {
      console.log('Success!');
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });
});