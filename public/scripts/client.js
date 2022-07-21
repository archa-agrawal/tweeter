"use strict";

/**
 * This function creates new tweet DOM element.
 * @param {object} tweet - This is a tweet object to create DOM element.
 * @returns DOM element of given tweet object.
 */
const createTweetElement = function(tweet) {
  // Creating all elements
  const $tweetElement = $(`<article class="tweet"></article>`);
  const $header = $(`<header class="tweet-header"></header>`);
  const $tweetName = $(`<h5 class="tweet-name"></h5>`);
  const $tweetAvatar = $(`<img>`);
  const $tweetHandle = $(`<h5 class="tweet-handle"></h5>`);
  const $content = $(`<p class="tweet-content"></p>`);
  const $footer = $(`
    <footer class="tweet-footer">
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  `);
  const $tweetTime = $(`<p class="tweet-time"></p>`);

  // Appending elements to their parents
  $($header).append($tweetAvatar, $tweetName, $tweetHandle);
  $($footer).prepend($tweetTime);
  $($tweetElement).append($header, $content, "<hr>", $footer);

  // Setting values
  $($tweetAvatar).attr("src", `${tweet.user.avatars}`);
  $($tweetName).text(tweet.user.name);
  $($tweetHandle).text(tweet.user.handle);
  $($content).text(tweet.content.text);
  $($tweetTime).text(`${timeago.format(tweet.created_at)}`); // eslint-disable-line no-undef

  return $tweetElement;
};

/**
 * This function takes an array of tweet objects and
 * renders respective DOM elements on the page.
 * @param {Array} tweets - Array of tweet objects
 */
const renderTweets = function(tweets) {
  tweets.sort((a, b) => {
    if (a.created_at < b.created_at) {
      return 1;
    } else {
      return -1;
    }
  });
  tweets.forEach((tweet) => {
    const tweetsElement = createTweetElement(tweet);
    $("#tweets-container").append(tweetsElement);
  });
};

/**
 * This function makes an ajax get requests and calls renderTweets function
 * on returned array of tweet objects.
 */
const loadTweets = function() {
  $.ajax("http://localhost:8080/tweets", { method: "GET" }).then((response) => {
    renderTweets(response);
  });
};

/**
 * This function is eventhandler for tweet botton.
 * @param {event} event - button click event.
 * @returns either error or posts new tweet.
 */
const newTweetHandler = (event) => {
  event.preventDefault();
  $("#content-empty").hide();
  $("#content-too-long").hide();

  const newTweet = $("#tweet-text").val().trim();
  if (!newTweet) {
    return $("#content-empty").slideDown("slow");
  }
  if (newTweet.length > 140) {
    return $("#content-too-long").slideDown("slow");
  }

  const newTweetSerialized = $("#tweet-text").serialize();

  $.ajax(`/tweets`, {
    method: "post",
    data: newTweetSerialized,
  }).then(() => {
    $("#tweet-text").val("");
    $("#counter").val(140);
    $("#tweets-container").empty();
    loadTweets();
  });
};

$(document).ready(function() {
  // loading initial tweets on web page
  loadTweets();

  // assigning event handler to tweet submit event
  $("#post-new-tweet").submit(newTweetHandler);
});
