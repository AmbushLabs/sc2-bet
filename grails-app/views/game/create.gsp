<%--
  Created by IntelliJ IDEA.
  User: aaronhenshaw
  Date: 8/3/15
  Time: 11:30 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <asset:javascript src="game/create.js"/>
</head>

<body>
    <section class="container" id="container">

    </section>
    <script type="text/jsx">
        var GameList = React.createClass({
            render: function() {
                return (
                    <div className="commentList">
                        Hello, world! I am a CommentList.
                    </div>
                );
            }
        });
        var GameCard = React.createClass({
            render: function() {
                return (
                    <div className="md-col-2">
                        <div className="p2 bg-white border rounded">
                            <img src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" className="mb2" />
                            <h1 className="h2 mt0">Wager: {this.props.wager}</h1>
                            <p className="mb0">Skill: {this.props.level}</p>
                        </div>
                    </div>
                );
            }
        });
        var GameController = React.createClass({
            render: function() {
                return (
                    <div className="thinger">
                        <h1>Games</h1>
                        <GameList />
                    </div>
                );
            }
        })
        React.render(
            <GameController />,
            document.getElementById('container')
        );


        var CreateGameForm = React.createClass({
            handleSubmit: function(e) {
                e.preventDefault();
                var wagerAmount = React.findDOMNode(this.refs.wager_amount).value.trim();
                if (!wagerAmount) {
                    return;
                }
                // TODO: send request to the server
                React.findDOMNode(this.refs.wager_amount).value = '';
                return;
            },
            render: function() {
                return (
                    <form className="sm-col-6">
                        <h1>Create a game</h1>
                        <h3>Set the number of tokens to wager</h3>
                        <label>Wager Amount</label>
                        <input type="number" className="block col-12 mb1 field" ref="wager_amount" />
                        <input type="submit" className="btn btn-primary" value="Create Game" />
                        <button type="reset" className="btn btn-primary black bg-gray">Cancel</button>
                    </form>
                );
            }
        });
        /*
        React.render(
            <CreateGameForm />,
            document.getElementById('container')
        );
        */
        /*
        var CommentForm = React.createClass({
            render: function() {
                return (
                    <form class="sm-col-6" action="/game" method="post">
                    <h1>Create a game</h1>
                    <h3>Set the number of tokens to wager</h3>
                    <label>Wager Amount</label>
                    <input type="number" class="block col-12 mb1 field">
                        <button type="submit" class="btn btn-primary">Create Game</button>
                        <button type="reset" class="btn btn-primary black bg-gray">Cancel</button>
                    </form>
                );
            }
        });*/
    </script>
</body>
</html>