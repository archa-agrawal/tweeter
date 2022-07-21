"use strict";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
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

    $($header).append($tweetAvatar, $tweetName, $tweetHandle);
    $($footer).prepend($tweetTime);
    $($tweetElement).append($header, $content, "<hr>", $footer);

    $($tweetAvatar).attr("src", `${tweet.user.avatars}`);
    $($tweetName).text(tweet.user.name);
    $($tweetHandle).text(tweet.user.handle);
    $($content).text(tweet.content.text);
    $($tweetTime).text(`${timeago.format(tweet.created_at)}`); // eslint-disable-line no-undef

    return $tweetElement;
  };

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

  $("#post-new-tweet").submit((event) => {
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
  });

  const loadTweets = function() {
    $.ajax("http://localhost:8080/tweets", { method: "GET" }).then(
      (response) => {
        renderTweets(response);
      }
    );
  };
  loadTweets();
});
