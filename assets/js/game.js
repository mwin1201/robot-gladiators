var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {

    while(enemyHealth > 0 && playerHealth > 0) {
        
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            if (confirmSkip){
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                playerMoney = playerMoney - 10;
                break;
            }
        }   
            enemyHealth = enemyHealth - playerAttack;
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                playerMoney = playerMoney + 20;
                break;
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left");
            }
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died! You have lost your robot in battle. Game Over!");
                break;
            } 
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        }
    };

var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++){
        if (playerHealth > 0){
            window.alert("Welcome to the Robot Gladiators! Round " + (i+1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName); 
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    
    //player is either out of health or enemies to fight
    endGame();
};

//function to end the entire game
var endGame = function() {
    //if player is still alive, player wins!
    if (playerHealth > 0){
        window.alert("Great job, you've survived the game! you now have a score of " + playerMoney +".");
    }
    else {
        window.alert("You've lost your robot in battel.");
    }

    //ask player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing. Come back soon!");
    }
};

startGame();