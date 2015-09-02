<header class="center px3 py1 white bg-navy bg-cover bg-center">
    <h1 class="h1 h0-responsive caps mt4 mb0 regular">Welcome ${character_name}!</h1>
    <p class="h3">Play the craphts for the duckets with yoo friends</p>
    <a href="#" class="h4 btn btn-primary mb4" data-ui-element="find-game">Find a Game</a>
</header>
<section id="game_list">

</section>
<script type="text/jsx">
    var games = {};
    var gameEventEmitter = new EventEmitter();
    gameEventEmitter.on("games_load", function(games) {
        console.log('hi load games');
        console.log(games);
    });
</script>