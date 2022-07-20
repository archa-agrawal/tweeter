'use strict'

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
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
]

$(document).ready(function() {
  
  const createTweetElement = function (tweet) {
    
    const $tweetElement = $(`<article class="tweet"></article>`);
    const $header = $(`<header class="tweet-header"></header>`);
    const $tweetName = $(`<h5 class="tweet-name"></h5>`);
    const $tweetAvatar = $(`<img>`);
    const $tweetHandle = $(`<h5 class="tweet-handle"></h5>`);
    const $content = $(`<p class="tweet-content"></p>`);
    const $footer = 
    $(`
      <footer class="tweet-footer">
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    `);
    const $tweetTime = $(`<p class="tweet-time"></p>`)

    $($header).append($tweetAvatar, $tweetName, $tweetHandle);
    $($footer).prepend($tweetTime)

    $($tweetElement).append($header, $content, '<hr>', $footer);
  
    $($tweetAvatar).attr('src',`${tweet.user.avatars}`);
    $($tweetName).text(tweet.user.name);
    $($tweetHandle).text(tweet.user.handle);
    $($content).text(tweet.content.text);
    $($tweetTime).text(`${daysSince(tweet.created_at)} days ago`);
    
    return $tweetElement;
  }
  
  const renderTweets = function(tweets) {
    
    tweets.forEach(tweet => {
      const tweetsElement = createTweetElement(tweet);
      $("#tweets-container").append(tweetsElement);
    });
  }
  renderTweets(data);

});

const daysSince = (timestamp) =>{
  let difference = new Date() - timestamp;
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
}
