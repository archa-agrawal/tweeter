// this function implements the character counter.
$(document).ready(function() {
  const initialCount = 140;

  $('#tweet-text').on('input', function(event) {
    const counter = $(this).parent().find('.counter')[0];
    const newCount = initialCount - event.target.value.length;
    $(counter).val(newCount);
    if(newCount < 0){
      $(counter).addClass('counter-minus');
    }else{
      $(counter).removeClass('counter-minus');
    }  
  })
});