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

    //check here
    if (checkAnswer()) {
        console.log("correct");
        if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            nextSequence();
        }
    } else {
        console.log("WRONG");
        $("h1").text("Game Over, Press Any Key to Restart");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        //add function inn replace of this
        $("body").keypress(function() {
                $("#level-title").text("Level " + level);
                nextSequence();
            })
            //reboot
    }
});

function checkAnswer() {
    console.log("Game : ");
    console.log(gamePattern);
    console.log(" --   ");
    console.log("user : ");
    console.log(userClickedPattern);
    console.log("__  ");
    if (userClickedPattern[userClickedPattern.length - 1] == gamePattern[userClickedPattern.length - 1]) {
        return true;
    }
    return false;
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