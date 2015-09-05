<header class="px2 py1 white bg-navy bg-cover bg-center left-align">
    <p class="h4 mb0">Welcome ${character_name}!</p>
    <h1 class="h1 h0-responsive caps mt0 mb0 regular">Games</h1>
</header>
<section id="game_list">

</section>
<script type="text/jsx">
    var games = {};
    var gameEventEmitter = new EventEmitter();


    var GameItem = React.createClass({
        render: function() {
            return (
                    <div className="col col-4">
                        <div className="border m2 p2">
                            Wager: {this.props.wager}<br />
                            {this.props.characterName}<br />
                            {this.props.primaryRace}<br />
                            {this.props.highest1v1Rank}
                        </div>
                    </div>
            );
        }
    });

    var GameList = React.createClass({
        render: function() {
            var gameNodes = this.props.games.map(function(game) {
                return (
                    <GameItem characterName={game.creator.display_name}
                              primaryRace={game.creator.primary_race}
                              highest1v1Rank={game.creator.highest_1v1_rank}
                              wager={game.wager} />
                );
            });
            return (
                <div className="clearfix">
                    {gameNodes}
                </div>
            );
        },
        componentDidMount: function() {
            gameEventEmitter.on("games_load", $.proxy(function(games) {
                this.setProps({games:games});
            }, this));
            $.ajax({
                url:'/game/list',
                success: $.proxy(function(resp) {
                    this.setProps({games:resp});
                },this)
            });
        }
    });

    React.render(
        <GameList games={[]} />,
        document.getElementById('game_list')
    );

</script>