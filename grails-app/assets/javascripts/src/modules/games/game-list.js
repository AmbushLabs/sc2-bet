import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GameCard from "./game-card";

class GameList extends Component {

    constructor(options) {
        super(options);
        this.getPaginationControls = this.getPaginationControls.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.getPrevClassName = this.getPrevClassName.bind(this);
        this.getNextClassName = this.getNextClassName.bind(this);
        this.getCleanListName = this.getCleanListName.bind(this);
        this.state = {
            page: 1
        };
    }

    render() {
        if (_.isNull(this.props.games) || _.isUndefined(this.props.games) || this.props.games.length == 0) {
            const gameListType = this.getCleanListName(this.props.listType);
            return (
                <div className="col col-12 center p2 mt2">
                    <p className="ss-icons ss-swords h1"></p>
                    <p className="center h4">You have no contests {gameListType}. Join an empty contest and share to a friend to challenge, or be the challenger of an existing contest below.</p>
                </div>
            );
        }
        const { colSize, games, dispatch, loggedIn, innerClassA, innerClassB, innerClassDelegate, limit } = this.props;
        const page = this.state.page;
        const minIndex = limit*(page-1);
        var gameNodes = games.filter((game) => game.is_active).filter((game, index) => index < (minIndex + limit) && index >= minIndex).map((game, index) => {
            var innerClass = null;
            if (innerClassA && innerClassB && innerClassDelegate) {
                if (innerClassDelegate(index)) {
                    innerClass = innerClassA;
                } else {
                    innerClass = innerClassB;
                }
            }

            return (
                <GameCard
                    game={game}
                    colSize={colSize}
                    dispatch={dispatch}
                    loggedIn={loggedIn}
                    innerClass={innerClass}
                    />
            );
        });
        return (
            <div>
                <div className="clearfix">
                    {gameNodes}
                </div>
                {this.getPaginationControls()}
            </div>
        );
    }

    getPaginationControls() {
        if (_.isUndefined(this.props.showPaging) && _.isNull(this.props.showPaging) || !this.props.showPaging) {
            return '';
        }
        if (!_.isUndefined(this.props.games) && !_.isNull(this.props.games) && this.props.games.length > this.props.limit) {
            var pages = Math.ceil(this.props.games.length/this.props.limit);
            //heh super simple, one page at a time :)
            return (
                <div className="h6 clearfix col col-12 px1">
                    <a href="#" className={"ss-icons ss-navigateleft " + this.getPrevClassName()} onClick={() => this.previousPage()}></a>&nbsp;
                    <span className="black">Page {this.state.page} of {pages}</span>&nbsp;
                    <a href="#" className={"ss-icons ss-navigateright " + this.getNextClassName()} onClick={() => this.nextPage()}></a>
                </div>
            );
        } else {
            return (
                <div className="h6 clearfix col col-12 px1">
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
        if (this.state.page+1 > Math.ceil(this.props.games.length/this.props.limit)) {
            return "gray";
        }
        return "blue;"
    }

    componentDidMount() {

    }

    nextPage() {
        if (this.state.page+1 > Math.ceil(this.props.games.length/this.props.limit)) {
            return;
        }
        this.setState({page:this.state.page+1});
    }

    previousPage() {
        if (this.state.page == 1) {
            return;
        }
        this.setState({page:this.state.page-1});
    }

    getCleanListName(listType) {
        const defName = "currently";
        if (_.isUndefined(listType) || _.isNull(listType))
            return defName;
        if (listType == "created_or_joined") {
            return "waiting for your approval";
        }
        if (listType == 'starting_empty') {
            return "available that are empty";
        }
        return listType;

    }

};

export default GameList;

