import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GameCard from "./game-card";

class GameList extends Component {

    render() {
        if (_.isNull(this.props.games) || _.isUndefined(this.props.games) || this.props.games.length == 0) {
            return (
                <div className={"col " + this.props.colSize}>
                    <p>No active games</p>
                    <button className="btn btn-primary mb1 mt1 bg-blue mr1 col-11" onClick={this.props.showModal}>
                        Create Game
                    </button>
                </div>
            );
        }
        var gameNodes = this.props.games.map($.proxy(function(game) {
            return (
                <GameCard game={game} colSize={this.props.colSize} />
            );
        }, this));
        return (
            <div>
                <div className="clearfix">
                    {gameNodes}
                </div>
                {/*this.getPaginationControls() */}
            </div>
        );
    }

    getPaginationControls() {
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
    }

    getPrevClassName() {
        if (this.state.page == 1) {
            return "gray";
        }
        return "blue";
    }

    getNextClassName() {
        if (this.state.page+1 > Math.ceil(this.props.gameData.count/this.props.limit)) {
            return "gray";
        }
        return "blue;"
    }

    componentDidMount() {

    }

    nextPage() {
        if (this.state.page+1 > Math.ceil(this.props.gameData.count/this.props.limit)) {
            return;
        }
        this.getList(this.state.page+1);
    }

    previousPage() {
        if (this.state.page == 1) {
            return;
        }
        this.getList(this.state.page-1);
    }

    getList(page) {
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

};

function fetchGames(listType, page, limit) {
    return function (dispatch) {
        dispatch({
            type:'FETCH_GAMES',
            isFetching: true
        });

        return fetch('/game/list/' + listType + '?limit=' + limit + '&page=' + page, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(json =>
            dispatch({
                type:'FETCH_GAMES',
                isFetching: false,
                status:'SUCCESS',
                gameData:json
            })
        );
    }
}

export default GameList;

