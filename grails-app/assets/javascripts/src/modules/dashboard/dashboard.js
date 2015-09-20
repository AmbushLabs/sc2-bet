import React from './../../lib/react';
import ReactIntl from './../../lib/react-intl';
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
                        <MyGames games={this.props.myGames}
                                  gameDispatcher={this.props.myGameDispatcher}
                                  showModal={this.props.showModal}
                                    />
                    </div>
                </section>
                <div className="clearfix"></div>
                <section className="col col-12">
                    <div className="bg-white p1 clearfix">
                        <GameList games={this.props.searchGames}
                                  gameDispatcher={this.props.searchGameDispatcher}
                                  colSize="col-3"
                                  listType="search"
                                  showModal={this.props.showModal}
                                    />
                    </div>
                </section>
            </section>
        );
    }
});

export default Dashboard;