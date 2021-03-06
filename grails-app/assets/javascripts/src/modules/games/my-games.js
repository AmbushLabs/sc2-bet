import React, { Component, PropTypes } from 'react';
import GameList from './../games/game-list';
import {
    SET_CURRENT_MY_GAMES_TAB
} from './../../actions/actions';

export default class MyGames extends Component {

    constructor(options) {
        super(options);
        this.isSelected = this.isSelected.bind(this);
        this.getGames = this.getGames.bind(this);
        this.setGameState = this.setGameState.bind(this);
        this.getCount = this.getCount.bind(this);
    }

    render () {
        return (
            <section>
                <div className="my1 mxn1 h6">
                    <div href="#"
                       className={"btn btn-narrow " + this.isSelected('to_approve')}
                       onClick={this.setGameState}
                       data-list-type="to_approve">
                        <div>Needs Approval{this.getCount('to_approve')}</div>
                        <div className="my-game-selected-state"></div>
                    </div>
                    <div href="#"
                       className={"btn btn-narrow " + this.isSelected('waiting')}
                       onClick={this.setGameState}
                       data-list-type="waiting">
                        <div>My Pending Contests{this.getCount('waiting')}</div>
                        <div className="my-game-selected-state"></div>
                    </div>
                    <div href="#"
                       className={"btn btn-narrow " + this.isSelected('ready')}
                       onClick={this.setGameState}
                       data-list-type="ready">
                        <div>Ready to Play!{this.getCount('ready')}</div>
                        <div className="my-game-selected-state"></div>
                    </div>
                </div>
                <GameList
                    colSize="col-12 lg-col-6"
                    listType="created_or_joined"
                    limit={2}
                    games={this.getGames()}
                    dispatch={this.props.dispatch}
                    loggedIn={this.props.loggedIn}
                    showPaging={true}
                    csrf={this.props.csrf}
                    />
            </section>
        );
    }

    isSelected(type) {
        if (type == this.props.games.current_my_games_tab) {
            return 'blue my-games-type-selected';
        }
        return '';
    }

    setGameState(ev) {
        var type = $(ev.currentTarget).data('list-type');
        if (type == this.props.games.current_my_games_tab) {
            return;
        }
        this.props.dispatch({
            type: SET_CURRENT_MY_GAMES_TAB,
            my_games_tab: type
        });
    }

    getGames() {
        if (this.props && this.props.games && this.props.games.all) {
            var tmp = _.values(_.pick(this.props.games.all, this.props.games[this.props.games.current_my_games_tab].ids));
            return tmp;
        }
    }

    getCount(type) {
        if (this.props && this.props.games && this.props.games.all) {
            const num = this.props.games[type].ids.length;
            if (num == 0) {
                return "";
            } else {
                return " (" + num + ")";
            }
        }
    }


};
