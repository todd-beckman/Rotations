var teamnames = ["Player 1", "Player 2"];

var init = function() {
    console.write("Loading...");


    for (var x = 0; x < game.numteams; x++) {
        game.team.push(new Team(teamnames[x], x));
        game.team[x].updateGUI(x);
    }

    updateFieldGUI();

    console.clear();
    game.gameon = true;
    game.print("Game loaded!");
}
