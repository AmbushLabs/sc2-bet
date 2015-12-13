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
        this.getSelectedText = this.getSelectedText.bind(this);
    }

    render() {
        return (
            <section className="bg-darken-1 p2 clearfix">
                <section className="col col-6 pr2 pb2">
                    <div className="mr2 mb2 clearfix">
                        <ProfileCard
                            user={this.props.user}
                            />
                    </div>
                </section>
                <section className="col col-6">
                    <div className="bg-white p1 mb2 clearfix my-games">
                        <MyGames
                            games={this.props.games}
                            dispatch={this.props.dispatch}
                            />
                    </div>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12 bg-white p1 mb2">
                    <section className="col col-12">
                        <p className="h3 ml1 mt1">Join an Empty Contest</p>
                    </section>
                    <section className="col col-12">
                        <div className="bg-white clearfix">
                            <GameList
                                colSize="col-3"
                                listType="search"
                                limit={8}
                                games={this.getEmptyGames()}
                                dispatch={this.props.dispatch}
                                />
                        </div>
                    </section>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12 bg-white p1">
                    <section className="col col-9">
                        <p className="h3 ml1 mt1">Find a Contest by Skill Level</p>
                    </section>
                    <section className="col col-3 right">
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

                    <section className="col col-12">
                        <div className="bg-white clearfix">
                            <GameList
                                colSize="col-3"
                                listType="search"
                                limit={8}
                                games={this.getSearchGames()}
                                dispatch={this.props.dispatch}
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
        if (this.props && this.props.games && this.props.games.all) {
            var rank = this.props.games.selected_rank;
            var tmp = _.values(_.pick(this.props.games.all, this.props.games.search.ids));
            return tmp.filter((element) => element.rank == rank);
        }
    }

    getEmptyGames() {
        if (this.props && this.props.games && this.props.games.all) {
            var tmp = _.values(_.pick(this.props.games.all, this.props.games.search.ids));
            return tmp.filter((element) => element.rank == null);
        }
    }

};

export default Dashboard;