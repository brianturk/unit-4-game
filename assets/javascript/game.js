var computerNum = 0;
var playerTotal = 0;
var beatlesNum = [0, 0, 0, 0];
var gameStatus = "begin";
var wins = 0;
var losses = 0;

$(document).ready(function () {

    startgame();

    $(document).on("click", ".beatle_image", function (event) {

        if (gameStatus != "over") {

            $(this).finish();  //Remove all buffered animations as there gets to be a lag if user clicks button quickly

            //change border and play sound
            $(this).animate({ "border-color": "red" }).delay(300).animate({ "border-color": "green" });
            $("#button_audio").trigger("play");


            if (gameStatus = "begin") {
                $("#instruction_text").text("Continue selecting Beatles to try and match the computer pick...")
                gameStatus = "ingame"
            }


            playerTotal = playerTotal + $(this).data('beatleNum');
            $("#player_num").text(playerTotal);


            if (playerTotal === computerNum) { //game over and they won
                gameStatus = "over";
                $("#instruction_text").text("");
                $("#instruction_text").append('Congratulations, you Won! <a href="javascript:startgame()">Play Again</a>');
                wins++;
                $("#wins").text(wins);
                $("#win_audio").trigger("play");

            } else if (playerTotal > computerNum) {  //game over and they lost
                gameStatus = "over";
                $("#instruction_text").text("");
                $("#instruction_text").append('Sorry, you lost! <a href="javascript:startgame()">Play Again</a>');
                losses++;
                $("#losses").text(losses);
                $("#loss_audio").trigger("play");
            }
        }


    });


    


});


function startgame() {
    //pick a computer number and four user numbers and check to see if a win is possible.  
    //If win is not possible, pick again
    var winPossible = false;


    if (gameStatus === "over") {
        $("#instruction_text").text("Here we go again.  Select a Beatle to start.  Good Luck!");
    }else {
         $("#instruction_text").text("Welcome to the 70's Beatles Collector Game!  The computer has picked a number.  You have to match that number by selecting Beatles.  Each Beatle has a hidden value from 1 to 12.  When you select a Beatle, its value is revealed and added to your total score.  Good Luck!");
    }
    gameStatus = "begin";
    playerTotal = 0;

    

    while (!winPossible) {
        //pick computer random number 19 to 120
        computerNum = Math.floor((Math.random() * 101) + 19);

        //pick four number for beatles  -- lets make them unique
        $.each(beatlesNum, function (key, value) {
            unique = false;
            while (!unique) {
                beatlesNum[key] = Math.floor((Math.random() * 12) + 1);
                unique = true;
                for (var x = 0; x < key; x++) {
                    if (beatlesNum[x] === beatlesNum[key]) {
                        unique = false;
                    }
                }
            }
        })

        findSum(beatlesNum, computerNum);

        function findSum(numbers, targetSum) {
            var numberSets = powerset(numbers);

            for (var i = 0; i < numberSets.length; i++) {
                var numberSet = numberSets[i];
                if (targetSum % sum(numberSet) == 0) {
                    winPossible = true;
                    i = numberSets.length;  //exit because we found a match
                }
            }
        }


        function sum(arr) {
            var total = 0;
            for (var i = 0; i < arr.length; i++)
                total += arr[i];
            return total
        }

        function powerset(arr) {
            var ps = [[]];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0, len = ps.length; j < len; j++) {
                    ps.push(ps[j].concat(arr[i]));
                }
            }
            return ps;
        }

    }


    //Write computer pick to screen
    $("#computer_num").text(computerNum);
    //clear player total
    $("#player_num").text(0);

    //Data attribute in boxes to beatles value for use when clicking
    $("#john").data('beatleNum', beatlesNum[0]);
    $("#paul").data('beatleNum', beatlesNum[1]);
    $("#george").data('beatleNum', beatlesNum[2]);
    $("#ringo").data('beatleNum', beatlesNum[3]);
}
