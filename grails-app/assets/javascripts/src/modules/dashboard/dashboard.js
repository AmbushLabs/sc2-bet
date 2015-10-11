import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GameList from './../games/game-list';
import MyGames from './../games/my-games';
import ProfileCard from './../profile/profile-card';

@connect(state => (state))
class Dashboard extends Component {

    constructor(options) {
        super(options);
        this.getSearchGames = this.getSearchGames.bind(this);
    }

    render() {
        return (
            <section className="bg-darken-1 p2 clearfix">
                <section className="col col-6 pr2 pb2">
                    <div className="bg-white p1 mr2 mb2 clearfix">
                        <ProfileCard user="user data in dis here"
                            />
                    </div>
                </section>
                <section className="col col-6">
                    <div className="bg-white p1 mb2 clearfix">
                        <MyGames
                            games={this.props.games}
                            />
                    </div>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12">
                    <div className="bg-white p1 clearfix">
                        <GameList colSize="col-3"
                                  listType="search"
                                  showModal={this.props.showModal}
                                  limit={8}
                                  games={this.getSearchGames()}
                                    />
                    </div>
                </section>
            </section>
        );
    }

    getSearchGames() {
        if (this.props && this.props.games && this.props.games.search_games) {
            var tmp = _.values(_.pick(this.props.games.search_games, this.props.games.search.ids));
            return tmp;
            /*return this.props.games.search_games.filter(
                (element, key) => { this.props.games.search.ids.indexOf(key) > -1 }.bind(this)
            );*/
        }
    }

};

export default Dashboard;