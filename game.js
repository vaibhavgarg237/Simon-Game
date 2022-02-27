var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = 0;
var level = 0;

//start game
$("body").keypress(function() {
    $("#level-title").text("Level " + level);
    if (gameStarted == 0) {
        nextSequence();
        gameStarted = 1;
    }

})

$("div .btn").click(function(event) { //used .btn to specify to click on 1 button not on every button
    var userChosenColour = event.target.id; // $(this).attr("id"); -without using event
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
});

function checkAnswer(currenLevel) {
    if (gamePattern[currenLevel - 1] === userClickedPattern[currenLevel - 1]) {
        console.log("success");
        if (currenLevel === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("Not HEHE");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = 0;
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(250).fadeIn(250);
    playSound(randomChosenColour);
}

function animatePress(currenColor) {
    $('#' + currenColor).addClass("pressed");
    setTimeout(function() {
        $('#' + currenColor).removeClass("pressed");
    }, 100);

}

function playSound(colName) {
    var audio = new Audio("sounds/" + colName + ".mp3");
    audio.play();
}
//nextSequence();