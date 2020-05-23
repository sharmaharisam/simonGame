var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var counter =0;
var gamePattern = [];
var level = 0;
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}


$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
});



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
  }, 100);
}



$("body").keydown(function(){
   if(counter===0){
     nextSequence();
    counter++; }
})


function startOver() {
  counter=0;
  level=0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(nextSequence,1000);
      userClickedPattern = [];
    }
  }
  else
  {
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   },200);
   $("h1").text("Game Over, Press Any Key to Restart");
   startOver();
  }
}
