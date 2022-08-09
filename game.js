buttonColor = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickPattern = []
var started = false
var level = 0

function startOver(){
  level = 0
  started = false
  gamePattern = []
}
$(document).keypress(function(event)
{
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})


$(".btn").click(function()
{
    var userChosenColor = $(this).attr("id")
    userClickPattern.push(userChosenColor)
    animatePress(userChosenColor)
    playSound(userChosenColor)
    checkAnswer(userClickPattern.length-1)
})


function nextSequence()
{ level += 1
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4)
  var randomChosenColor = buttonColor[randomNumber]
  $( "." + randomChosenColor).fadeOut(200)
  $( "." + randomChosenColor).fadeIn(200)
  gamePattern.push(randomChosenColor)
  playSound(randomChosenColor)
  userClickPattern = []
  index = 0
}

function playSound(name)
{
   var audio = new Audio("sounds/" + name + ".mp3")
   audio.play()
}

function animatePress(currentColor)
{
  $("." + currentColor).addClass("pressed")
  setTimeout(function()
  {
    $("." + currentColor).removeClass("pressed")
  }, 200);
}

function checkAnswer(currentLevel)
{
      //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
      if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickPattern.length === gamePattern.length){

          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);

        }

      } else {

        $("body").addClass("game-over")
        setTimeout(function(){
          $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        var audio = new Audio("sounds/wrong.mp3")
        audio.play()
        startOver()
      }

  }

