var teamnames = ["Player 1", "Player 2"];

var init = function() {
    console.write("Loading...");


    for (var x = 0; x < game.numteams; x++) {
        game.teams.push(new Team(teamnames[x], x));
        game.teams[x].updateGUI(x);
    }

    updateFieldGUI();

    console.clear();
    game.gameon = true;
    game.write("Game loaded!");
}