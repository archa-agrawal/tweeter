/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweet =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1658104604092
}

$(document).ready(function() {
  
  const createTweetElement = function () {
    
    const tweetElement = document.createElement('article');
    const header = document.createElement('header');
    const content = document.createElement('p');
    const footer = document.createElement('footer');
    const tweetName = document.createElement('h5');
    const tweetAvatar = document.createElement('img');
    const tweetHandle = document.createElement('h5');

    header.append(tweetAvatar);
    header.append(tweetName);
    header.append(tweetHandle)

    tweetElement.append(header);
    tweetElement.append(content);
    tweetElement.append(footer);

    tweetAvatar.innerHTML = `href= "${tweet.user.avatars}"`;
    tweetName.innerHTML = tweet.user.name;
    tweetHandle.innerHTML = tweet.user.handle;
    content.innerHTML = tweet.content.text;
    footer.innerHTML = tweet.created_at;
    
    return tweetElement
  }
  const $tweet = createTweetElement(tweet);
  console.log($tweet);
  $('#tweets-container').append($tweet);

});
