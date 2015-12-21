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
    }

    render () {
        return (
            <section>
                <div className="my1 mxn1 h6">
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('to_approve')}
                       onClick={this.setGameState}
                       data-list-type="to_approve">Needs Approval</a>
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('waiting')}
                       onClick={this.setGameState}
                       data-list-type="waiting">My Pending Contests</a>
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('ready')}
                       onClick={this.setGameState}
                       data-list-type="ready">Ready to Play!</a>
                </div>
                <GameList
                    colSize="col-6"
                    listType="created_or_joined"
                    limit={4}
                    games={this.getGames()}
                    dispatch={this.props.dispatch}
                    />
            </section>
        );
    }

    isSelected(type) {
        if (type == this.props.games.current_my_games_tab) {
            return 'blue';
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


};
