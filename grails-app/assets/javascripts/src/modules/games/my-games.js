import React, { Component, PropTypes } from 'react';
import GameList from './../games/game-list';

export default class MyGames extends Component {

    constructor(options) {
        super(options);
        this.isSelected = this.isSelected.bind(this);
        this.getGames = this.getGames.bind(this);
        this.setGameState = this.setGameState.bind(this);
        this.state = {
            current_tab: 'to_approve'
        };
    }

    render () {
        return (
            <section>
                <div className="my1 mxn1 h6">
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('to_approve')}
                       onClick={this.setGameState}
                       data-list-type="to_approve">To Approve</a>
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('ready')}
                       onClick={this.setGameState}
                       data-list-type="ready">Ready to Play</a>
                    <a href="#"
                       className={"btn btn-narrow " + this.isSelected('waiting')}
                       onClick={this.setGameState}
                       data-list-type="waiting">Pending</a>
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
        if (type == this.state.current_tab) {
            return 'blue';
        }
        return '';
    }

    setGameState(ev) {
        var type = $(ev.currentTarget).data('list-type');
        if (type == this.state.current_tab) {
            return;
        }

        this.setState({current_tab:type});
    }

    getGames() {
        if (this.props && this.props.games && this.props.games.all) {
            var tmp = _.values(_.pick(this.props.games.all, this.props.games[this.state.current_tab].ids));
            return tmp;
        }
    }


};
