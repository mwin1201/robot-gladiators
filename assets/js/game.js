var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

    promptFight = promptFight.toLowerCase();

    if (promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    if (promptFight === "skip" || promptFight === "SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        if (confirmSkip){
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            return true;
        }
    }
    return false;   

};

var fight = function(enemy) {
    var isPlayerTurn = true;
    if (Math.random() > .5) {
        isPlayerTurn = false;
    }

    while(enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                break;
            }
        }
        //var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

        /* if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            if (confirmSkip){
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                break;
            }
        }    */
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left");
            }
            //generate random value for damage
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died! You have lost your robot in battle. Game Over!");
                break;
            } 
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }

            isPlayerTurn = !isPlayerTurn;
        }
    };

var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0){
            window.alert("Welcome to the Robot Gladiators! Round " + (i+1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            // if we are not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                //if yes take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
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

    window.alert("The game has now ended. Let's see how you did!");

     // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } 
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } 
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

    /* //if player is still alive, player wins!
    if (playerInfo.health > 0){
        window.alert("Great job, you've survived the game! you now have a score of " + playerInfo.money +".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    //local storage check
    var highScore = localStorage.getItem(playerInfo.name);
    if (playerInfo.money > highScore) {
        window.alert("You got a new highscore of " + playerInfo.money + "!");
        localStorage.setItem(playerInfo.name, playerInfo.money);
    }
    else{
        window.alert("Didn't beat your high score this time.");
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
}; */


var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: '1', '2', or '3' to make a choice."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt); 

    //use switch to carry out the action
    switch (shopOptionPrompt) {        

        case 1:
            playerInfo.refillHealth();
            break;
        
        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");

            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;

    }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};


var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }


    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo ={
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    }
};

console.log(playerInfo.name, playerInfo.health, playerInfo.attack);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();