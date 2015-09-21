import React from './../../lib/react';
import GameCard from "./game-card";
import ReactIntl from './../../lib/react-intl';

var GameList = React.createClass({
    mixins:[ReactIntl.IntlMixin],
    getInitialState: function() {
        return {
            page:1
        };
    },
    render: function() {
        if (_.isNull(this.props.gameData.games) || this.props.gameData.games.length == 0) {
            return (
                <div className={"col " + this.props.colSize}>
                    <p>{this.getIntlMessage('NO_ACTIVE_GAMES')}</p>
                    <button className="btn btn-primary mb1 mt1 bg-blue mr1 col-11" onClick={this.props.showModal}>
                        {this.getIntlMessage('CREATE_GAME')}
                    </button>
                </div>
            );
        }
        var gameNodes = this.props.gameData.games.map($.proxy(function(game) {
            return (
                <GameCard game={game} colSize={this.props.colSize} />
            );
        }, this));
        return (
            <div>
                <div className="clearfix">
                    {gameNodes}
                </div>
                {this.getPaginationControls()}
            </div>
        );
    },
    getPaginationControls: function() {
        if (!_.isUndefined(this.props.gameData.count) && !_.isNull(this.props.gameData.count) && this.props.gameData.count > this.props.limit) {
            var pages = Math.ceil(this.props.gameData.count/this.props.limit);
            //heh super simple, one page at a time :)
            return (
                <div className="h6 clearfix">
                    <a href="#" className={"ss-icon ss-navigateleft " + this.getPrevClassName()} onClick={this.previousPage}>&nbsp;</a>&nbsp;
                    <span className="black">Page {this.state.page} of {pages}</span>&nbsp;
                    <a href="#" className={"ss-icon ss-navigateright " + this.getNextClassName()} onClick={this.nextPage}>&nbsp;</a>
                </div>
            );
        } else {
            return (
                <div className="h6 clearfix">
                    Page 1 of 1
                </div>
            );
        }
    },
    getPrevClassName: function() {
        if (this.state.page == 1) {
            return "gray";
        }
        return "blue";
    },
    getNextClassName: function() {
        if (this.state.page+1 > Math.ceil(this.props.gameData.count/this.props.limit)) {
            return "gray";
        }
        return "blue;"
    },
    componentDidMount: function() {
        this.getList();
    },
    nextPage: function() {
        if (this.state.page+1 > Math.ceil(this.props.gameData.count/this.props.limit)) {
            return;
        }
        console.log(this.state.page);
        this.getList(this.state.page+1);
    },
    previousPage: function() {
        if (this.state.page == 1) {
            return;
        }
        this.getList(this.state.page-1);
    },
    getList:function(page) {
        if (_.isUndefined(page) || _.isNull(page)) {
            page = this.state.page;
        }
        $.ajax({
            url:'/game/list/' + this.props.listType,
            data: {
                page: page,
                limit: this.props.limit
            },
            success: $.proxy(function(resp) {
                this.props.gameDispatcher.dispatch(resp);
                this.setState({page:page});
            },this)
        });
    }

});

export default GameList;