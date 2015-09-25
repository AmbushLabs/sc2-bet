import React from 'react';
import ReactIntl from 'react-intl';
import GameList from './../games/game-list';
import MyGames from './../games/my-games';

var Dashboard = React.createClass({
    mixins: [ReactIntl.IntlMixin],
    render: function() {
        return (
            <section className="bg-darken-1 p2 clearfix">
                <section className="col col-6 pr2 pb2">
                    <div className="bg-white p1 mr2 mb2 clearfix">
                        Insert own view of profile here.
                    </div>
                </section>
                <section className="col col-6">
                    <div className="bg-white p1 mb2 clearfix">
                        <MyGames myGameData={this.props.myGameData}
                                  gameDispatcher={this.props.myGameDispatcher}
                                  showModal={this.props.showModal}
                                    />
                    </div>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12">
                    <div className="bg-white p1 clearfix">
                        <GameList gameData={this.props.searchGameData}
                                  gameDispatcher={this.props.searchGameDispatcher}
                                  colSize="col-3"
                                  listType="search"
                                  showModal={this.props.showModal}
                                  limit={8}
                                    />
                    </div>
                </section>
            </section>
        );
    }
});

export default Dashboard;