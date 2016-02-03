import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GameList from './../games/game-list';
import MyGames from './../games/my-games';
import ProfileCard from './../profile/profile-card';
import { CHANGE_GAME_FILTER } from './../../actions/actions';

@connect(state => (state))
class Dashboard extends Component {

    constructor(options) {
        super(options);
        this.getSearchGames = this.getSearchGames.bind(this);
        this.getEmptyGames = this.getEmptyGames.bind(this);
        this.getGamesForRank = this.getGamesForRank.bind(this);
        this.getSelectedText = this.getSelectedText.bind(this);
        this.getGamesAwaitingChallenger = this.getGamesAwaitingChallenger.bind(this);
        this.hasGamesAwaitingChallenger = this.hasGamesAwaitingChallenger.bind(this);
        this.getGamesAwaitingChallengerContainerClass = this.getGamesAwaitingChallengerContainerClass.bind(this);
    }

    render() {
        return (
            <section className="bg-darken-1 p2 clearfix">
                <section className="col col-12 md-col-6 pr2 pb2">
                    <div className="mr2 mb2 clearfix">
                        <ProfileCard
                            user={this.props.user}
                            dashboard={true}
                            />
                    </div>
                </section>
                <section className="col col-12 md-col-6">
                    <div className="bg-white p1 mb2 clearfix my-games">
                        <MyGames
                            games={this.props.games}
                            dispatch={this.props.dispatch}
                            loggedIn={this.props.loggedIn}
                            />
                    </div>
                </section>
                <div className="clearfix"></div>
                <section className={"col col-12 " + this.getGamesAwaitingChallengerContainerClass()}>
                    <section className="col col-12">
                        <p className="h3 ml2 mt1">We found a few contests, based on your skill level, that are ready for you to join.</p>
                    </section>
                    <section className="col col-12 mb3">
                        <div className="clearfix">
                            <GameList
                                colSize="col-12 lg-col-6 sm-col-6"
                                innerClassA="p1 clearfix black border bg-white mr2"
                                innerClassB="p1 clearfix black border bg-white"
                                innerClassDelegate={(classNum) => classNum%2 == 0}
                                listType="starting_empty"
                                limit={2}
                                games={this.getGamesAwaitingChallenger()}
                                dispatch={this.props.dispatch}
                                loggedIn={this.props.loggedIn}
                                />
                        </div>
                    </section>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12 mb4">
                    <section className="col col-12">
                        <p className="h3 ml2 mt1">Join a new contest, then get a friend to join it.</p>
                    </section>
                    <section className="col col-12">
                        <div className="clearfix">
                            <GameList
                                colSize="col-12 lg-col-3 sm-col-6"
                                innerClassA="p1 clearfix black border bg-white"
                                innerClassB="p1 clearfix black border bg-white mr1"
                                innerClassDelegate={(classNum) => (classNum+1)%4 == 0}
                                listType="starting_empty"
                                limit={8}
                                games={this.getEmptyGames()}
                                dispatch={this.props.dispatch}
                                loggedIn={this.props.loggedIn}
                                />
                        </div>
                    </section>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12 bg-white mb4">
                    <section className="col col-12 p1 gosu-blue-bg white">
                        <section className="col col-12 sm-col-9">
                            <p className="h3 ml1 mt1">Find Contests by Skill Level.</p>
                        </section>
                        <section className="col col-12 sm-col-3 right p1 gosu-blue-bg white">
                            <select className="block col-12 field"
                                    ref="currentRank"
                                    onChange={() => this.onChangeGames()}>
                                <optgroup label="Select a Rank">
                                    <option value="1" selected={this.getSelectedText(1)}>Master</option>
                                    <option value="2" selected={this.getSelectedText(2)}>Diamond</option>
                                    <option value="3" selected={this.getSelectedText(3)}>Platinum</option>
                                    <option value="4" selected={this.getSelectedText(4)}>Gold</option>
                                    <option value="5" selected={this.getSelectedText(5)}>Silver</option>
                                    <option value="6" selected={this.getSelectedText(6)}>Bronze</option>
                                </optgroup>
                            </select>
                        </section>
                    </section>
                    <section className="col col-12">
                        <div className="bg-white clearfix p1">
                            <GameList
                                colSize="col-12 lg-col-3 sm-col-6"
                                listType="search"
                                limit={8}
                                games={this.getSearchGames()}
                                dispatch={this.props.dispatch}
                                loggedIn={this.props.loggedIn}
                                showPaging={true}
                                />
                        </div>
                    </section>
                </section>
            </section>
        );
    }

    getSelectedText(rank) {
        if(this.props && this.props.games && this.props.games.selected_rank == rank) {
            return 'selected';
        }
        return '';
    }

    onChangeGames() {
        const { dispatch } = this.props;
        dispatch({
            type: CHANGE_GAME_FILTER,
            data: {
                selectedRank: this.refs.currentRank.value
            }
        })
    }

    getSearchGames() {
        return this.getGamesForRank(this.props.games.selected_rank);
    }

    getEmptyGames() {
        return this.getGamesForRank(null);
    }

    getGamesAwaitingChallenger() {
        if (this.props && this.props.games && this.props.games.all) {
            var tmp = [];
            this.props.games.awaiting_challenger.ids.forEach((obj, i) => {
                if (obj in this.props.games.all) {
                    tmp.push(this.props.games.all[obj]);
                }
            });
            return tmp;
        }
    }

    hasGamesAwaitingChallenger() {
        return this.props && this.props.games && this.props.games.all && this.props.games.awaiting_challenger && this.props.games.awaiting_challenger.ids.length > 0;
    }

    getGamesAwaitingChallengerContainerClass() {
        if (this.hasGamesAwaitingChallenger()) {
            return " animated fadeIn";
        }
        return " is_hidden";
    }


    getGamesForRank(rank) {
        if (this.props && this.props.games && this.props.games.all) {
            var tmp = [];
            this.props.games.search.ids.forEach((obj, i) => {
                if (obj in this.props.games.all) {
                    tmp.push(this.props.games.all[obj]);
                }
            });
            return tmp.filter((element) => element.rank == rank);
        }
    }

};

export default Dashboard;